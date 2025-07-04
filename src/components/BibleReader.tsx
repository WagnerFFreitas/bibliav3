
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import useAccessibilityAssistant from '@/hooks/useAccessibilityAssistant';

interface BibleReaderProps {
  livro: string;
  capitulo: number;
  versiculos: Record<string, string>;
  versao: string;
}

const BibleReader: React.FC<BibleReaderProps> = ({ 
  livro, 
  capitulo, 
  versiculos, 
  versao 
}) => {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isAutoReading, setIsAutoReading] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(0.9);
  
  const { readContent, stopReading, isReading } = useAccessibilityAssistant();

  const totalVerses = Object.keys(versiculos).length;

  const readCurrentVerse = () => {
    const verseText = versiculos[currentVerse.toString()];
    if (verseText) {
      const fullText = `${livro}, capítulo ${capitulo}, versículo ${currentVerse}. ${verseText}`;
      readContent(fullText);
    }
  };

  const readChapter = () => {
    const chapterText = Object.entries(versiculos)
      .map(([num, text]) => `Versículo ${num}. ${text}`)
      .join('. ');
    
    const fullText = `${livro}, capítulo ${capitulo}. ${chapterText}`;
    readContent(fullText);
  };

  const nextVerse = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(currentVerse + 1);
    }
  };

  const previousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  const toggleAutoReading = () => {
    if (isAutoReading) {
      setIsAutoReading(false);
      stopReading();
    } else {
      setIsAutoReading(true);
      readCurrentVerse();
    }
  };

  useEffect(() => {
    if (isAutoReading && !isReading) {
      const timer = setTimeout(() => {
        if (currentVerse < totalVerses) {
          setCurrentVerse(prev => prev + 1);
        } else {
          setIsAutoReading(false);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAutoReading, isReading, currentVerse, totalVerses]);

  useEffect(() => {
    if (isAutoReading) {
      readCurrentVerse();
    }
  }, [currentVerse, isAutoReading]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-blue-50 border-blue-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-blue-800">
          <Volume2 className="w-5 h-5" />
          Leitor de Bíblia
        </CardTitle>
        <p className="text-sm text-blue-600">
          {livro} - Capítulo {capitulo} ({versao.toUpperCase()})
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Controles de versículo */}
        <div className="flex items-center justify-between">
          <Button
            onClick={previousVerse}
            disabled={currentVerse === 1}
            variant="outline"
            size="sm"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <span className="font-medium text-blue-800">
            Versículo {currentVerse} de {totalVerses}
          </span>
          
          <Button
            onClick={nextVerse}
            disabled={currentVerse === totalVerses}
            variant="outline"
            size="sm"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Texto do versículo atual */}
        <div className="p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-blue-600">{currentVerse}.</span>{' '}
            {versiculos[currentVerse.toString()] || 'Versículo não encontrado'}
          </p>
        </div>

        {/* Controles de leitura */}
        <div className="flex gap-2">
          <Button
            onClick={readCurrentVerse}
            disabled={isReading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Ler Versículo
          </Button>
          
          <Button
            onClick={toggleAutoReading}
            variant={isAutoReading ? "destructive" : "secondary"}
            className="flex-1"
          >
            {isAutoReading ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Parar Auto-leitura
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Auto-leitura
              </>
            )}
          </Button>
        </div>

        <Button
          onClick={readChapter}
          variant="outline"
          className="w-full"
          disabled={isReading}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Ler Capítulo Completo
        </Button>

        {/* Configurações de velocidade */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-blue-800">
            Velocidade:
          </label>
          <Select
            value={readingSpeed.toString()}
            onValueChange={(value) => setReadingSpeed(parseFloat(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.7">0.7x</SelectItem>
              <SelectItem value="0.9">0.9x</SelectItem>
              <SelectItem value="1.0">1.0x</SelectItem>
              <SelectItem value="1.2">1.2x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        {isAutoReading && (
          <div className="text-center text-sm text-blue-600 bg-blue-100 p-2 rounded">
            🔄 Leitura automática ativa - Versículo {currentVerse}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BibleReader;
