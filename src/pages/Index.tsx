
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pesquisar?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const versoesBiblia = [
    { 
      id: "nvi", 
      nome: "Nova Versão Internacional", 
      descricao: "Uma tradução contemporânea reconhecida pela sua precisão e clareza.",
      ano: 2000,
      destaque: true
    },
    { 
      id: "acf", 
      nome: "Almeida Corrigida Fiel", 
      descricao: "Versão tradicional revisada que mantém a fidelidade aos textos originais.",
      ano: 1995,
      destaque: false
    },
    { 
      id: "ara", 
      nome: "Almeida Revista e Atualizada", 
      descricao: "Uma atualização da tradução clássica de João Ferreira de Almeida.",
      ano: 1993,
      destaque: false
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="w-full py-4 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span className="text-xl font-bold">BíbliaOnline</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary">Início</Link>
            <Link to="/versoes" className="font-medium hover:text-primary">Versões</Link>
            <Link to="/pesquisar" className="font-medium hover:text-primary">Pesquisar</Link>
            <Link to="/harpa-hinario" className="font-medium hover:text-primary">Harpa e Hinário</Link>
            <Link to="/sobre" className="font-medium hover:text-primary">Sobre</Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-64 hidden md:block">
              <form onSubmit={handleSearch}>
                <Input
                  type="search"
                  placeholder="Buscar"
                  className="pr-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </button>
              </form>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800">Minha Conta</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Cabeçalho da página */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Bem-vindo à Bíblia Sagrada Online</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore diferentes traduções da Bíblia Sagrada para enriquecer seu estudo e compreensão das escrituras.
          </p>
        </div>
        
        {/* Seletor de versão */}
        <div className="max-w-lg mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Selecione uma Versão para Leitura</h2>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <select 
                className="w-full p-3 rounded-md border border-gray-300 appearance-none pr-10"
                defaultValue="nvi"
              >
                <option value="nvi">Nova Versão Internacional</option>
                <option value="acf">Almeida Corrigida Fiel</option>
                <option value="ara">Almeida Revista e Atualizada</option>
                <option value="naa">Nova Almeida Atualizada</option>
                <option value="ntlh">Nova Tradução na Linguagem de Hoje</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Book className="mr-2 h-5 w-5" />
              Ler Agora
            </Button>
          </div>
        </div>
        
        {/* Cards de versões */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {versoesBiblia.map((versao) => (
            <Card key={versao.id} className={versao.destaque ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl flex items-center">
                    {versao.nome}
                    {versao.destaque && <Check className="ml-2 h-5 w-5 text-blue-600" />}
                  </CardTitle>
                </div>
                <CardDescription>Publicada em {versao.ano}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{versao.descricao}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild variant="outline">
                  <Link to={`/biblia/genesis/1?versao=${versao.id}`}>
                    <Book className="mr-2 h-4 w-4" />
                    Ler Esta Versão
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Bíblia Sagrada Online. Todos os direitos reservados.</p>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
