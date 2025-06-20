
import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getNumeroVersiculos } from "@/components/BibleVerse";
import { useBibleSlideNavigation } from "@/hooks/useBibleSlideNavigation";
import SlideVerseDisplay from "@/components/SlideVerseDisplay";
import SlideNavigationControls from "@/components/SlideNavigationControls";

const BibleSlide = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const versaoBiblia = searchParams.get("versao") || "nvi";
  const versoInicial = searchParams.get("verso") ? parseInt(searchParams.get("verso") || "1") : 1;
  
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  const {
    currentVerse,
    setCurrentVerse,
    handlePreviousVerse,
    handleNextVerse,
    handleExit
  } = useBibleSlideNavigation({
    livro,
    capitulo,
    versaoBiblia,
    versoInicial,
    totalVerses
  });

  // Atualiza a URL quando o versículo muda
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("verso", currentVerse.toString());
    navigate(`/slide/${livro}/${capitulo}?${newParams.toString()}`, { replace: true });
  }, [currentVerse, livro, capitulo, searchParams, navigate]);
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-4 relative">
      <SlideNavigationControls 
        onPrevious={handlePreviousVerse}
        onNext={handleNextVerse}
        onExit={handleExit}
      />
      
      <SlideVerseDisplay 
        livro={livro}
        capitulo={capitulo}
        currentVerse={currentVerse}
        versaoBiblia={versaoBiblia}
      />
    </div>
  );
};

export default BibleSlide;
