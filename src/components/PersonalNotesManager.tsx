
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StickyNote, Trash2, Edit3 } from 'lucide-react';
import usePersonalNotes from '@/hooks/usePersonalNotes';

interface PersonalNotesManagerProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  versiculoTexto: string;
}

const PersonalNotesManager: React.FC<PersonalNotesManagerProps> = ({ 
  livro, 
  capitulo, 
  versiculo, 
  versiculoTexto 
}) => {
  const { addNote, updateNote, removeNote, getNote, hasNote } = usePersonalNotes();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const existingNote = getNote(livro, capitulo, versiculo);

  const handleOpenDialog = () => {
    if (existingNote) {
      setNoteText(existingNote.note);
      setIsEditing(true);
    } else {
      setNoteText('');
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      if (isEditing && existingNote) {
        updateNote(existingNote.id, noteText.trim());
      } else {
        addNote(livro, capitulo, versiculo, noteText.trim());
      }
      setIsDialogOpen(false);
      setNoteText('');
    }
  };

  const handleRemoveNote = () => {
    if (existingNote) {
      removeNote(existingNote.id);
      setIsDialogOpen(false);
      setNoteText('');
    }
  };

  return (
    <>
      <Button
        variant={hasNote(livro, capitulo, versiculo) ? "default" : "outline"}
        size="sm"
        onClick={handleOpenDialog}
        className="gap-1"
      >
        <StickyNote className="w-3 h-3" />
        {hasNote(livro, capitulo, versiculo) ? "Ver Nota" : "Nota"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Nota' : 'Adicionar Nota'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {livro} {capitulo}:{versiculo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{versiculoTexto}</p>
              </CardContent>
            </Card>

            <Textarea
              placeholder="Digite sua nota..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
            />

            <div className="flex justify-between gap-2">
              <div>
                {isEditing && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveNote}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Remover
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveNote}
                  disabled={!noteText.trim()}
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </Button>
              </div>
            </div>

            {existingNote && (
              <div className="text-xs text-gray-500 pt-2 border-t">
                Criada: {new Date(existingNote.createdAt).toLocaleDateString()}
                {existingNote.updatedAt !== existingNote.createdAt && (
                  <> • Atualizada: {new Date(existingNote.updatedAt).toLocaleDateString()}</>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalNotesManager;
