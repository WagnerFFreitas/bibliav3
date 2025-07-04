
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface SearchResult {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  versao: string;
}

interface UseAdvancedSearchReturn {
  searchResults: SearchResult[];
  isSearching: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  performSearch: (term: string, versao: string) => Promise<void>;
  clearResults: () => void;
}

const useAdvancedSearch = (): UseAdvancedSearchReturn => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const performSearch = useCallback(async (term: string, versao: string) => {
    if (!term.trim()) {
      toast.error('Digite um termo para buscar');
      return;
    }

    setIsSearching(true);
    setSearchTerm(term);
    
    try {
      // Simular busca em todos os arquivos JSON
      // Em uma implementação real, você carregaria e pesquisaria todos os arquivos
      const mockResults: SearchResult[] = [
        {
          livro: 'Genesis',
          capitulo: 1,
          versiculo: 1,
          texto: 'No princípio criou Deus os céus e a terra.',
          versao: versao
        },
        {
          livro: 'João',
          capitulo: 3,
          versiculo: 16,
          texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...',
          versao: versao
        }
      ].filter(result => 
        result.texto.toLowerCase().includes(term.toLowerCase())
      );

      setSearchResults(mockResults);
      toast.success(`${mockResults.length} resultados encontrados`);
    } catch (error) {
      console.error('Erro na busca:', error);
      toast.error('Erro ao realizar busca');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setSearchTerm('');
  }, []);

  return {
    searchResults,
    isSearching,
    searchTerm,
    setSearchTerm,
    performSearch,
    clearResults
  };
};

export default useAdvancedSearch;
