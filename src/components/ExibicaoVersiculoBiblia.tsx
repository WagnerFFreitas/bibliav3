
import { useState, useEffect } from "react";

interface VersiculoData {
  título?: string;
  texto: string;
}

interface CapituloData {
  livro: string;
  capítulo: number;
  versículos: Record<string, string | VersiculoData>;
}

const obterNomeVersao = (id: string): string => {
  const versoes = {
    "nvi": "Nova Versão Internacional",
    "acf": "Almeida Corrigida Fiel",
    "ara": "Almeida Revista e Atualizada", 
    "arc": "Almeida Revista e Corrigida",
    "naa": "Nova Almeida Atualizada",
    "ntlh": "Nova Tradução na Linguagem de Hoje",
    "kjv": "King James Version"
  };
  return versoes[id as keyof typeof versoes] || id.toUpperCase();
};

interface PropriedadesExibicaoVersiculoBiblia {
  livro?: string;
  capitulo?: number;
  versao?: string;
  versiculoUnico?: number;
  modoSlide?: boolean;
  modoLeitura?: boolean;
}

const ExibicaoVersiculoBiblia = ({ 
  livro = "Gênesis", 
  capitulo = 1, 
  versao = "nvi",
  versiculoUnico,
  modoSlide = false,
  modoLeitura = false
}: PropriedadesExibicaoVersiculoBiblia) => {
  const [dadosCapitulo, setDadosCapitulo] = useState<CapituloData | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDadosCapitulo = async () => {
      setCarregando(true);
      try {
        // Converter nome do livro para formato do arquivo
        const nomeArquivo = livro.toLowerCase()
          .replace(/\s+/g, '')
          .replace('ê', 'e')
          .replace('ç', 'c');
        
        const caminhoArquivo = `/src/data/${versao}/${nomeArquivo}/${capitulo}.json`;
        
        // Tentar carregar o arquivo JSON
        const response = await fetch(caminhoArquivo);
        if (response.ok) {
          const dados = await response.json();
          setDadosCapitulo(dados);
        } else {
          console.log(`Arquivo não encontrado: ${caminhoArquivo}`);
          // Usar dados padrão se o arquivo não existir
          setDadosCapitulo(null);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setDadosCapitulo(null);
      }
      setCarregando(false);
    };

    carregarDadosCapitulo();
  }, [livro, capitulo, versao]);

  // Função para obter o título de um versículo específico
  const obterTituloVersiculo = (numeroVersiculo: number): string | null => {
    if (!dadosCapitulo) return null;
    
    const versiculo = dadosCapitulo.versículos[numeroVersiculo.toString()];
    if (typeof versiculo === 'object' && versiculo.título) {
      return versiculo.título;
    }
    return null;
  };

  // Função para obter o texto de um versículo específico
  const obterTextoVersiculo = (numeroVersiculo: number): string => {
    if (!dadosCapitulo) {
      // Dados de fallback se não conseguir carregar
      const textosDefault: Record<string, string> = {
        "1": "No princípio criou Deus os céus e a terra.",
        "2": "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        "3": "E disse Deus: Haja luz; e houve luz."
      };
      return textosDefault[numeroVersiculo.toString()] || `Versículo ${numeroVersiculo} não disponível.`;
    }

    const versiculo = dadosCapitulo.versículos[numeroVersiculo.toString()];
    if (typeof versiculo === 'string') {
      return versiculo;
    } else if (typeof versiculo === 'object') {
      return versiculo.texto;
    }
    return `Versículo ${numeroVersiculo} não disponível.`;
  };

  // Obter todos os números de versículos disponíveis
  const numerosVersiculos = dadosCapitulo 
    ? Object.keys(dadosCapitulo.versículos).map(num => parseInt(num)).sort((a, b) => a - b)
    : [1, 2, 3]; // Default para teste
  
  // Filtrar versículos se um versículo específico foi solicitado
  const versiculosParaExibir = versiculoUnico 
    ? numerosVersiculos.filter(num => num === versiculoUnico)
    : numerosVersiculos;

  if (carregando) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }

  if (modoSlide) {
    return (
      <div className="text-center">
        {versiculosParaExibir.map((numeroVersiculo) => {
          const titulo = obterTituloVersiculo(numeroVersiculo);
          const texto = obterTextoVersiculo(numeroVersiculo);
          
          return (
            <div key={numeroVersiculo}>
              {titulo && (
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-500 mb-4">
                  {titulo}
                </h3>
              )}
              <p className="text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed px-4">
                {texto}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      {!modoLeitura && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">{livro} {capitulo}</h2>
          <p className="text-gray-300">{obterNomeVersao(versao)}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {versiculosParaExibir.map((numeroVersiculo) => {
          const titulo = obterTituloVersiculo(numeroVersiculo);
          const texto = obterTextoVersiculo(numeroVersiculo);
          
          return (
            <div key={numeroVersiculo}>
              {titulo && (
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-green-500 text-center uppercase tracking-wide">
                    {titulo}
                  </h3>
                </div>
              )}
              <div className="flex gap-3 text-white">
                <span className="font-bold text-lg text-blue-400 min-w-[30px] flex-shrink-0">
                  {numeroVersiculo}
                </span>
                <p className="text-lg leading-relaxed">
                  {texto}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExibicaoVersiculoBiblia;
