
import { useState, useEffect } from "react";

// Dados simulados com a nova estrutura (títulos separados)
const versiculosPorVersao: Record<string, any> = {
  nvi: {
    titulos: {
      "1": "A CRIAÇÃO"
    },
    versiculos: {
      "1": "No princípio, Deus criou os céus e a terra.",
      "2": "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.",
      "3": "Disse Deus: 'Haja luz', e houve luz.",
      "4": "Deus viu que a luz era boa, e separou a luz das trevas.",
      "5": "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.",
      "6": "Disse Deus: 'Haja um firmamento no meio das águas, e separe ele as águas das águas.'",
      "7": "Deus fez o firmamento e separou as águas que estavam embaixo do firmamento das que estavam por cima. E assim aconteceu.",
      "8": "Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia.",
      "9": "E disse Deus: 'Ajuntem-se as águas que estão debaixo do céu num só lugar, e apareça a parte seca.' E assim aconteceu.",
      "10": "À parte seca Deus chamou terra, e chamou mares ao conjunto das águas. E Deus viu que ficou bom.",
      "11": "Então disse Deus: 'Cubra-se a terra de vegetação: plantas que dêem sementes e árvores cujos frutos produzam sementes de acordo com as suas espécies.' E assim aconteceu.",
      "12": "A terra fez brotar a vegetação: plantas que dêem sementes de acordo com as suas espécies, e árvores cujos frutos produzem sementes de acordo com as suas espécies. E Deus viu que ficou bom.",
      "13": "Passaram-se a tarde e a manhã; esse foi o terceiro dia."
    }
  },
  acf: {
    titulos: {
      "1": "A CRIAÇÃO"
    },
    versiculos: {
      "1": "No princípio criou Deus os céus e a terra.",
      "2": "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
      "3": "E disse Deus: Haja luz; e houve luz.",
      "4": "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
      "5": "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro."
    }
  },
  arc: {
    titulos: {
      "1": "A criação do céu e da terra e de tudo o que neles se contém"
    },
    versiculos: {
      "1": "No princípio criou Deus os céus e a terra.",
      "2": "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
      "3": "E disse Deus: Haja luz; e houve luz.",
      "4": "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
      "5": "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro."
    }
  },
  ara: {
    titulos: {
      "1": "A CRIAÇÃO"
    },
    versiculos: {
      "1": "No princípio, criou Deus os céus e a terra.",
      "2": "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
      "3": "Disse Deus: Haja luz; e houve luz.",
      "4": "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
      "5": "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia."
    }
  },
  naa: {
    titulos: {
      "1": "A CRIAÇÃO"
    },
    versiculos: {
      "1": "No princípio, Deus criou os céus e a terra.",
      "2": "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.",
      "3": "Disse Deus: 'Haja luz!' E houve luz.",
      "4": "Deus viu que a luz era boa e separou a luz das trevas.",
      "5": "Deus chamou à luz 'dia' e às trevas, 'noite'. Houve tarde e manhã: o primeiro dia."
    }
  },
  ntlh: {
    titulos: {
      "1": "A CRIAÇÃO"
    },
    versiculos: {
      "1": "No começo Deus criou os céus e a terra.",
      "2": "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água.",
      "3": "Então Deus disse: 'Que haja luz!' e a luz começou a existir.",
      "4": "Deus viu que a luz era boa e a separou da escuridão.",
      "5": "E Deus chamou a luz de 'dia' e a escuridão de 'noite'. A noite passou, e a manhã chegou. Esse foi o primeiro dia."
    }
  },
  kjv: {
    titulos: {
      "1": "CREATION"
    },
    versiculos: {
      "1": "In the beginning God created the heaven and the earth.",
      "2": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
      "3": "And God said, Let there be light: and there was light.",
      "4": "And God saw the light, that it was good: and God divided the light from the darkness.",
      "5": "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day."
    }
  }
};

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
  const [dadosVersao, setDadosVersao] = useState(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  
  useEffect(() => {
    setDadosVersao(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  }, [versao]);

  // Função para obter o título de um versículo específico
  const obterTituloVersiculo = (numeroVersiculo: number): string | null => {
    return dadosVersao.titulos?.[numeroVersiculo.toString()] || null;
  };

  // Função para obter o texto de um versículo específico
  const obterTextoVersiculo = (numeroVersiculo: number): string => {
    return dadosVersao.versiculos?.[numeroVersiculo.toString()] || "";
  };

  // Obter todos os números de versículos disponíveis
  const numerosVersiculos = Object.keys(dadosVersao.versiculos || {}).map(num => parseInt(num)).sort((a, b) => a - b);
  
  // Filtrar versículos se um versículo específico foi solicitado
  const versiculosParaExibir = versiculoUnico 
    ? numerosVersiculos.filter(num => num === versiculoUnico)
    : numerosVersiculos;

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
