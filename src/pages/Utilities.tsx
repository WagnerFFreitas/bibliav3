
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Book, BookOpen, Share2, PenTool } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

const Utilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-gray-300 hover:text-white transition">
            Bíblia Sagrada
          </Link>
          
          <div className="flex w-full md:w-auto items-center gap-2">
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
            <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white">
              Buscar
            </Button>
          </div>
        </div>
        
        {/* Menu de navegação */}
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-6 text-gray-400">
            <Link to="/" className="whitespace-nowrap hover:text-white transition">Slide</Link>
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-1 p-6 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed">
        <div className="container mx-auto max-w-4xl bg-black/70 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Utilidades</h1>
          
          <p className="text-gray-300 mb-8">
            Explore ferramentas úteis para enriquecer seu estudo bíblico e aprofundar seu conhecimento das Escrituras.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <Calendar className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Planos de Leitura</h2>
              <p className="text-gray-300 mb-4">
                Planos personalizados para ler a Bíblia em diferentes períodos, com lembretes diários.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Acessar Planos
              </Button>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <Search className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Busca Avançada</h2>
              <p className="text-gray-300 mb-4">
                Ferramenta de busca detalhada com filtros por livros, capítulos e temas específicos.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Buscar na Bíblia
              </Button>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <Book className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Comparação de Versões</h2>
              <p className="text-gray-300 mb-4">
                Compare o mesmo versículo em diferentes traduções para um entendimento mais profundo.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Comparar Traduções
              </Button>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <BookOpen className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Estudo Bíblico</h2>
              <p className="text-gray-300 mb-4">
                Materiais de estudo, comentários e recursos para aprofundamento nas Escrituras.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Iniciar Estudo
              </Button>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <Share2 className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Compartilhamento</h2>
              <p className="text-gray-300 mb-4">
                Ferramentas para compartilhar versículos e trechos bíblicos em redes sociais.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Compartilhar
              </Button>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center h-full">
              <PenTool className="w-12 h-12 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Anotações Pessoais</h2>
              <p className="text-gray-300 mb-4">
                Crie e gerencie suas anotações pessoais durante a leitura da Bíblia.
              </p>
              <Button className="bg-indigo-700 hover:bg-indigo-600 mt-auto">
                Minhas Anotações
              </Button>
            </div>
          </div>
          
          <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-black/50">
            <h2 className="text-xl font-bold mb-2 text-indigo-300">Em Breve</h2>
            <p className="text-gray-300">
              Estamos constantemente desenvolvendo novas ferramentas para enriquecer sua experiência com a Palavra de Deus. Fique atento às atualizações!
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-black p-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-sm text-gray-400">
          © Bíblia Sagrada 2024
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Utilities;
