
import React, { useState } from 'react';
import { Heart, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBookmarks from '@/hooks/useBookmarks';
import { useNavigate } from 'react-router-dom';

const BookmarksList: React.FC = () => {
  const { bookmarks, removeBookmark, updateBookmarkNote } = useBookmarks();
  const navigate = useNavigate();
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleBookmarkClick = (livro: string, capitulo: number, versiculo: number, versao: string) => {
    navigate(`/biblia/${livro.toLowerCase()}/${capitulo}?versao=${versao}#v${versiculo}`);
  };

  const handleEditNote = (bookmarkId: string, currentNote?: string) => {
    setEditingNote(bookmarkId);
    setNoteText(currentNote || '');
  };

  const handleSaveNote = (bookmarkId: string) => {
    updateBookmarkNote(bookmarkId, noteText);
    setEditingNote(null);
    setNoteText('');
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Nenhum versículo salvo ainda</p>
        <p className="text-sm text-gray-400">Clique no ícone do coração ao lado dos versículos para salvá-los</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Versículos Favoritos ({bookmarks.length})</h2>
      
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span 
                className="cursor-pointer hover:text-blue-600"
                onClick={() => handleBookmarkClick(bookmark.livro, bookmark.capitulo, bookmark.versiculo, bookmark.versao)}
              >
                {bookmark.livro} {bookmark.capitulo}:{bookmark.versiculo}
              </span>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Nota</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Digite sua nota..."
                        value={editingNote === bookmark.id ? noteText : bookmark.note || ''}
                        onChange={(e) => {
                          if (editingNote === bookmark.id) {
                            setNoteText(e.target.value);
                          } else {
                            handleEditNote(bookmark.id, bookmark.note);
                            setNoteText(e.target.value);
                          }
                        }}
                      />
                      <Button onClick={() => handleSaveNote(bookmark.id)}>
                        Salvar Nota
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm mb-2">{bookmark.texto}</p>
            <p className="text-xs text-gray-500">
              Versão: {bookmark.versao.toUpperCase()} | 
              Salvo em: {new Date(bookmark.createdAt).toLocaleDateString()}
            </p>
            {bookmark.note && (
              <div className="mt-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                <p className="text-xs text-gray-700">{bookmark.note}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookmarksList;
