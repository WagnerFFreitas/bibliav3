
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pesquisar?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-gray-300 hover:text-white transition">
            Bíblia Sagrada
          </Link>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-2">
            <Button variant="outline" className="rounded-md text-sm bg-zinc-900 border-zinc-700 text-gray-300">
              Todos
            </Button>
            <Input
              type="text"
              placeholder="Digite o termo de busca"
              className="w-full md:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="rounded-md bg-green-600 hover:bg-green-700 text-white">
              Buscar
            </Button>
          </form>
        </div>
        
        {/* Menu de navegação */}
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-6 text-gray-400">
            <Link to="/" className="whitespace-nowrap hover:text-white transition">Slide</Link>
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
            <div className="relative group whitespace-nowrap">
              <span className="hover:text-white transition cursor-pointer">Harpa e Hinário</span>
              <div className="absolute hidden group-hover:block bg-black border border-gray-800 rounded-md p-2 mt-1 z-10 w-40">
                <Link to="/harpa" className="block py-1 hover:text-white transition">Harpa Cristã</Link>
                <Link to="/hinario" className="block py-1 hover:text-white transition">Hinário Cristão</Link>
              </div>
            </div>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar com livros */}
        <div className="w-64 md:w-72 h-full overflow-y-auto bg-black border-r border-gray-800 p-4">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">LIVROS</h2>
          <ul className="space-y-2">
            <li><Link to="/biblia/genesis/1" className="block py-1.5 px-2 rounded text-white font-semibold">Gênesis</Link></li>
            <li><Link to="/biblia/exodo/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Êxodo</Link></li>
            <li><Link to="/biblia/levitico/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Levítico</Link></li>
            <li><Link to="/biblia/numeros/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Números</Link></li>
            <li><Link to="/biblia/deuteronomio/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Deuteronômio</Link></li>
            <li><Link to="/biblia/josue/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Josué</Link></li>
            <li><Link to="/biblia/juizes/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Juízes</Link></li>
            <li><Link to="/biblia/rute/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Rute</Link></li>
            <li><Link to="/biblia/1samuel/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">1º Samuel</Link></li>
            <li><Link to="/biblia/2samuel/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">2º Samuel</Link></li>
            <li><Link to="/biblia/1reis/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">1º Reis</Link></li>
            <li><Link to="/biblia/2reis/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">2º Reis</Link></li>
            <li><Link to="/biblia/1cronicas/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">1º Crônicas</Link></li>
            <li><Link to="/biblia/2cronicas/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">2º Crônicas</Link></li>
            <li><Link to="/biblia/esdras/1" className="block py-1.5 px-2 rounded text-gray-400 hover:text-white">Esdras</Link></li>
            {/* Exibimos apenas uma parte da lista para economizar espaço */}
          </ul>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed bg-opacity-20">
          <div className="container mx-auto">
            {/* Conteúdo da página inicial */}
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Bem-vindo à Bíblia Sagrada Online</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Explore a Palavra de Deus em diversas traduções, pesquise versículos e aprofunde seu conhecimento das escrituras.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-4 text-lg">
                  <Link to="/biblia/genesis/1">
                    Começar a Leitura
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 px-6 py-4 text-lg">
                  <Link to="/versoes">
                    Ver Versões Disponíveis
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 p-6 bg-black/60 rounded-lg border border-gray-800 max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">Versículo do Dia</h2>
                <p className="text-xl text-gray-300 mb-4">
                  "No princípio, Deus criou os céus e a terra."
                </p>
                <p className="text-lg font-semibold text-indigo-300">Gênesis 1:1</p>
              </div>
            </div>
            
            <footer className="text-center text-sm text-gray-400 mt-12">
              © Bíblia Sagrada 2024
            </footer>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
