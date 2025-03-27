
import React, { useEffect, useState } from "react";

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number | null;
  versao?: string;
}

// Dados de exemplo para simular o conteúdo da Bíblia em diferentes versões
const versiculosExemploPorVersao: Record<string, any> = {
  nvi: {
    genesis: {
      1: {
        1: "No princípio, Deus criou os céus e a terra.",
        2: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.",
        3: "Disse Deus: 'Haja luz', e houve luz.",
        4: "Deus viu que a luz era boa, e separou a luz das trevas.",
        5: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.",
        // Adicionando mais versículos para completar o capítulo
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e separação entre águas e águas'.",
        7: "Fez, pois, Deus o firmamento, e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.",
        8: "E chamou Deus ao firmamento Céus. Passaram-se a tarde e a manhã, o segundo dia.",
        9: "Disse também Deus: 'Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca'. E assim se fez.",
        10: "À porção seca chamou Deus Terra e ao ajuntamento das águas, Mares. E viu Deus que isso era bom."
      },
    },
  },
  acf: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "E disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.",
        // Adicionando mais versículos para completar o capítulo
        6: "E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.",
        7: "E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.",
        8: "E chamou Deus à expansão Céus, e foi a tarde e a manhã, o dia segundo.",
        9: "E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar, e apareça a porção seca; e assim foi.",
        10: "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que era bom."
      },
    },
  },
  ara: {
    genesis: {
      1: {
        1: "No princípio, criou Deus os céus e a terra.",
        2: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
        3: "Disse Deus: 'Haja luz'; e houve luz.",
        4: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.",
        // Adicionando mais versículos para completar o capítulo
        6: "E disse Deus: 'Haja firmamento no meio das águas, e separação entre águas e águas'.",
        7: "Fez, pois, Deus o firmamento e separação entre as águas debaixo do firmamento e as águas sobre o firmamento. E assim se fez.",
        8: "E chamou Deus ao firmamento Céus. Houve tarde e manhã, o segundo dia.",
        9: "Disse também Deus: 'Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca'. E assim se fez.",
        10: "À porção seca chamou Deus Terra e ao ajuntamento das águas, Mares. E viu Deus que isso era bom."
      },
    },
  },
  naa: {
    genesis: {
      1: {
        1: "No princípio, Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.",
        3: "Disse Deus: 'Haja luz!' E houve luz.",
        4: "Deus viu que a luz era boa e separou a luz das trevas.",
        5: "Deus chamou à luz 'dia' e às trevas, 'noite'. Houve tarde e manhã: o primeiro dia.",
        // Adicionando mais versículos para completar o capítulo
        6: "Disse Deus: 'Haja um firmamento no meio das águas, e haja separação entre águas e águas'.",
        7: "Deus fez o firmamento e separou as águas que ficavam abaixo do firmamento das que ficavam acima. E assim se fez.",
        8: "Ao firmamento Deus chamou 'céu'. Houve tarde e manhã: o segundo dia.",
        9: "Disse Deus: 'Ajuntem-se num só lugar as águas que estão debaixo do céu, e apareça a parte seca'. E assim se fez.",
        10: "À parte seca Deus chamou 'terra', e ao ajuntamento das águas, 'mares'. E Deus viu que isso era bom."
      },
    },
  },
  ntlh: {
    genesis: {
      1: {
        1: "No começo Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água.",
        3: "Então Deus disse: 'Que haja luz!' e a luz começou a existir.",
        4: "Deus viu que a luz era boa e a separou da escuridão.",
        5: "E Deus chamou a luz de 'dia' e a escuridão de 'noite'. A noite passou, e a manhã chegou. Esse foi o primeiro dia.",
        // Adicionando mais versículos para completar o capítulo
        6: "Então Deus disse: 'Que haja uma divisão entre as águas, para separá-las em duas partes!'",
        7: "E assim aconteceu. Deus fez uma divisão e separou as águas que estavam embaixo da divisão das que estavam em cima.",
        8: "Deus chamou a divisão de 'céu'. A noite passou, e a manhã chegou. Esse foi o segundo dia.",
        9: "Então Deus disse: 'Que as águas que estão debaixo do céu se ajuntem num só lugar, para que apareça a terra seca!' E assim aconteceu.",
        10: "Deus chamou a terra seca de 'terra' e as águas que se ajuntaram de 'mar'. E Deus viu que o que havia feito era bom."
      },
    },
  },
  kjv: {
    genesis: {
      1: {
        1: "In the beginning God created the heaven and the earth.",
        2: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
        3: "And God said, Let there be light: and there was light.",
        4: "And God saw the light, that it was good: and God divided the light from the darkness.",
        5: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
        // Adding more verses to complete the chapter
        6: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
        7: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
        8: "And God called the firmament Heaven. And the evening and the morning were the second day.",
        9: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
        10: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good."
      },
    },
  },
};

