
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
      console.log(`📖 useBibleData: Carregando ${livro} ${capitulo} (${versao})`);
      
      // Usar o caminho correto baseado na estrutura de arquivos
      const response = await fetch(`/src/data/${versao}/${livro}/${capitulo}.json`);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status}`);
      }

      const chapterData = await response.json();
      console.log(`📖 useBibleData: Dados carregados:`, chapterData);
      
      if (!chapterData || !chapterData.versículos) {
        throw new Error(`Capítulo ${capitulo} do livro ${livro} não encontrado ou formato inválido`);
      }

      setData({
        livro,
        capitulo,
        versiculos: chapterData.versículos
      });
      
      console.log(`📖 useBibleData: Capítulo carregado com sucesso`);
    } catch (err) {
      console.error('📖 useBibleData: Erro ao carregar dados da Bíblia:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, loadChapter };
};

export default useBibleData;
