
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Presentation, Search } from "lucide-react";
import BibleSidebar from "@/components/BibleSidebar";
import { getNumeroVersiculos } from "@/components/BibleVerse";
import BibleVerseDisplay from "@/components/BibleVerseDisplay";
import ScrollToTop from "@/components/ScrollToTop";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const BibleReader = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(1);
  const [versaoBiblia, setVersaoBiblia] = useState(searchParams.get("versao") || "nvi");
  
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  // Formatar o título do livro
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pesquisar?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const openSlideMode = () => {
    const verseToShow = selectedVerse || 1;
    navigate(`/slide/${livro}/${capitulo}?versao=${versaoBiblia}&verso=${verseToShow}`);
  };
  
  const handlePreviousChapter = () => {
    const currentChapter = parseInt(capitulo);
    if (currentChapter > 1) {
      navigate(`/biblia/${livro}/${currentChapter - 1}?versao=${versaoBiblia}`);
    }
  };
  
  const handleNextChapter = () => {
    const currentChapter = parseInt(capitulo);
    navigate(`/biblia/${livro}/${currentChapter + 1}?versao=${versaoBiblia}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-white">
            Bíblia Sagrada
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-black border-zinc-700 text-white"
              type="button"
              onClick={openSlideMode}
            >
              <Presentation className="mr-2 h-4 w-4" />
              Slide
            </Button>
            <div className="relative">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Digite o termo de busca"
                  className="w-full md:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500 pr-10"
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
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Buscar
            </Button>
          </div>
        </div>
        
        {/* Menu de navegação */}
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-6 text-gray-400">
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/" className="whitespace-nowrap hover:text-white transition font-bold">Bíblia</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar com livros - com barra de rolagem */}
        <ScrollArea className="w-64 h-full bg-black border-r border-gray-800">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">LIVROS</h2>
            <BibleSidebar />
          </div>
        </ScrollArea>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
          <div className="container mx-auto">
            <h1 className="text-center text-4xl font-bold uppercase mb-6 text-white">
              {formatBookTitle(livro).toUpperCase()} - CAPÍTULO {capitulo} - VERSÍCULO {selectedVerse}
            </h1>
            
            <div className="flex justify-center mb-6">
              <select
                className="p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white"
                value={versaoBiblia}
                onChange={(e) => setVersaoBiblia(e.target.value)}
              >
                <option value="nvi">Nova Versão Internacional</option>
                <option value="acf">Almeida Corrigida Fiel</option>
                <option value="ara">Almeida Revista e Atualizada</option>
                <option value="naa">Nova Almeida Atualizada</option>
                <option value="ntlh">Nova Tradução na Linguagem de Hoje</option>
              </select>
              <Button 
                className="bg-blue-700 hover:bg-blue-600 ml-2"
                onClick={() => toast.success("Versão selecionada")}
              >
                <Book className="mr-2 h-4 w-4" />
                Ler Agora
              </Button>
            </div>
            
            <div className="bg-black/70 p-4 rounded-lg mb-6 text-gray-300 text-sm">
              <p className="mb-2">
                <strong>Como navegar na Bíblia:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use o menu lateral para selecionar diferentes livros da Bíblia</li>
                <li>Clique em um número abaixo para selecionar um versículo específico</li>
                <li>Use os botões de navegação para avançar ou retroceder entre os capítulos</li>
                <li>Selecione diferentes versões da Bíblia no menu suspenso acima</li>
                <li>Use o botão "Slide" para abrir o modo de apresentação</li>
              </ul>
              <p className="mt-2 text-gray-400 italic">
                Nota: Quando um versículo não está disponível em uma versão específica, o sistema exibirá 
                um texto simulado ou mostrará o versículo de outra versão como alternativa.
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant="outline"
                className="bg-indigo-900/60 hover:bg-indigo-800 border-indigo-700"
                onClick={handlePreviousChapter}
              >
                Previous
              </Button>
              <span className="flex items-center bg-indigo-900/60 px-4 py-2 rounded-md border border-indigo-700">
                Capítulo {capitulo}
              </span>
              <Button
                variant="outline"
                className="bg-indigo-900/60 hover:bg-indigo-800 border-indigo-700"
                onClick={handleNextChapter}
              >
                Next
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white mb-8 mx-auto block"
              onClick={openSlideMode}
            >
              <Presentation className="mr-2 h-5 w-5" />
              Modo Apresentação
            </Button>
            
            <BibleVerseDisplay 
              livro={formatBookTitle(livro)} 
              capitulo={parseInt(capitulo)} 
              versao={versaoBiblia}
              singleVerse={selectedVerse}
            />
            
            <footer className="text-center text-sm text-gray-400 mt-8">
              © Bíblia Sagrada 2024
            </footer>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default BibleReader;