// Definir o número de versículos por capítulo para cada livro
const versiculosPorCapitulo: Record<string, Record<number, number>> = {
  genesis: {
    1: 31,
    2: 25,
    3: 24,
    // Outros capítulos...
    50: 26
  },
  exodo: {
    1: 22,
    2: 25,
    // Outros capítulos...
    40: 38
  },
  levitico: {
    1: 17,
    2: 16,
    3: 17,
    // Outros capítulos...
    27: 34
  },
  numeros: { 1: 54, 36: 13 },
  deuteronomio: { 1: 46, 34: 12 },
  josue: { 1: 18, 24: 33 },
  juizes: { 1: 36, 21: 25 },
  rute: { 1: 22, 4: 22 },
  "1samuel": { 1: 28, 31: 13 },
  "2samuel": { 1: 27, 24: 25 },
  "1reis": { 1: 53, 22: 53 },
  "2reis": { 1: 18, 25: 30 },
  "1cronicas": { 1: 54, 29: 30 },
  "2cronicas": { 1: 17, 36: 23 },
  esdras: { 1: 11, 10: 44 },
  neemias: { 1: 11, 13: 31 },
  ester: { 1: 22, 10: 3 },
  jo: { 1: 22, 42: 17 },
  salmos: { 1: 6, 150: 6 },
  proverbios: { 1: 33, 31: 31 },
  eclesiastes: { 1: 18, 12: 14 },
  cantares: { 1: 17, 8: 14 },
  isaias: { 1: 31, 66: 24 },
  jeremias: { 1: 19, 52: 34 },
  lamentacoes: { 1: 22, 5: 22 },
  ezequiel: { 1: 28, 48: 35 },
  daniel: { 1: 21, 12: 13 },
  oseias: { 1: 11, 14: 9 },
  joel: { 1: 20, 3: 21 },
  amos: { 1: 15, 9: 15 },
  obadias: { 1: 21 },
  jonas: { 1: 17, 4: 11 },
  miqueias: { 1: 16, 7: 20 },
  naum: { 1: 15, 3: 19 },
  habacuque: { 1: 17, 3: 19 },
  sofonias: { 1: 18, 3: 20 },
  ageu: { 1: 15, 2: 23 },
  zacarias: { 1: 21, 14: 21 },
  malaquias: { 1: 14, 4: 6 },
  mateus: { 1: 25, 28: 20 },
  marcos: { 1: 45, 16: 20 },
  lucas: { 1: 80, 24: 53 },
  joao: { 1: 51, 21: 25 },
  atos: { 1: 26, 28: 31 },
  romanos: { 1: 32, 16: 27 },
  "1corintios": { 1: 31, 16: 24 },
  "2corintios": { 1: 24, 13: 14 },
  galatas: { 1: 24, 6: 18 },
  efesios: { 1: 23, 6: 24 },
  filipenses: { 1: 30, 4: 23 },
  colossenses: { 1: 29, 4: 18 },
  "1tessalonicenses": { 1: 10, 5: 28 },
  "2tessalonicenses": { 1: 12, 3: 18 },
  "1timoteo": { 1: 20, 6: 21 },
  "2timoteo": { 1: 18, 4: 22 },
  tito: { 1: 16, 3: 15 },
  filemom: { 1: 25 },
  hebreus: { 1: 14, 13: 25 },
  tiago: { 1: 27, 5: 20 },
  "1pedro": { 1: 25, 5: 14 },
  "2pedro": { 1: 21, 3: 18 },
  "1joao": { 1: 10, 5: 21 },
  "2joao": { 1: 13 },
  "3joao": { 1: 14 },
  judas: { 1: 25 },
  apocalipse: { 1: 20, 22: 21 }
};

