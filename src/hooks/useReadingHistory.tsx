
import { useState, useEffect } from 'react';

interface ReadingHistoryItem {
  id: string;
  livro: string;
  capitulo: number;
  versiculo?: number;
  versao: string;
  timestamp: number;
  texto?: string;
}

interface StudyNote {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  versao: string;
  note: string;
  timestamp: number;
}

const useReadingHistory = () => {
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);

  // Carregar histórico do localStorage na inicialização
  useEffect(() => {
    const savedHistory = localStorage.getItem('bible-reading-history');
    const savedNotes = localStorage.getItem('bible-study-notes');
    
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
    
    if (savedNotes) {
      setStudyNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Salvar histórico no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('bible-reading-history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  useEffect(() => {
    localStorage.setItem('bible-study-notes', JSON.stringify(studyNotes));
  }, [studyNotes]);

  const addToHistory = (item: Omit<ReadingHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: ReadingHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    
    setReadingHistory(prev => {
      // Remover duplicatas do mesmo versículo/capítulo
      const filtered = prev.filter(existing => 
        !(existing.livro === item.livro && 
          existing.capitulo === item.capitulo && 
          existing.versiculo === item.versiculo &&
          existing.versao === item.versao)
      );
      
      // Manter apenas os últimos 100 itens
      return [newItem, ...filtered].slice(0, 100);
    });
  };

  const addStudyNote = (note: Omit<StudyNote, 'id' | 'timestamp'>) => {
    const newNote: StudyNote = {
      ...note,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    
    setStudyNotes(prev => [newNote, ...prev]);
  };

  const removeStudyNote = (id: string) => {
    setStudyNotes(prev => prev.filter(note => note.id !== id));
  };

  const getRecentReading = () => {
    return readingHistory.slice(0, 10);
  };

  const getStudyNotesByVerse = (livro: string, capitulo: number, versiculo: number) => {
    return studyNotes.filter(note => 
      note.livro === livro && 
      note.capitulo === capitulo && 
      note.versiculo === versiculo
    );
  };

  const clearHistory = () => {
    setReadingHistory([]);
    localStorage.removeItem('bible-reading-history');
  };

  const clearNotes = () => {
    setStudyNotes([]);
    localStorage.removeItem('bible-study-notes');
  };

  return {
    readingHistory,
    studyNotes,
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
