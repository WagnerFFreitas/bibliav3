
import { versiculosPorVersao } from "@/data/bibleSlideData";

interface SlideVerseDisplayProps {
  livro: string;
  capitulo: string;
  currentVerse: number;
  versaoBiblia: string;
}

const SlideVerseDisplay = ({ livro, capitulo, currentVerse, versaoBiblia }: SlideVerseDisplayProps) => {
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };

  const getVersiculo = () => {
    const versoes = versiculosPorVersao[versaoBiblia] || versiculosPorVersao.nvi;
    return versoes.find((v: any) => v.numero === currentVerse) || versoes[0];
  };

  const versiculo = getVersiculo();

  return (
    <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center space-y-6 px-4">
      {/* Título - Responsivo */}
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide text-yellow-500">
          {formatBookTitle(livro)} - CAPÍTULO {capitulo}
        </h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400">
          VERSÍCULO {currentVerse}
        </h2>
        
        {versiculo.titulo && (
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-500 mb-4">
            {versiculo.titulo}
          </h3>
        )}
      </div>
      
      {/* Texto do versículo - Responsivo com melhor espaçamento */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-relaxed max-w-5xl text-center px-2 sm:px-4">
          {versiculo.texto}
        </p>
      </div>
    </div>
  );
};

export default SlideVerseDisplay;
