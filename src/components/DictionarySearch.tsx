
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book } from "lucide-react";

interface TermoDicionario {
  termo: string;
  definicao: string;
  referencias: string[];
}

interface TermoConcordancia {
  palavra: string;
  versiculos: {
    referencia: string;
    texto: string;
  }[];
}

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [termosDicionario, setTermosDicionario] = useState<TermoDicionario[]>([]);
  const [termosConcordancia, setTermosConcordancia] = useState<TermoConcordancia[]>([]);
  const [activeTab, setActiveTab] = useState<"dicionario" | "concordancia">("dicionario");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dicionarioResponse, concordanciaResponse] = await Promise.all([
          fetch('/src/data/dicionario-biblico.json'),
          fetch('/src/data/concordancia-biblica.json')
        ]);
        
        const dicionarioData = await dicionarioResponse.json();
        const concordanciaData = await concordanciaResponse.json();
        
        setTermosDicionario(dicionarioData.termos);
        setTermosConcordancia(concordanciaData.termos);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredDicionario = termosDicionario.filter(termo =>
    termo.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    termo.definicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConcordancia = termosConcordancia.filter(termo =>
    termo.palavra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-300">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar termo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-gray-300"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "dicionario" ? "default" : "outline"}
            onClick={() => setActiveTab("dicionario")}
            className={activeTab === "dicionario" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-900 border-zinc-700 text-gray-300"}
          >
            <Book className="mr-2 h-4 w-4" />
            Dicionário
          </Button>
          <Button
            variant={activeTab === "concordancia" ? "default" : "outline"}
            onClick={() => setActiveTab("concordancia")}
            className={activeTab === "concordancia" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-900 border-zinc-700 text-gray-300"}
          >
            <Search className="mr-2 h-4 w-4" />
            Concordância
          </Button>
        </div>
      </div>

      {activeTab === "dicionario" && (
        <div className="grid gap-4">
          {filteredDicionario.length === 0 ? (
            <Card className="bg-black/50 border-gray-800">
              <CardContent className="p-6 text-center text-gray-400">
                Nenhum termo encontrado. Tente outra pesquisa.
              </CardContent>
            </Card>
          ) : (
            filteredDicionario.map((termo, index) => (
              <Card key={index} className="bg-black/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-indigo-300">{termo.termo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{termo.definicao}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400">Referências:</h4>
                    <div className="flex flex-wrap gap-2">
                      {termo.referencias.map((ref, refIndex) => (
                        <Badge key={refIndex} variant="outline" className="border-indigo-700 text-indigo-300">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "concordancia" && (
        <div className="grid gap-4">
          {filteredConcordancia.length === 0 ? (
            <Card className="bg-black/50 border-gray-800">
              <CardContent className="p-6 text-center text-gray-400">
                Nenhum termo encontrado. Tente outra pesquisa.
              </CardContent>
            </Card>
          ) : (
            filteredConcordancia.map((termo, index) => (
              <Card key={index} className="bg-black/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-indigo-300">{termo.palavra}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {termo.versiculos.length} versículo{termo.versiculos.length !== 1 ? 's' : ''} encontrado{termo.versiculos.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {termo.versiculos.map((versiculo, versIndex) => (
                      <div key={versIndex} className="border-l-2 border-indigo-600 pl-4">
                        <Badge variant="outline" className="border-indigo-700 text-indigo-300 mb-2">
                          {versiculo.referencia}
                        </Badge>
                        <p className="text-gray-300 text-sm italic">"{versiculo.texto}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;
