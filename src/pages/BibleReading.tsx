
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import BibleVerseDisplay from "@/components/BibleVerseDisplay";
import { toast } from "sonner";

// Lista de livros da Bíblia em ordem
const livrosBiblia = [
  "genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "juizes", 
  "rute", "1samuel", "2samuel", "1reis", "2reis", "1cronicas", "2cronicas", 
  "esdras", "neemias", "ester", "jo", "salmos", "proverbios", "eclesiastes", 
  "cantares", "isaias", "jeremias", "lamentacoes", "ezequiel", "daniel", 
  "oseias", "joel", "amos", "obadias", "jonas", "miqueias", "naum", 
  "habacuque", "sofonias", "ageu", "zacarias", "malaquias", "mateus", 
  "marcos", "lucas", "joao", "atos", "romanos", "1corintios", "2corintios", 
  "galatas", "efesios", "filipenses", "colossenses", "1tessalonicenses", 
  "2tessalonicenses", "1timoteo", "2timoteo", "tito", "filemom", "hebreus", 
  "tiago", "1pedro", "2pedro", "1joao", "2joao", "3joao", "judas", "apocalipse"
];

// Número de capítulos por livro (simplificado - você pode expandir)
const capitulosPorLivro: Record<string, number> = {
  "genesis": 50, "exodo": 40, "levitico": 27, "numeros": 36, "deuteronomio": 34,
  "josue": 24, "juizes": 21, "rute": 4, "1samuel": 31, "2samuel": 24,
  "1reis": 22, "2reis": 25, "1cronicas": 29, "2cronicas": 36, "esdras": 10,
  "neemias": 13, "ester": 10, "jo": 42, "salmos": 150, "proverbios": 31,
  "eclesiastes": 12, "cantares": 8, "isaias": 66, "jeremias": 52, "lamentacoes": 5,
  "ezequiel": 48, "daniel": 12, "oseias": 14, "joel": 3, "amos": 9,
  "obadias": 1, "jonas": 4, "miqueias": 7, "naum": 3, "habacuque": 3,
  "sofonias": 3, "ageu": 2, "zacarias": 14, "malaquias": 4, "mateus": 28,
  "marcos": 16, "lucas": 24, "joao": 21, "atos": 28, "romanos": 16,
  "1corintios": 16, "2corintios": 13, "galatas": 6, "efesios": 6, "filipenses": 4,
  "colossenses": 4, "1tessalonicenses": 5, "2tessalonicenses": 3, "1timoteo": 6,
  "2timoteo": 4, "tito": 3, "filemom": 1, "hebreus": 13, "tiago": 5,
  "1pedro": 5, "2pedro": 3, "1joao": 5, "2joao": 1, "3joao": 1,
  "judas": 1, "apocalipse": 22
};

const BibleReading = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const versaoBiblia = searchParams.get("versao") || "nvi";

  const formatBookTitle = (book: string) => {
    const bookNames: Record<string, string> = {
      "genesis": "Gênesis",
      "exodo": "Êxodo",
      "levitico": "Levítico",
      "numeros": "Números",
      "deuteronomio": "Deuteronômio",
      "mateus": "Mateus",
      "marcos": "Marcos",
      "lucas": "Lucas",
      "joao": "João",
      "1samuel": "1 Samuel",
      "2samuel": "2 Samuel",
      // Adicione mais conforme necessário
    };
    return bookNames[book] || book.charAt(0).toUpperCase() + book.slice(1);
  };

  const handlePrevious = () => {
    const currentChapter = parseInt(capitulo);
    const currentBookIndex = livrosBiblia.indexOf(livro);
    
    if (currentChapter > 1) {
      // Voltar para o capítulo anterior
      navigate(`/leitura/${livro}/${currentChapter - 1}?versao=${versaoBiblia}`);
    } else if (currentBookIndex > 0) {
      // Voltar para o último capítulo do livro anterior
      const previousBook = livrosBiblia[currentBookIndex - 1];
      const lastChapter = capitulosPorLivro[previousBook];
      navigate(`/leitura/${previousBook}/${lastChapter}?versao=${versaoBiblia}`);
      toast.info(`Navegando para ${formatBookTitle(previousBook)}`);
    } else {
      toast.info("Você está no primeiro capítulo da Bíblia");
    }
  };

  const handleNext = () => {
    const currentChapter = parseInt(capitulo);
    const currentBookIndex = livrosBiblia.indexOf(livro);
    const maxChapters = capitulosPorLivro[livro] || 1;
    
    if (currentChapter < maxChapters) {
      // Avançar para o próximo capítulo
      navigate(`/leitura/${livro}/${currentChapter + 1}?versao=${versaoBiblia}`);
    } else if (currentBookIndex < livrosBiblia.length - 1) {
      // Avançar para o primeiro capítulo do próximo livro
      const nextBook = livrosBiblia[currentBookIndex + 1];
      navigate(`/leitura/${nextBook}/1?versao=${versaoBiblia}`);
      toast.info(`Navegando para ${formatBookTitle(nextBook)}`);
    } else {
      toast.info("Você está no último capítulo da Bíblia");
    }
  };

  const handleClose = () => {
    navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header com controles */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {formatBookTitle(livro)} - Capítulo {capitulo}
          </h1>
          <Button 
            onClick={handleClose}
            variant="outline" 
            size="sm"
            className="bg-gray-800 border-gray-600 hover:bg-gray-700"
          >
            <X size={16} />
          </Button>
        </div>
        
        {/* Controles de navegação */}
        <div className="container mx-auto flex justify-between items-center mt-4">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          
          <span className="text-sm text-gray-400">
            Modo Leitura - {versaoBiblia.toUpperCase()}
          </span>
          
          <Button 
            onClick={handleNext}
            variant="outline"
            className="bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Conteúdo da leitura */}
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8">
          <BibleVerseDisplay 
            livro={formatBookTitle(livro)}
            capitulo={parseInt(capitulo)}
            versao={versaoBiblia}
          />
        </div>
      </div>
    </div>
  );
};

export default BibleReading;
