
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getBibleVerse } from '@/services/bibleService';
import ShareVerse from './ShareVerse';
import useReadingHistory from '@/hooks/useReadingHistory';

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

// Função para obter o número de versículos de um capítulo
export const getNumeroVersiculos = (livro: string, capitulo: number): number => {
  // Mapeamento básico de livros e capítulos - você pode expandir conforme necessário
  const versiculosPorCapitulo: { [key: string]: { [key: number]: number } } = {
    genesis: {
      1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32,
      // ... adicione mais conforme necessário
    },
    exodo: {
      1: 22, 2: 25, 3: 22, 4: 31, 5: 23,
      // ... adicione mais conforme necessário
    },
    mateus: {
      1: 25, 2: 23, 3: 17, 4: 25, 5: 48,
      // ... adicione mais conforme necessário
    }
    // Adicione mais livros conforme necessário
  };

  // Valor padrão caso não encontre o livro/capítulo
  return versiculosPorCapitulo[livro]?.[capitulo] || 31;
};

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
