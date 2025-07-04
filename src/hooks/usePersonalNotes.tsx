
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface PersonalNote {
  id: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface UsePersonalNotesReturn {
  notes: PersonalNote[];
  addNote: (livro: string, capitulo: number, versiculo: number, note: string) => void;
  updateNote: (id: string, note: string) => void;
  removeNote: (id: string) => void;
  getNote: (livro: string, capitulo: number, versiculo: number) => PersonalNote | undefined;
  hasNote: (livro: string, capitulo: number, versiculo: number) => boolean;
}

const NOTES_KEY = 'biblia-personal-notes';

const usePersonalNotes = (): UsePersonalNotesReturn => {
  const [notes, setNotes] = useState<PersonalNote[]>([]);

  // Carregar notas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar notas:', error);
        localStorage.removeItem(NOTES_KEY);
      }
    }
  }, []);

  // Salvar notas no localStorage
  const saveNotes = useCallback((newNotes: PersonalNote[]) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    setNotes(newNotes);
  }, []);

  const addNote = useCallback((livro: string, capitulo: number, versiculo: number, note: string) => {
    const newNote: PersonalNote = {
      id: `${livro}-${capitulo}-${versiculo}-${Date.now()}`,
      livro,
      capitulo,
      versiculo,
      note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    toast.success('Nota adicionada');
  }, [notes, saveNotes]);

  const updateNote = useCallback((id: string, note: string) => {
    const updatedNotes = notes.map(n =>
      n.id === id ? { ...n, note, updatedAt: new Date().toISOString() } : n
    );
    saveNotes(updatedNotes);
    toast.success('Nota atualizada');
  }, [notes, saveNotes]);

  const removeNote = useCallback((id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    toast.success('Nota removida');
  }, [notes, saveNotes]);

  const getNote = useCallback((livro: string, capitulo: number, versiculo: number) => {
    return notes.find(note => 
      note.livro === livro && 
      note.capitulo === capitulo && 
      note.versiculo === versiculo
    );
  }, [notes]);

  const hasNote = useCallback((livro: string, capitulo: number, versiculo: number) => {
    return notes.some(note => 
      note.livro === livro && 
      note.capitulo === capitulo && 
      note.versiculo === versiculo
    );
  }, [notes]);

  return {
    notes,
    addNote,
    updateNote,
    removeNote,
    getNote,
    hasNote
  };
};

export default usePersonalNotes;
