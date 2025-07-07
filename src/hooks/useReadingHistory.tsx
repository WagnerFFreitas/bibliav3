
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCloudSync, ReadingHistoryItem, StudyNote } from './useCloudSync';
import { useCloudDataLoader } from './useCloudDataLoader';
import { useLocalStorage } from './useLocalStorage';

const useReadingHistory = () => {
  const { user } = useAuth();
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  
  const { loading } = useCloudDataLoader();
  const { 
    syncHistoryToCloud, 
    syncNoteToCloud, 
    removeNoteFromCloud, 
    clearHistoryFromCloud, 
    clearNotesFromCloud 
  } = useCloudSync();
  const { 
    loadLocalHistory, 
    loadLocalNotes, 
    saveLocalHistory, 
    saveLocalNotes, 
    clearLocalHistory, 
    clearLocalNotes 
  } = useLocalStorage();
  const { loadAllCloudData } = useCloudDataLoader();

  useEffect(() => {
    console.log('📚 ReadingHistory: Inicializando dados...');
    if (user) {
      loadCloudData();
    } else {
      loadLocalData();
    }
  }, [user]);

  const loadLocalData = () => {
    console.log('📱 ReadingHistory: Carregando dados locais...');
    setReadingHistory(loadLocalHistory());
    setStudyNotes(loadLocalNotes());
  };

  const loadCloudData = async () => {
    console.log('☁️ ReadingHistory: Carregando dados da nuvem...');
    const { history, notes } = await loadAllCloudData();
    setReadingHistory(history);
    setStudyNotes(notes);
  };

  const addToHistory = async (item: Omit<ReadingHistoryItem, 'id' | 'timestamp'>) => {
    console.log('📝 ReadingHistory: Adicionando ao histórico:', item);
    
    const newItem: ReadingHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    if (user) {
      await syncHistoryToCloud(item);
    }

    setReadingHistory(prev => {
      const filtered = prev.filter(existing => 
        !(existing.livro === item.livro && 
          existing.capitulo === item.capitulo && 
          existing.versiculo === item.versiculo &&
          existing.versao === item.versao)
      );
      const updated = [newItem, ...filtered].slice(0, 100);
      
      if (!user) {
        saveLocalHistory(updated);
      }
      
      return updated;
    });
  };

  const addStudyNote = async (note: Omit<StudyNote, 'id' | 'timestamp'>) => {
    console.log('📝 ReadingHistory: Adicionando nota:', note);
    
    const newNote: StudyNote = {
      ...note,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    if (user) {
      await syncNoteToCloud(note);
    }

    setStudyNotes(prev => {
      const updated = [newNote, ...prev];
      
      if (!user) {
        saveLocalNotes(updated);
      }
      
      return updated;
    });
  };

  const removeStudyNote = async (id: string) => {
    console.log('🗑️ ReadingHistory: Removendo nota:', id);
    
    if (user) {
      await removeNoteFromCloud(id);
    }

    setStudyNotes(prev => {
      const updated = prev.filter(note => note.id !== id);
      
      if (!user) {
        saveLocalNotes(updated);
      }
      
      return updated;
    });
  };

  const clearHistory = async () => {
    console.log('🧹 ReadingHistory: Limpando histórico...');
    
    if (user) {
      await clearHistoryFromCloud();
    }

    setReadingHistory([]);
    clearLocalHistory();
  };

  const clearNotes = async () => {
    console.log('🧹 ReadingHistory: Limpando notas...');
    
    if (user) {
      await clearNotesFromCloud();
    }

    setStudyNotes([]);
    clearLocalNotes();
  };

  const getRecentReading = () => readingHistory.slice(0, 10);

  const getStudyNotesByVerse = (livro: string, capitulo: number, versiculo: number) => {
    return studyNotes.filter(note => 
      note.livro === livro && 
      note.capitulo === capitulo && 
      note.versiculo === versiculo
    );
  };

  return {
    readingHistory,
    studyNotes,
    loading,
    addToHistory,
    addStudyNote,
    removeStudyNote,
    getRecentReading,
    getStudyNotesByVerse,
    clearHistory,
    clearNotes
  };
};

export default useReadingHistory;
