
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Presentation } from "lucide-react";
import BibleSidebar from "@/components/BibleSidebar";
import BibleVerseGrid from "@/components/BibleVerseGrid";
import BibleVerse, { getNumeroVersiculos } from "@/components/BibleVerse";
import ScrollToTop from "@/components/ScrollToTop";
import BibleVersionSelector from "@/components/BibleVersionSelector";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";

const BibleReader = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [versaoBiblia, setVersaoBiblia] = useState(searchParams.get("versao") || "nvi");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#v')) {
      const verse = parseInt(hash.substring(2));
      if (!isNaN(verse) && verse > 0 && verse <= totalVerses) {
        setSelectedVerse(verse);
        toast.info(`Versículo ${verse} selecionado`);
      }
    } else {
      setSelectedVerse(null);
    }
    
    setError(null);
  }, [livro, capitulo, totalVerses]);
  
  useEffect(() => {
    const versaoUrl = searchParams.get("versao");
    if (versaoUrl) {
      setVersaoBiblia(versaoUrl);
    }
  }, [searchParams]);
  
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };

  const handleVerseSelect = (verse: number) => {
    setSelectedVerse(verse);
    window.location.hash = `v${verse}`;
    toast.success(`Versículo ${verse} selecionado`);
  };
  
  const handleVersionChange = (novaVersao: string) => {
    if (novaVersao === versaoBiblia) return;
    
    setVersaoBiblia(novaVersao);
    setSearchParams(prev => {
      prev.set("versao", novaVersao);
      return prev;
    });
    toast.info(`Versão alterada para ${novaVersao.toUpperCase()}`);
  };
  
  const handlePreviousChapter = () => {
    const currentChapter = parseInt(capitulo);
    if (currentChapter > 1) {
      window.location.href = `/biblia/${livro}/${currentChapter - 1}${versaoBiblia ? `?versao=${versaoBiblia}` : ''}`;
    }
  };
  
  const handleNextChapter = () => {
    const currentChapter = parseInt(capitulo);
    window.location.href = `/biblia/${livro}/${currentChapter + 1}${versaoBiblia ? `?versao=${versaoBiblia}` : ''}`;
  };

  const handleOpenSlideMode = () => {
    if (selectedVerse) {
      navigate(`/slide/${livro}/${capitulo}?versao=${versaoBiblia}&verso=${selectedVerse}`);
    } else {
      toast.error("Selecione um versículo para apresentação");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="w-full p-2 sm:p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-2xl sm:text-3xl font-bold italic text-gray-300 hover:text-white transition">
            Bíblia Sagrada
          </Link>
          
          <div className="flex w-full md:w-auto items-center gap-2">
            <Button variant="outline" className="hidden sm:inline-flex rounded-md text-sm bg-zinc-900 border-zinc-700 text-gray-300">
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
        
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm">
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário</Link>
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex flex-1 overflow-hidden">
        <BibleSidebar />
        
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed bg-opacity-20">
          <div className="container mx-auto px-1 sm:px-4">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-6 text-white">
              {formatBookTitle(livro)} - CAPÍTULO {capitulo}
              {selectedVerse && <span className="block sm:inline"> - VERSÍCULO {selectedVerse}</span>}
            </h1>
            
            <div className="mb-6">
              <BibleVersionSelector 
                onVersionChange={handleVersionChange} 
                initialVersion={versaoBiblia}
              />
            </div>
            
            <div className="bg-black/70 p-3 sm:p-4 rounded-lg mb-6 text-gray-300 text-xs sm:text-sm">
              <p className="mb-2">
                <strong>Como navegar na Bíblia:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use o botão "Livros" (em dispositivos móveis) ou o menu lateral para selecionar livros</li>
                <li>Clique em um número abaixo para selecionar um versículo específico</li>
                <li>Use os botões de navegação para avançar ou retroceder entre os capítulos</li>
                <li>Selecione diferentes versões da Bíblia no menu suspenso acima</li>
              </ul>
            </div>
            
            <div className="mb-6 flex flex-col items-center">
              <Pagination className="mb-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={handlePreviousChapter} className="cursor-pointer bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 sm:mx-2 px-2 sm:px-6 text-xs sm:text-sm" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink className="bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 sm:mx-2 px-2 sm:px-8 min-w-20 sm:min-w-40 text-xs sm:text-sm">
                      Capítulo {capitulo}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={handleNextChapter} className="cursor-pointer bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 sm:mx-2 px-2 sm:px-6 text-xs sm:text-sm" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              
              {selectedVerse && (
                <Button 
                  onClick={handleOpenSlideMode} 
                  className="bg-amber-700 hover:bg-amber-600 text-white px-4 sm:px-8 py-1 sm:py-2 rounded-md flex items-center gap-2 mb-4 text-xs sm:text-sm"
                >
                  <Presentation size={isMobile ? 14 : 18} />
                  Apresentação
                </Button>
              )}
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-900/60 border-red-800 text-white">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <BibleVerseGrid 
              totalVerses={totalVerses} 
              onVerseSelect={handleVerseSelect}
              rows={isMobile ? 10 : 4}
            />
            
            <BibleVerse 
              livro={livro} 
              capitulo={parseInt(capitulo)} 
              versiculo={selectedVerse}
              versao={versaoBiblia}
            />
            
            <footer className="text-center text-xs sm:text-sm text-gray-400 mt-8 pb-20 md:pb-8">
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
