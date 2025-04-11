
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { getNumeroVersiculos } from "@/components/BibleVerse";
import BibleVerseDisplay from "@/components/BibleVerseDisplay";

const BibleSlide = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const versaoBiblia = searchParams.get("versao") || "nvi";
  const versoInicial = searchParams.get("verso") ? parseInt(searchParams.get("verso") || "1") : 1;
  
  const [currentVerse, setCurrentVerse] = useState(versoInicial);
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  // Formatar o título do livro
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };
  
  // Função para navegar para o versículo anterior
  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(prevVerse => prevVerse - 1);
    } else {
      // Se estiver no primeiro versículo do capítulo atual, voltar para o capítulo anterior
      const currentChapter = parseInt(capitulo);
      if (currentChapter > 1) {
        const previousChapter = currentChapter - 1;
        const versesInPreviousChapter = getNumeroVersiculos(livro, previousChapter);
        navigate(`/slide/${livro}/${previousChapter}?versao=${versaoBiblia}&verso=${versesInPreviousChapter}`);
      } else {
        toast.info("Você está no primeiro versículo do primeiro capítulo");
      }
    }
  };
  
  // Função para navegar para o próximo versículo
  const handleNextVerse = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(prevVerse => prevVerse + 1);
    } else {
      // Se estiver no último versículo do capítulo atual, avançar para o próximo capítulo
      const currentChapter = parseInt(capitulo);
      navigate(`/slide/${livro}/${currentChapter + 1}?versao=${versaoBiblia}&verso=1`);
    }
  };
  
  // Manipulador de teclas para navegação pelo teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousVerse();
      } else if (event.key === "ArrowRight") {
        handleNextVerse();
      } else if (event.key === "Escape") {
        navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVerse, livro, capitulo, versaoBiblia, navigate]);
  
  // Atualiza a URL quando o versículo muda
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("verso", currentVerse.toString());
    navigate(`/slide/${livro}/${capitulo}?${newParams.toString()}`, { replace: true });
  }, [currentVerse, livro, capitulo, searchParams]);
  
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen bg-black p-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/f90b0e7a-68f9-4318-8954-08467f03308f.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Imagem da Bíblia como marca d'água com 50% de opacidade */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/89091c05-b401-4865-af7e-2c63a0e5a839.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5
        }}
      ></div>
      
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`)}
          className="text-white hover:bg-black/40"
        >
          Sair do Modo Apresentação
        </Button>
      </div>
      
      <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center justify-center z-10">
        <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-wide text-yellow-500 mb-8">
          {formatBookTitle(livro).toUpperCase()} - CAPÍTULO {capitulo} - VERSÍCULO {currentVerse}
        </h1>
        
        {/* Texto do versículo */}
        <div className="w-full">
          <BibleVerseDisplay
            livro={formatBookTitle(livro)}
            capitulo={parseInt(capitulo)}
            versao={versaoBiblia}
            singleVerse={currentVerse}
            slideMode={true}
          />
        </div>
        
        {/* Botões de navegação */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handlePreviousVerse}
            className="bg-[#c1c1c1] hover:bg-[#a1a1a1] text-black text-xl px-8 py-6 h-auto flex items-center"
          >
            <ArrowLeft className="mr-2 h-6 w-6" />
            VOLTAR
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleNextVerse}
            className="bg-[#c1c1c1] hover:bg-[#a1a1a1] text-black text-xl px-8 py-6 h-auto flex items-center"
          >
            PRÓXIMO
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BibleSlide;
