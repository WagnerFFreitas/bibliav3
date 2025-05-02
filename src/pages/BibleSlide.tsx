
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { getNumeroVersiculos } from "@/components/BibleVerse";

const BibleSlide = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const versaoBiblia = searchParams.get("versao") || "nvi";
  const versoInicial = searchParams.get("verso") ? parseInt(searchParams.get("verso") || "1") : 1;
  
  const [currentVerse, setCurrentVerse] = useState(versoInicial);
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  const versiculosPorVersao: Record<string, any> = {
    nvi: [
      { numero: 1, texto: "No princípio, Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.", titulo: "A CRIAÇÃO" },
      { numero: 3, texto: "Disse Deus: 'Haja luz', e houve luz.", titulo: "A CRIAÇÃO" },
    ],
    acf: [
      { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.", titulo: "A CRIAÇÃO" },
      { numero: 3, texto: "E disse Deus: Haja luz; e houve luz.", titulo: "A CRIAÇÃO" },
    ],
  };
  
  const getVersiculo = () => {
    const versoes = versiculosPorVersao[versaoBiblia] || versiculosPorVersao.nvi;
    return versoes.find((v: any) => v.numero === currentVerse) || versoes[0];
  };
  
  const versiculo = getVersiculo();
  
  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(prevVerse => prevVerse - 1);
    } else {
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
  
  const handleNextVerse = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(prevVerse => prevVerse + 1);
    } else {
      const currentChapter = parseInt(capitulo);
      navigate(`/slide/${livro}/${currentChapter + 1}?versao=${versaoBiblia}&verso=1`);
    }
  };
  
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
  
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("verso", currentVerse.toString());
    navigate(`/slide/${livro}/${capitulo}?${newParams.toString()}`, { replace: true });
  }, [currentVerse, livro, capitulo, searchParams]);
  
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };
  
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/lovable-uploads/b03d623a-5c23-4daa-ad82-aaa31f8b3838.png")' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />

      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`)}
          className="text-blue-400 hover:bg-transparent hover:text-blue-300 text-sm"
        >
          Sair do Modo Apresentação
        </Button>
      </div>
      
      <div className="max-w-full w-[90vw] mx-auto text-center flex flex-col items-center justify-center z-10 overflow-hidden pt-16">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-yellow-500 mb-6 md:mb-8">
          {formatBookTitle(livro)} - CAPÍTULO {capitulo} - VERSÍCULO {currentVerse}
        </h1>
        
        {versiculo.titulo && (
          <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-8 md:mb-12">{versiculo.titulo}</h2>
        )}
        
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 md:mb-16 leading-normal max-w-[95vw]">
          {versiculo.texto}
        </p>
        
        <div className="flex justify-center gap-4 mt-2">
          <Button 
            variant="outline" 
            onClick={handlePreviousVerse}
            className="bg-gray-600 hover:bg-gray-500 text-black text-sm px-4 py-1 h-auto"
            size="sm"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            VOLTAR
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleNextVerse}
            className="bg-gray-600 hover:bg-gray-500 text-black text-sm px-4 py-1 h-auto"
            size="sm"
          >
            PRÓXIMO
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BibleSlide;
