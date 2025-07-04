
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface Bookmark {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  versao: string;
  createdAt: string;
  note?: string;
}

interface UseBookmarksReturn {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (livro: string, capitulo: number, versiculo: number) => boolean;
  updateBookmarkNote: (id: string, note: string) => void;
}

const BOOKMARKS_KEY = 'biblia-bookmarks';

const useBookmarks = (): UseBookmarksReturn => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Carregar bookmarks do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar bookmarks:', error);
        localStorage.removeItem(BOOKMARKS_KEY);
      }
    }
  }, []);

  // Salvar bookmarks no localStorage
  const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }, []);

  const addBookmark = useCallback((bookmarkData: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: `${bookmarkData.livro}-${bookmarkData.capitulo}-${bookmarkData.versiculo}-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedBookmarks = [...bookmarks, newBookmark];
    saveBookmarks(updatedBookmarks);
    toast.success('Versículo salvo nos favoritos');
  }, [bookmarks, saveBookmarks]);

  const removeBookmark = useCallback((id: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    saveBookmarks(updatedBookmarks);
    toast.success('Versículo removido dos favoritos');
  }, [bookmarks, saveBookmarks]);

  const isBookmarked = useCallback((livro: string, capitulo: number, versiculo: number) => {
    return bookmarks.some(bookmark => 
      bookmark.livro === livro && 
      bookmark.capitulo === capitulo && 
      bookmark.versiculo === versiculo
    );
  }, [bookmarks]);

  const updateBookmarkNote = useCallback((id: string, note: string) => {
    const updatedBookmarks = bookmarks.map(bookmark =>
      bookmark.id === id ? { ...bookmark, note } : bookmark
    );
    saveBookmarks(updatedBookmarks);
    toast.success('Nota atualizada');
  }, [bookmarks, saveBookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    updateBookmarkNote
  };
};

export default useBookmarks;
