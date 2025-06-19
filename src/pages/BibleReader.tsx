
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import BibleHeader from "@/components/BibleHeader";
import NavegacaoBiblia from "@/components/NavegacaoBiblia";
import BibleInstructions from "@/components/BibleInstructions";
import BibleSidebar from "@/components/BibleSidebar";
import GradeVersiculosBiblia from "@/components/GradeVersiculosBiblia";
import BibleVerse, { getNumeroVersiculos } from "@/components/BibleVerse";
import ScrollToTop from "@/components/ScrollToTop";
import SeletorVersaoBiblia from "@/components/SeletorVersaoBiblia";

const BibleReader = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [versaoBiblia, setVersaoBiblia] = useState(searchParams.get("versao") || "nvi");
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <BibleHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Hidden on mobile by default */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          fixed lg:relative 
          z-10 
          transition-transform duration-300 ease-in-out
          h-full
        `}>
          <BibleSidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-5"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed bg-opacity-20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 sm:mb-6 text-white px-2">
              {formatBookTitle(livro)} - CAPÍTULO {capitulo}
              {selectedVerse && <span className="block sm:inline"> - VERSÍCULO {selectedVerse}</span>}
            </h1>
            
            <div className="mb-4 sm:mb-6">
              <SeletorVersaoBiblia 
                aoMudarVersao={handleVersionChange} 
                versaoInicial={versaoBiblia}
              />
            </div>
            
            <BibleInstructions />
            
            <NavegacaoBiblia 
              livro={livro}
              capitulo={capitulo}
              versiculoSelecionado={selectedVerse}
              versaoBiblia={versaoBiblia}
            />
            
            {error && (
              <Alert variant="destructive" className="mb-4 sm:mb-6 bg-red-900/60 border-red-800 text-white">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <GradeVersiculosBiblia 
              totalVersiculos={totalVerses} 
              aoSelecionarVersiculo={handleVerseSelect}
            />
            
            <BibleVerse 
              livro={livro} 
              capitulo={parseInt(capitulo)} 
              versiculo={selectedVerse}
              versao={versaoBiblia}
            />
            
            <footer className="text-center text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8">
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
