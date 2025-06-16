
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import DictionarySearch from "@/components/DictionarySearch";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-3 sm:p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between items-center">
            <Link to="/" className="text-2xl sm:text-3xl font-bold italic text-gray-300 hover:text-white transition">
              Bíblia Sagrada
            </Link>
            
            <div className="flex w-full lg:w-auto items-center gap-2">
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex rounded-md text-sm bg-zinc-900 border-zinc-700 text-gray-300"
              >
                Todos
              </Button>
              <Input
                type="text"
                placeholder="Digite o termo de busca"
                className="flex-1 lg:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500 h-10 sm:h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 h-10 sm:h-11">
                <span className="hidden sm:inline">Buscar</span>
                <span className="sm:hidden">🔍</span>
              </Button>
            </div>
          </div>
          
          {/* Menu de navegação */}
          <nav className="mt-3 sm:mt-4">
            <div className="flex lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="ml-2">Menu</span>
              </Button>
            </div>
            
            <div className={`${
              mobileMenuOpen ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row overflow-x-auto py-2 gap-4 lg:gap-6 text-gray-400`}>
              <Link to="/" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Slide</Link>
              <Link to="/versoes" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Versões</Link>
              <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0 text-white">Dicionário e Concordância</Link>
              <Link to="/harpa" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Harpa e Hinário</Link>
              <Link to="/baixar" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Baixar</Link>
              <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Utilidades</Link>
              <Link to="/contato" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Contato</Link>
              <Link to="/sobre" className="whitespace-nowrap hover:text-white transition py-2 lg:py-0">Sobre</Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 p-3 sm:p-6 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed">
        <div className="container mx-auto max-w-6xl bg-black/70 p-4 sm:p-6 rounded-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
            Dicionário e Concordância Bíblica
          </h1>
          
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed text-center lg:text-left">
            Explore termos bíblicos com definições detalhadas no Dicionário Bíblico, ou encontre versículos 
            específicos que contêm determinadas palavras através da Concordância Bíblica.
          </p>
          
          <DictionarySearch />
        </div>
      </main>
      
      <footer className="bg-black p-3 sm:p-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-xs sm:text-sm text-gray-400">
          © Bíblia Sagrada 2024
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Dictionary;
