
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getNumeroVersiculos } from "@/components/BibleVerse";

interface UseBibleSlideNavigationProps {
  livro: string;
  capitulo: string;
  versaoBiblia: string;
  versoInicial: number;
  totalVerses: number;
}

export const useBibleSlideNavigation = ({
  livro,
  capitulo,
  versaoBiblia,
  versoInicial,
  totalVerses
}: UseBibleSlideNavigationProps) => {
  const [currentVerse, setCurrentVerse] = useState(versoInicial);
  const navigate = useNavigate();

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

  const handleExit = () => {
    navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`);
  };

  // Manipulador de teclas para navegação pelo teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousVerse();
      } else if (event.key === "ArrowRight") {
        handleNextVerse();
      } else if (event.key === "Escape") {
        handleExit();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVerse, livro, capitulo, versaoBiblia]);

  return {
    currentVerse,
    setCurrentVerse,
    handlePreviousVerse,
    handleNextVerse,
    handleExit
  };
};
