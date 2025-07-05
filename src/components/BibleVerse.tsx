import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getBibleVerse } from '@/services/bibleService';

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo?: number;
  versao: string;
}

interface VerseData {
  numero: number;
  texto: string;
}

import ShareVerse from './ShareVerse';
import useReadingHistory from '@/hooks/useReadingHistory';

const BibleVerse = ({ livro, capitulo, versiculo, versao }: BibleVerseProps) => {
  const { addToHistory } = useReadingHistory();
  
  const [versiculoData, setVersiculoData] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (versiculo) {
          const data = await getBibleVerse(livro, capitulo, versiculo, versao);
          setVersiculoData(data);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar versículo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerse();
  }, [livro, capitulo, versiculo, versao]);

  // Adicionar ao histórico quando um versículo for carregado
  useEffect(() => {
    if (versiculo && versiculoData?.texto) {
      addToHistory({
        livro,
        capitulo,
        versiculo,
        versao,
        texto: versiculoData.texto
      });
    }
  }, [versiculo, versiculoData, livro, capitulo, versao, addToHistory]);

  if (isLoading) {
    return <Alert className="bg-blue-100 border-blue-500 text-blue-800"><AlertTitle>Carregando...</AlertTitle><AlertDescription>Buscando versículo na versão {versao.toUpperCase()}</AlertDescription></Alert>;
  }

  if (error) {
    return <Alert variant="destructive"><AlertTitle>Erro</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
  }

  if (versiculoData) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            {versiculoData.numero}. {versiculoData.texto}
          </h2>
        </div>
        
        {/* Adicionar componente de compartilhamento */}
        <ShareVerse
          livro={livro}
          capitulo={capitulo}
          versiculo={versiculo}
          texto={versiculoData.texto}
          versao={versao}
        />
      </div>
    );
  }

  return null;
};

export default BibleVerse;
