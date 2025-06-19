
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
  
  // Dados dos versículos com títulos
  const versiculosPorVersao: Record<string, any> = {
    nvi: [
      { numero: 1, texto: "No princípio, Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas." },
      { numero: 3, texto: "Disse Deus: 'Haja luz', e houve luz." },
      { numero: 4, texto: "Deus viu que a luz era boa, e separou a luz das trevas." },
      { numero: 5, texto: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia." },
      { numero: 6, texto: "Disse Deus: 'Haja um firmamento no meio das águas, e separe ele as águas das águas.'" },
      { numero: 7, texto: "Deus fez o firmamento e separou as águas que estavam embaixo do firmamento das que estavam por cima. E assim aconteceu." },
      { numero: 8, texto: "Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia." },
      { numero: 9, texto: "E disse Deus: 'Ajuntem-se as águas que estão debaixo do céu num só lugar, e apareça a parte seca.' E assim aconteceu." },
      { numero: 10, texto: "À parte seca Deus chamou terra, e chamou mares ao conjunto das águas. E Deus viu que ficou bom." },
    ],
    acf: [
      { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
      { numero: 3, texto: "E disse Deus: Haja luz; e houve luz." },
      { numero: 4, texto: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
      { numero: 5, texto: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro." },
    ],
    arc: [
      { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A criação do céu e da terra e de tudo o que neles se contém" },
      { numero: 2, texto: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
      { numero: 3, texto: "E disse Deus: Haja luz; e houve luz." },
      { numero: 4, texto: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
      { numero: 5, texto: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro." },
    ],
    ara: [
      { numero: 1, texto: "No princípio, criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas." },
      { numero: 3, texto: "Disse Deus: Haja luz; e houve luz." },
      { numero: 4, texto: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas." },
      { numero: 5, texto: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia." },
    ],
    naa: [
      { numero: 1, texto: "No princípio, Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas." },
      { numero: 3, texto: "Disse Deus: 'Haja luz!' E houve luz." },
      { numero: 4, texto: "Deus viu que a luz era boa e separou a luz das trevas." },
      { numero: 5, texto: "Deus chamou à luz 'dia' e às trevas, 'noite'. Houve tarde e manhã: o primeiro dia." },
    ],
    ntlh: [
      { numero: 1, texto: "No começo Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
      { numero: 2, texto: "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água." },
      { numero: 3, texto: "Então Deus disse: 'Que haja luz!' e a luz começou a existir." },
      { numero: 4, texto: "Deus viu que a luz era boa e a separou da escuridão." },
      { numero: 5, texto: "E Deus chamou a luz de 'dia' e a escuridão de 'noite'. A noite passou, e a manhã chegou. Esse foi o primeiro dia." },
    ],
    kjv: [
      { numero: 1, texto: "In the beginning God created the heaven and the earth.", titulo: "CREATION" },
      { numero: 2, texto: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { numero: 3, texto: "And God said, Let there be light: and there was light." },
      { numero: 4, texto: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { numero: 5, texto: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
    ]
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/biblia/${livro}/${capitulo}?versao=${versaoBiblia}`)}
          className="text-blue-400 hover:bg-transparent hover:text-blue-300 text-sm"
        >
          Sair do Modo Apresentação
        </Button>
      </div>
      
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
        
        {/* Botões de navegação - Responsivos */}
        <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-6">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handlePreviousVerse}
            className="bg-gray-500 hover:bg-gray-400 text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 h-auto flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
          >
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            VOLTAR
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleNextVerse}
            className="bg-gray-500 hover:bg-gray-400 text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 h-auto flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
          >
            PRÓXIMO
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BibleSlide;
