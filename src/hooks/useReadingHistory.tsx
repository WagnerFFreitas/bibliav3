import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const { user } = useAuth();
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar dados do Supabase quando usuário estiver logado
  useEffect(() => {
    if (user) {
      loadCloudData();
    } else {
      loadLocalData();
    }
  }, [user]);

  const loadLocalData = () => {
    const savedHistory = localStorage.getItem('bible-reading-history');
    const savedNotes = localStorage.getItem('bible-study-notes');
    
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
    
    if (savedNotes) {
      setStudyNotes(JSON.parse(savedNotes));
    }
  };

  const loadCloudData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Carregar histórico
      const { data: historyData, error: historyError } = await supabase
        .from('reading_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (historyError) throw historyError;

      const formattedHistory: ReadingHistoryItem[] = historyData?.map(item => ({
        id: item.id,
        livro: item.livro,
        capitulo: item.capitulo,
        versiculo: item.versiculo,
        versao: item.versao,
        texto: item.texto,
        timestamp: new Date(item.created_at).getTime()
      })) || [];

      setReadingHistory(formattedHistory);

      // Carregar notas
      const { data: notesData, error: notesError } = await supabase
        .from('study_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (notesError) throw notesError;

      const formattedNotes: StudyNote[] = notesData?.map(item => ({
        id: item.id,
        livro: item.livro,
        capitulo: item.capitulo,
        versiculo: item.versiculo,
        versao: item.versao,
        note: item.note,
        timestamp: new Date(item.created_at).getTime()
      })) || [];

      setStudyNotes(formattedNotes);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados da nuvem');
      loadLocalData(); // Fallback para dados locais
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (item: Omit<ReadingHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: ReadingHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    if (user) {
      // Salvar na nuvem
      try {
        const { error } = await supabase
          .from('reading_history')
          .insert({
            user_id: user.id,
            livro: item.livro,
            capitulo: item.capitulo,
            versiculo: item.versiculo,
            versao: item.versao,
            texto: item.texto
          });

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao salvar histórico:', error);
        toast.error('Erro ao salvar na nuvem');
      }
    }

    // Atualizar estado local
    setReadingHistory(prev => {
      const filtered = prev.filter(existing => 
        !(existing.livro === item.livro && 
          existing.capitulo === item.capitulo && 
          existing.versiculo === item.versiculo &&
          existing.versao === item.versao)
      );
      const updated = [newItem, ...filtered].slice(0, 100);
      
      // Salvar localmente se não estiver logado
      if (!user) {
        localStorage.setItem('bible-reading-history', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  const addStudyNote = async (note: Omit<StudyNote, 'id' | 'timestamp'>) => {
    const newNote: StudyNote = {
      ...note,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    if (user) {
      // Salvar na nuvem
      try {
        const { error } = await supabase
          .from('study_notes')
          .insert({
            user_id: user.id,
            livro: note.livro,
            capitulo: note.capitulo,
            versiculo: note.versiculo,
            versao: note.versao,
            note: note.note
          });

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao salvar nota:', error);
        toast.error('Erro ao salvar nota na nuvem');
      }
    }

    // Atualizar estado local
    setStudyNotes(prev => {
      const updated = [newNote, ...prev];
      
      // Salvar localmente se não estiver logado
      if (!user) {
        localStorage.setItem('bible-study-notes', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  const removeStudyNote = async (id: string) => {
    if (user) {
      // Remover da nuvem
      try {
        const { error } = await supabase
          .from('study_notes')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao remover nota:', error);
        toast.error('Erro ao remover nota da nuvem');
      }
    }

    // Atualizar estado local
    setStudyNotes(prev => {
      const updated = prev.filter(note => note.id !== id);
      
      // Salvar localmente se não estiver logado
      if (!user) {
        localStorage.setItem('bible-study-notes', JSON.stringify(updated));
      }
      
      return updated;
    });
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

  const clearHistory = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('reading_history')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao limpar histórico:', error);
        toast.error('Erro ao limpar histórico da nuvem');
      }
    }

    setReadingHistory([]);
    localStorage.removeItem('bible-reading-history');
  };

  const clearNotes = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('study_notes')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao limpar notas:', error);
        toast.error('Erro ao limpar notas da nuvem');
      }
    }

    setStudyNotes([]);
    localStorage.removeItem('bible-study-notes');
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
