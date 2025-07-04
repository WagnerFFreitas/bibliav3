
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

interface KeyboardShortcutsProps {
  livro: string;
  capitulo: number;
  versaoBiblia: string;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ livro, capitulo, versaoBiblia }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { shortcuts } = useKeyboardNavigation({ livro, capitulo, versaoBiblia });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="w-4 h-4" />
          Atalhos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atalhos de Teclado</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {Object.entries(shortcuts).map(([shortcut, description]) => (
            <div key={shortcut} className="flex justify-between items-center p-2 rounded bg-gray-50">
              <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                {shortcut}
              </span>
              <span className="text-sm text-gray-600">{description}</span>
            </div>
          ))}
          <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
            <p className="text-xs text-blue-700">
              💡 Dica: Use as setas do teclado para navegar rapidamente entre capítulos e versículos!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;
