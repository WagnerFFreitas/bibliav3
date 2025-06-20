
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SlideNavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
}

const SlideNavigationControls = ({ onPrevious, onNext, onExit }: SlideNavigationControlsProps) => {
  return (
    <>
      {/* Botão de saída */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={onExit}
          className="text-blue-400 hover:bg-transparent hover:text-blue-300 text-sm"
        >
          Sair do Modo Apresentação
        </Button>
      </div>

      {/* Botões de navegação - Responsivos */}
      <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-6">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onPrevious}
          className="bg-gray-500 hover:bg-gray-400 text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 h-auto flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
        >
          <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          VOLTAR
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onNext}
          className="bg-gray-500 hover:bg-gray-400 text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 h-auto flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
        >
          PRÓXIMO
          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </>
  );
};

export default SlideNavigationControls;
