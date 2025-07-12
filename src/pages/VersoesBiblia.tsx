
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Check, Star, Search, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Cabecalho from "@/components/Cabecalho";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";

const versoesBiblia = [
  { 
    id: "nvi", 
    nome: "Nova Versão Internacional", 
    sigla: "NVI",
    descricao: "Uma tradução contemporânea reconhecida pela sua precisão e clareza, ideal para estudo e devoção diária.",
    ano: 2000,
    destaque: true,
    categoria: "Contemporânea",
    idioma: "Português"
  },
  { 
    id: "acf", 
    nome: "Almeida Corrigida Fiel", 
    sigla: "ACF",
    descricao: "Versão tradicional revisada que mantém a fidelidade aos textos originais com linguagem clássica.",
    ano: 1995,
    destaque: false,
    categoria: "Tradicional",
    idioma: "Português"
  },
  { 
    id: "ara", 
    nome: "Almeida Revista e Atualizada", 
    sigla: "ARA",
    descricao: "Uma atualização da tradução clássica de João Ferreira de Almeida com linguagem atualizada.",
    ano: 1993,
    destaque: false,
    categoria: "Clássica",
    idioma: "Português"
  },
  { 
    id: "arc", 
    nome: "Almeida Revista e Corrigida", 
    sigla: "ARC",
    descricao: "A versão clássica de Almeida, amplamente utilizada nas igrejas evangélicas brasileiras.",
    ano: 1969,
    destaque: false,
    categoria: "Clássica",
    idioma: "Português"
  },
  { 
    id: "ntlh", 
    nome: "Nova Tradução na Linguagem de Hoje", 
    sigla: "NTLH",
    descricao: "Tradução em linguagem simples e acessível, ideal para novos convertidos e jovens.",
    ano: 2000,
    destaque: false,
    categoria: "Contemporânea",
    idioma: "Português"
  },
  { 
    id: "naa", 
    nome: "Nova Almeida Atualizada", 
    sigla: "NAA",
    descricao: "Revisão moderna da tradição de Almeida, combinando fidelidade e clareza contemporânea.",
    ano: 2017,
    destaque: false,
    categoria: "Contemporânea",
    idioma: "Português"
  },
  { 
    id: "kjv", 
    nome: "King James Version", 
    sigla: "KJV",
    descricao: "A tradicional versão inglesa, conhecida por sua linguagem majestosa e influência histórica.",
    ano: 1611,
    destaque: false,
    categoria: "Clássica",
    idioma: "Inglês"
  },
  { 
    id: "aa", 
    nome: "Almeida Antiga", 
    sigla: "AA",
    descricao: "A versão original da tradução de João Ferreira de Almeida, preservando a linguagem histórica.",
    ano: 1681,
    destaque: false,
    categoria: "Histórica",
    idioma: "Português"
  }
];

const VersoesBiblia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categorias = ["Todas", "Contemporânea", "Tradicional", "Clássica", "Histórica"];

  const versoesFiltradas = versoesBiblia.filter(versao => {
    const matchesSearch = versao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         versao.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         versao.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || versao.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Cabecalho />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Versões da Bíblia Sagrada
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore diferentes traduções da Palavra de Deus. Cada versão oferece uma perspectiva única 
            para aprofundar seu estudo e compreensão das Escrituras Sagradas.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar versão..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={selectedCategory === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(categoria)}
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Versions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {versoesFiltradas.map((versao) => (
            <Card key={versao.id} className={`relative transition-all hover:shadow-lg ${versao.destaque ? "ring-2 ring-primary" : ""}`}>
              {versao.destaque && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Recomendada
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{versao.nome}</CardTitle>
                    <CardDescription className="font-semibold text-primary">
                      {versao.sigla} • {versao.ano}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {versao.categoria}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-3">
                  {versao.descricao}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Idioma: {versao.idioma}</span>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link to={`/biblia/genesis/1?versao=${versao.id}`}>
                    <Book className="mr-2 h-4 w-4" />
                    Ler Esta Versão
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {versoesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma versão encontrada com os filtros aplicados.
            </p>
          </div>
        )}

        {/* Additional Info Section */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Qual versão escolher?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Cada tradução da Bíblia tem suas características específicas. As versões contemporâneas 
            usam linguagem atual e são ideais para leitura diária. As traduções tradicionais 
            preservam a linguagem clássica e são excelentes para estudo profundo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/sobre">
                Saiba Mais Sobre as Traduções
              </Link>
            </Button>
            <Button asChild>
              <Link to="/pesquisar">
                <Search className="mr-2 h-4 w-4" />
                Pesquisar na Bíblia
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VersoesBiblia;
