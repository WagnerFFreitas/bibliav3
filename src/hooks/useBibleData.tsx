
import { useState, useEffect, useCallback } from 'react';

interface BibleData {
  livro: string;
  capitulo: number;
  versiculos: Record<string, any>;
}

interface UseBibleDataReturn {
  data: BibleData | null;
  loading: boolean;
  error: string | null;
  loadChapter: (livro: string, capitulo: number, versao: string) => Promise<void>;
}

const useBibleData = (): UseBibleDataReturn => {
  const [data, setData] = useState<BibleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChapter = useCallback(async (livro: string, capitulo: number, versao: string) => {
    if (!livro || !capitulo || !versao) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/data/${versao.toUpperCase()}.json`);
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status}`);
      }

      const bibleData = await response.json();
      const bookData = bibleData[livro];
      
      if (!bookData || !bookData[capitulo]) {
        throw new Error(`Capítulo ${capitulo} do livro ${livro} não encontrado`);
      }

      setData({
        livro,
        capitulo,
        versiculos: bookData[capitulo]
      });
    } catch (err) {
      console.error('Erro ao carregar dados da Bíblia:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, loadChapter };
};

export default useBibleData;
