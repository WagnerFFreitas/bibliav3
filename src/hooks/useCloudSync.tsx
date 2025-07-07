
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ReadingHistoryItem {
  id: string;
  livro: string;
  capitulo: number;
  versiculo?: number;
  versao: string;
  timestamp: number;
  texto?: string;
}

export interface StudyNote {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  versao: string;
  note: string;
  timestamp: number;
}

export const useCloudSync = () => {
  const { user } = useAuth();

  const syncHistoryToCloud = async (item: Omit<ReadingHistoryItem, 'id' | 'timestamp'>) => {
    if (!user) return;

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
      console.error('🔄 CloudSync: Erro ao salvar histórico:', error);
      toast.error('Erro ao salvar na nuvem');
    }
  };

  const syncNoteToCloud = async (note: Omit<StudyNote, 'id' | 'timestamp'>) => {
    if (!user) return;

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
      console.error('🔄 CloudSync: Erro ao salvar nota:', error);
      toast.error('Erro ao salvar nota na nuvem');
    }
  };

  const removeNoteFromCloud = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('study_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('🔄 CloudSync: Erro ao remover nota:', error);
      toast.error('Erro ao remover nota da nuvem');
    }
  };

  const clearHistoryFromCloud = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reading_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('🔄 CloudSync: Erro ao limpar histórico:', error);
      toast.error('Erro ao limpar histórico da nuvem');
    }
  };

  const clearNotesFromCloud = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('study_notes')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('🔄 CloudSync: Erro ao limpar notas:', error);
      toast.error('Erro ao limpar notas da nuvem');
    }
  };

  return {
    syncHistoryToCloud,
    syncNoteToCloud,
    removeNoteFromCloud,
    clearHistoryFromCloud,
    clearNotesFromCloud
  };
};
