
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReadingHistoryItem, StudyNote } from './useCloudSync';

export const useCloudDataLoader = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const loadHistoryFromCloud = async (): Promise<ReadingHistoryItem[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('reading_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return data?.map(item => ({
        id: item.id,
        livro: item.livro,
        capitulo: item.capitulo,
        versiculo: item.versiculo,
        versao: item.versao,
        texto: item.texto,
        timestamp: new Date(item.created_at).getTime()
      })) || [];
    } catch (error) {
      console.error('📥 CloudLoader: Erro ao carregar histórico:', error);
      throw error;
    }
  };

  const loadNotesFromCloud = async (): Promise<StudyNote[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('study_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data?.map(item => ({
        id: item.id,
        livro: item.livro,
        capitulo: item.capitulo,
        versiculo: item.versiculo,
        versao: item.versao,
        note: item.note,
        timestamp: new Date(item.created_at).getTime()
      })) || [];
    } catch (error) {
      console.error('📥 CloudLoader: Erro ao carregar notas:', error);
      throw error;
    }
  };

  const loadAllCloudData = async () => {
    if (!user) return { history: [], notes: [] };
    
    setLoading(true);
    try {
      const [history, notes] = await Promise.all([
        loadHistoryFromCloud(),
        loadNotesFromCloud()
      ]);

      return { history, notes };
    } catch (error) {
      console.error('📥 CloudLoader: Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados da nuvem');
      return { history: [], notes: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadHistoryFromCloud,
    loadNotesFromCloud,
    loadAllCloudData
  };
};
