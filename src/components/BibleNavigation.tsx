
import { Button } from "@/components/ui/button";
import { Presentation, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface BibleNavigationProps {
  livro: string;
  capitulo: string;
  selectedVerse: number | null;
  versaoBiblia: string;
}

const BibleNavigation = ({ livro, capitulo, selectedVerse, versaoBiblia }: BibleNavigationProps) => {
  const navigate = useNavigate();

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

  const handleOpenReadingMode = () => {
    navigate(`/leitura/${livro}/${capitulo}?versao=${versaoBiblia}`);
  };

  return (
    <div className="mb-4 sm:mb-6 flex flex-col items-center space-y-3 sm:space-y-4">
      <Pagination className="mb-2 sm:mb-4">
        <PaginationContent className="flex-wrap gap-1 sm:gap-0">
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousChapter} 
              className="cursor-pointer bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 px-2 sm:px-6 text-xs sm:text-sm" 
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 px-3 sm:px-8 min-w-[120px] sm:min-w-[160px] text-xs sm:text-sm">
              Capítulo {capitulo}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextChapter} 
              className="cursor-pointer bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 mx-1 px-2 sm:px-6 text-xs sm:text-sm" 
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button 
          onClick={handleOpenReadingMode} 
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 sm:px-8 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base"
        >
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Modo Leitura</span>
          <span className="sm:hidden">Leitura</span>
        </Button>
        
        {selectedVerse && (
          <Button 
            onClick={handleOpenSlideMode} 
            className="bg-amber-700 hover:bg-amber-600 text-white px-4 sm:px-8 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base"
          >
            <Presentation size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Apresentação (Slide)</span>
            <span className="sm:hidden">Slide</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default BibleNavigation;
