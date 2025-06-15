
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Music } from "lucide-react";

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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-gray-300"
          />
        </div>

        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
          {filteredHinos.map((hino) => (
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

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filteredHinos.map((hino) => (
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
      </div>

      {/* Visualizador do Hino */}
      <div className="lg:col-span-2">
        {selectedHymn ? (
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-300">
                <Music className="h-5 w-5" />
                {tipo === "harpa" ? "Harpa Cristã" : "Cantor Cristão"} nº {selectedHymn.numero} - {selectedHymn.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                {selectedHymn.letra.map((linha, index) => (
                  <p key={index} className={linha === "" ? "mb-2" : linha.includes("Coro:") ? "font-semibold text-indigo-300 mt-4" : ""}>
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
