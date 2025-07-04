
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAdvancedSearch from '@/hooks/useAdvancedSearch';
import { useBibleContext } from '@/contexts/BibleContext';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch: React.FC = () => {
  const { versaoBiblia } = useBibleContext();
  const navigate = useNavigate();
  const {
    searchResults,
    isSearching,
    searchTerm,
    setSearchTerm,
    performSearch,
    clearResults
  } = useAdvancedSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm, versaoBiblia);
  };

  const handleResultClick = (livro: string, capitulo: number, versiculo: number) => {
    navigate(`/biblia/${livro.toLowerCase()}/${capitulo}?versao=${versaoBiblia}#v${versiculo}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Buscar versículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isSearching}>
          <Search className="w-4 h-4" />
        </Button>
        {searchResults.length > 0 && (
          <Button variant="outline" onClick={clearResults}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </form>

      {isSearching && (
        <div className="text-center py-4">
          <p>Buscando...</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">{searchResults.length} resultados encontrados</h3>
          {searchResults.map((result, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleResultClick(result.livro, result.capitulo, result.versiculo)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {result.livro} {result.capitulo}:{result.versiculo}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600">{result.texto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
