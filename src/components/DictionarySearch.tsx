
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    textoOriginal?: string;
    transliteracao?: string;
    testamento: 'antigo' | 'novo';
  }[];
}

const DictionarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [termosDicionario, setTermosDicionario] = useState<TermoDicionario[]>([]);
  const [termosConcordancia, setTermosConcordancia] = useState<TermoConcordancia[]>([]);
  const [activeTab, setActiveTab] = useState<"dicionario" | "concordancia">("dicionario");
  const [loading, setLoading] = useState(true);
  const [expandedTerms, setExpandedTerms] = useState<{ [key: string]: boolean }>({});

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
        
        // Expandir dados de concordância com informações originais
        const concordanciaExpandida = concordanciaData.termos.map((termo: any) => ({
          ...termo,
          versiculos: termo.versiculos.map((v: any) => ({
            ...v,
            textoOriginal: v.textoOriginal || getTextoOriginal(v.referencia),
            transliteracao: v.transliteracao || getTransliteracao(v.referencia),
            testamento: determinarTestamento(v.referencia)
          }))
        }));
        
        setTermosConcordancia(concordanciaExpandida);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getTextoOriginal = (referencia: string): string => {
    // Simulação de texto original baseado na referência
    const isNewTestament = determinarTestamento(referencia) === 'novo';
    return isNewTestament 
      ? "καὶ εἶπεν ὁ θεὸς γενηθήτω φῶς" 
      : "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר";
  };

  const getTransliteracao = (referencia: string): string => {
    const isNewTestament = determinarTestamento(referencia) === 'novo';
    return isNewTestament 
      ? "kai eipen ho theos genēthētō phōs"
      : "wayyomer 'elohim yehi 'or";
  };

  const determinarTestamento = (referencia: string): 'antigo' | 'novo' => {
    const livrosNovoTestamento = [
      'mateus', 'marcos', 'lucas', 'joão', 'atos', 'romanos', 
      '1coríntios', '2coríntios', 'gálatas', 'efésios', 'filipenses',
      'colossenses', '1tessalonicenses', '2tessalonicenses', '1timóteo',
      '2timóteo', 'tito', 'filemom', 'hebreus', 'tiago', '1pedro',
      '2pedro', '1joão', '2joão', '3joão', 'judas', 'apocalipse'
    ];
    
    const livro = referencia.toLowerCase().split(' ')[0];
    return livrosNovoTestamento.includes(livro) ? 'novo' : 'antigo';
  };

  const filteredDicionario = termosDicionario.filter(termo =>
    termo.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    termo.definicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConcordancia = termosConcordancia.filter(termo =>
    termo.palavra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (palavra: string) => {
    setExpandedTerms(prev => ({
      ...prev,
      [palavra]: !prev[palavra]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-300">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col gap-4 items-stretch">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar termo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-zinc-900 border-zinc-700 text-gray-300 h-12 text-base"
          />
        </div>
        <div className="flex gap-2 w-full">
          <Button
            variant={activeTab === "dicionario" ? "default" : "outline"}
            onClick={() => setActiveTab("dicionario")}
            className={`flex-1 h-12 text-sm sm:text-base ${
              activeTab === "dicionario" 
                ? "bg-indigo-600 hover:bg-indigo-700" 
                : "bg-zinc-900 border-zinc-700 text-gray-300"
            }`}
          >
            <Book className="mr-1 sm:mr-2 h-4 w-4" />
            Dicionário
          </Button>
          <Button
            variant={activeTab === "concordancia" ? "default" : "outline"}
            onClick={() => setActiveTab("concordancia")}
            className={`flex-1 h-12 text-sm sm:text-base ${
              activeTab === "concordancia" 
                ? "bg-indigo-600 hover:bg-indigo-700" 
                : "bg-zinc-900 border-zinc-700 text-gray-300"
            }`}
          >
            <Search className="mr-1 sm:mr-2 h-4 w-4" />
            Concordância
          </Button>
        </div>
      </div>

      {activeTab === "dicionario" && (
        <div className="grid gap-3 sm:gap-4">
          {filteredDicionario.length === 0 ? (
            <Card className="bg-black/50 border-gray-800">
              <CardContent className="p-4 sm:p-6 text-center text-gray-400">
                Nenhum termo encontrado. Tente outra pesquisa.
              </CardContent>
            </Card>
          ) : (
            filteredDicionario.map((termo, index) => (
              <Card key={index} className="bg-black/50 border-gray-800">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-indigo-300 text-lg sm:text-xl">{termo.termo}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">{termo.definicao}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400">Referências:</h4>
                    <div className="flex flex-wrap gap-2">
                      {termo.referencias.map((ref, refIndex) => (
                        <Badge key={refIndex} variant="outline" className="border-indigo-700 text-indigo-300 text-xs">
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
        <div className="grid gap-3 sm:gap-4">
          {filteredConcordancia.length === 0 ? (
            <Card className="bg-black/50 border-gray-800">
              <CardContent className="p-4 sm:p-6 text-center text-gray-400">
                Nenhum termo encontrado. Tente outra pesquisa.
              </CardContent>
            </Card>
          ) : (
            filteredConcordancia.map((termo, index) => (
              <Card key={index} className="bg-black/50 border-gray-800">
                <Collapsible 
                  open={expandedTerms[termo.palavra]} 
                  onOpenChange={() => toggleExpanded(termo.palavra)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="p-4 sm:p-6 cursor-pointer hover:bg-black/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-indigo-300 text-lg sm:text-xl">{termo.palavra}</CardTitle>
                          <CardDescription className="text-gray-400 text-sm sm:text-base">
                            {termo.versiculos.length} ocorrência{termo.versiculos.length !== 1 ? 's' : ''} encontrada{termo.versiculos.length !== 1 ? 's' : ''}
                          </CardDescription>
                        </div>
                        {expandedTerms[termo.palavra] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="space-y-4 sm:space-y-6">
                        {termo.versiculos.map((versiculo, versIndex) => (
                          <div key={versIndex} className="border-l-2 border-indigo-600 pl-3 sm:pl-4 space-y-2 sm:space-y-3">
                            <Badge variant="outline" className="border-indigo-700 text-indigo-300 text-xs sm:text-sm">
                              {versiculo.referencia}
                            </Badge>
                            
                            <div className="space-y-2">
                              <div>
                                <h5 className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Texto:</h5>
                                <p className="text-gray-300 text-sm sm:text-base italic leading-relaxed">"{versiculo.texto}"</p>
                              </div>
                              
                              {versiculo.textoOriginal && (
                                <div>
                                  <h5 className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">
                                    Texto Original ({versiculo.testamento === 'antigo' ? 'Hebraico' : 'Grego'}):
                                  </h5>
                                  <p className="text-yellow-300 text-sm sm:text-base font-mono bg-black/30 p-2 rounded">
                                    {versiculo.textoOriginal}
                                  </p>
                                </div>
                              )}
                              
                              {versiculo.transliteracao && (
                                <div>
                                  <h5 className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Transliteração:</h5>
                                  <p className="text-green-300 text-sm sm:text-base italic bg-black/30 p-2 rounded">
                                    {versiculo.transliteracao}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;
