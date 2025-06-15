
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Music, ChevronLeft, ChevronRight, Grid, List } from "lucide-react";

interface Hino {
  numero: number;
  titulo: string;
  letra: string[];
}

interface HymnViewerProps {
  tipo: "harpa" | "cantor";
}

const HymnViewer = ({ tipo }: HymnViewerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hinos, setHinos] = useState<Hino[]>([]);
  const [selectedHymn, setSelectedHymn] = useState<Hino | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const hinosPerPage = 50;

  useEffect(() => {
    const loadHinos = async () => {
      try {
        const response = await fetch(`/src/data/${tipo === "harpa" ? "harpa-crista" : "cantor-cristao"}.json`);
        const data = await response.json();
        setHinos(data.hinos);
        if (data.hinos.length > 0) {
          setSelectedHymn(data.hinos[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar hinos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHinos();
  }, [tipo]);

  const filteredHinos = hinos.filter(hino =>
    hino.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hino.numero.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredHinos.length / hinosPerPage);
  const startIndex = (currentPage - 1) * hinosPerPage;
  const endIndex = startIndex + hinosPerPage;
  const currentHinos = filteredHinos.slice(startIndex, endIndex);

  const goToNext = () => {
    if (selectedHymn && selectedHymn.numero < hinos.length) {
      const nextHino = hinos.find(h => h.numero === selectedHymn.numero + 1);
      if (nextHino) setSelectedHymn(nextHino);
    }
  };

  const goToPrevious = () => {
    if (selectedHymn && selectedHymn.numero > 1) {
      const prevHino = hinos.find(h => h.numero === selectedHymn.numero - 1);
      if (prevHino) setSelectedHymn(prevHino);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-300">Carregando hinos...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de Hinos */}
      <div className="lg:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar por título ou número..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-zinc-900 border-zinc-700 text-gray-300"
          />
        </div>

        {/* Controles de Visualização */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="bg-zinc-900 border-zinc-700"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="bg-zinc-900 border-zinc-700"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            {filteredHinos.length} hinos
          </div>
        </div>

        {/* Navegação por Páginas */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-zinc-900 border-zinc-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-gray-400">
              Página {currentPage} de {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-zinc-900 border-zinc-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Lista de Hinos por Números */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
            {currentHinos.map((hino) => (
              <Button
                key={hino.numero}
                variant={selectedHymn?.numero === hino.numero ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedHymn(hino)}
                className={`
                  ${selectedHymn?.numero === hino.numero 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                    : "bg-zinc-900 border-zinc-700 text-gray-300 hover:bg-zinc-800"}
                `}
              >
                {hino.numero}
              </Button>
            ))}
          </div>
        )}

        {/* Lista de Hinos por Títulos */}
        {viewMode === "list" && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {currentHinos.map((hino) => (
              <Button
                key={`title-${hino.numero}`}
                variant="ghost"
                className={`
                  w-full justify-start text-left h-auto p-2 
                  ${selectedHymn?.numero === hino.numero 
                    ? "bg-indigo-600/20 text-indigo-300" 
                    : "text-gray-300 hover:bg-zinc-800"}
                `}
                onClick={() => setSelectedHymn(hino)}
              >
                <div>
                  <div className="font-medium">{hino.numero} - {hino.titulo}</div>
                </div>
              </Button>
            ))}
          </div>
        )}

        {/* Navegação Rápida */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedHymn(hinos[0])}
            className="bg-zinc-900 border-zinc-700 text-gray-300"
          >
            Primeiro
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const randomHino = hinos[Math.floor(Math.random() * hinos.length)];
              setSelectedHymn(randomHino);
            }}
            className="bg-zinc-900 border-zinc-700 text-gray-300"
          >
            Aleatório
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedHymn(hinos[hinos.length - 1])}
            className="bg-zinc-900 border-zinc-700 text-gray-300"
          >
            Último
          </Button>
        </div>
      </div>

      {/* Visualizador do Hino */}
      <div className="lg:col-span-2">
        {selectedHymn ? (
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-indigo-300">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  {tipo === "harpa" ? "Harpa Cristã" : "Cantor Cristão"} nº {selectedHymn.numero} - {selectedHymn.titulo}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevious}
                    disabled={selectedHymn.numero === 1}
                    className="bg-zinc-900 border-zinc-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNext}
                    disabled={selectedHymn.numero === hinos.length}
                    className="bg-zinc-900 border-zinc-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                {selectedHymn.letra.map((linha, index) => (
                  <p key={index} className={
                    linha === "" ? "mb-2" : 
                    linha.includes("Coro:") ? "font-semibold text-indigo-300 mt-4" : 
                    "leading-relaxed"
                  }>
                    {linha}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-8 text-center text-gray-400">
              <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Selecione um hino para visualizar a letra</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HymnViewer;