// Função para obter o número de versículos para um livro e capítulo específicos
export const getNumeroVersiculos = (livro: string, capitulo: number): number => {
  if (versiculosPorCapitulo[livro] && versiculosPorCapitulo[livro][capitulo]) {
    return versiculosPorCapitulo[livro][capitulo];
  }
  
  // Valores padrão para capítulos que não estão definidos
  const capitulosFinal = versiculosPorCapitulo[livro] || {};
  const ultimoCapitulo = Object.keys(capitulosFinal).map(Number).sort((a, b) => b - a)[0] || 0;
  
  if (capitulo <= ultimoCapitulo) {
    // Se estiver dentro do intervalo conhecido, retorna um valor padrão razoável
    return 30;
  }
  
  return 0; // Capítulo não existe
};

const formatBookName = (bookId: string): string => {
  const bookMap: Record<string, string> = {
    "genesis": "Gênesis",
    "exodo": "Êxodo",
    "levitico": "Levítico",
    // ... outros livros
  };
  
  return bookMap[bookId] || bookId.charAt(0).toUpperCase() + bookId.slice(1);
};

const getNomeVersao = (id: string): string => {
  const versoes: Record<string, string> = {
    "nvi": "Nova Versão Internacional",
    "acf": "Almeida Corrigida Fiel",
    "ara": "Almeida Revista e Atualizada",
    "naa": "Nova Almeida Atualizada",
    "ntlh": "Nova Tradução na Linguagem de Hoje",
    "kjv": "King James Version"
  };
  return versoes[id] || id.toUpperCase();
};

const BibleVerse: React.FC<BibleVerseProps> = ({ livro, capitulo, versiculo, versao = "nvi" }) => {
  const [textoVersiculo, setTextoVersiculo] = useState<string>("");
  
  useEffect(() => {
    if (versiculo) {
      getVerseText();
    }
  }, [livro, capitulo, versiculo, versao]);

  // Simulando a obtenção do texto do versículo
  const getVerseText = () => {
    try {
      const versaoData = versiculosExemploPorVersao[versao] || versiculosExemploPorVersao.nvi;
      const bookContent = versaoData[livro];
      
      if (!bookContent) {
        setTextoVersiculo("Livro não encontrado.");
        return;
      }
      
      const chapterContent = bookContent[capitulo];
      if (!chapterContent) {
        setTextoVersiculo("Capítulo não encontrado.");
        return;
      }
      
      if (!versiculo) {
        setTextoVersiculo("Selecione um versículo.");
        return;
      }
      
      const verseContent = chapterContent[versiculo];
      setTextoVersiculo(verseContent || "Versículo não encontrado.");
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      setTextoVersiculo("Erro ao buscar o versículo.");
    }
  };

  return (
    <div className="mt-8 text-center">
      {versiculo ? (
        <div className="p-6 bg-black/60 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-indigo-300">
            {formatBookName(livro)} {capitulo}:{versiculo} <span className="text-sm">({getNomeVersao(versao)})</span>
          </h3>
          <p className="text-xl text-gray-300 mb-4">
            {textoVersiculo}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 italic">Selecione um versículo para visualizar o texto.</p>
      )}
    </div>
  );
};

export default BibleVerse;
