
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
  
  // Simulação de dados dos versículos
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
    // ... outros dados para outras versões
  };
  
  // Obter o versículo atual
  const getVersiculo = () => {
    const versoes = versiculosPorVersao[versaoBiblia] || versiculosPorVersao.nvi;
    return versoes.find((v: any) => v.numero === currentVerse) || versoes[0];
  };
  
  const versiculo = getVersiculo();
  
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
  
  // Formatar o título do livro
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-4">
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`)}
          className="text-blue-400 hover:bg-transparent hover:text-blue-300"
        >
          Sair do Modo Apresentação
        </Button>
      </div>
      
      <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl font-bold uppercase tracking-wide text-yellow-500 mb-8">
          {formatBookTitle(livro)} - CAPÍTULO {capitulo} - VERSÍCULO {currentVerse}
        </h1>
        
        {versiculo.titulo && (
          <h2 className="text-4xl font-bold text-green-500 mb-12">{versiculo.titulo}</h2>
        )}
        
        {/* Texto do versículo */}
        <p className="text-5xl text-white mb-16 leading-normal max-w-4xl">
          {versiculo.texto}
        </p>
        
        {/* Botões de navegação */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handlePreviousVerse}
            className="bg-gray-500 hover:bg-gray-400 text-black text-xl px-10 py-6 h-auto flex items-center"
          >
            <ArrowLeft className="mr-2 h-6 w-6" />
            VOLTAR
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleNextVerse}
            className="bg-gray-500 hover:bg-gray-400 text-black text-xl px-10 py-6 h-auto flex items-center"
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
