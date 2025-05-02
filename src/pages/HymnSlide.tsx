
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Hino {
  numero: number;
  titulo: string;
  versos?: string[];
  coro?: string[];
  estrofes: {
    numero: number;
    texto: string[];
  }[];
}

const HymnSlide = () => {
  const { tipo = "harpa", numero = "1" } = useParams();
  const navigate = useNavigate();
  
  const [currentVerse, setCurrentVerse] = useState<number>(0);
  const [hino, setHino] = useState<Hino | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadHymn = async () => {
      try {
        setLoading(true);
        // Na produção, isso seria substituído por uma chamada de API ou importação dinâmica
        const himnario = tipo === "harpa" ? "harpa" : "cantor";
        const data = await import(`../data/${himnario}/hinos.json`);
        const foundHymn = data.hinos.find((h: Hino) => h.numero === parseInt(numero));
        
        if (foundHymn) {
          setHino(foundHymn);
          setError(null);
        } else {
          setError(`Hino ${numero} não encontrado no ${tipo === "harpa" ? "Harpa Cristã" : "Cantor Cristão"}`);
        }
      } catch (err) {
        setError(`Erro ao carregar o hino: ${(err as Error).message}`);
        toast.error("Falha ao carregar o hino");
      } finally {
        setLoading(false);
      }
    };
    
    loadHymn();
  }, [tipo, numero]);
  
  const handlePreviousVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(prevVerse => prevVerse - 1);
    } else {
      // Voltar para o hino anterior
      const prevHymn = parseInt(numero) - 1;
      if (prevHymn >= 1) {
        navigate(`/slide-hino/${tipo}/${prevHymn}`);
      } else {
        toast.info("Você está no primeiro hino");
      }
    }
  };
  
  const handleNextVerse = () => {
    if (hino && currentVerse < hino.estrofes.length - 1) {
      setCurrentVerse(prevVerse => prevVerse + 1);
    } else if (hino && currentVerse === hino.estrofes.length - 1) {
      // Se estiver no último verso, vá para o próximo hino
      navigate(`/slide-hino/${tipo}/${parseInt(numero) + 1}`);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousVerse();
      } else if (event.key === "ArrowRight") {
        handleNextVerse();
      } else if (event.key === "Escape") {
        navigate(`/${tipo}`);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVerse, tipo, numero, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="animate-pulse">Carregando hino...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  if (!hino) {
    return null;
  }
  
  const currentEstrofe = hino.estrofes[currentVerse];
  const tipoName = tipo === "harpa" ? "Harpa Cristã" : "Cantor Cristão";
  
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/lovable-uploads/b03d623a-5c23-4daa-ad82-aaa31f8b3838.png")' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />

      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/${tipo}`)}
          className="text-blue-400 hover:bg-transparent hover:text-blue-300 text-sm"
        >
          Sair do Modo Apresentação
        </Button>
      </div>
      
      <div className="max-w-full w-[90vw] mx-auto text-center flex flex-col items-center justify-center z-10 overflow-hidden pt-16">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-yellow-500 mb-6">
          {tipoName} - HINO {hino.numero}
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-8 md:mb-10">{hino.titulo}</h2>
        
        <div className="text-5xl md:text-6xl font-bold text-white mb-10 leading-normal max-w-[95vw]">
          {currentEstrofe.texto.map((linha, idx) => (
            <div key={idx} className="mb-2">{linha}</div>
          ))}
          
          {currentVerse === 0 && hino.coro && (
            <div className="mt-8 text-4xl md:text-5xl font-bold text-blue-300">
              {hino.coro.map((linha, idx) => (
                <div key={idx} className="mb-2">{linha}</div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xl text-gray-300 mb-8">
          Estrofe {currentEstrofe.numero} de {hino.estrofes.length}
        </div>
        
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

export default HymnSlide;
