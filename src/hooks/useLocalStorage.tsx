
import { ReadingHistoryItem, StudyNote } from './useCloudSync';

export const useLocalStorage = () => {
  const loadLocalHistory = (): ReadingHistoryItem[] => {
    const saved = localStorage.getItem('bible-reading-history');
    return saved ? JSON.parse(saved) : [];
  };

  const loadLocalNotes = (): StudyNote[] => {
    const saved = localStorage.getItem('bible-study-notes');
    return saved ? JSON.parse(saved) : [];
  };

  const saveLocalHistory = (history: ReadingHistoryItem[]) => {
    localStorage.setItem('bible-reading-history', JSON.stringify(history));
  };

  const saveLocalNotes = (notes: StudyNote[]) => {
    localStorage.setItem('bible-study-notes', JSON.stringify(notes));
  };

  const clearLocalHistory = () => {
    localStorage.removeItem('bible-reading-history');
  };

  const clearLocalNotes = () => {
    localStorage.removeItem('bible-study-notes');
  };

  return {
    loadLocalHistory,
    loadLocalNotes,
    saveLocalHistory,
    saveLocalNotes,
    clearLocalHistory,
    clearLocalNotes
  };
};
