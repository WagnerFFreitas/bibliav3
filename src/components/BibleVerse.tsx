
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
      },
    },
  },
  ara: {
    genesis: {
      1: {
        1: "No princípio, criou Deus os céus e a terra.",
        2: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
        3: "Disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.",
      },
    },
  },
  naa: {
    genesis: {
      1: {
        1: "No princípio, Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.",
        3: "Disse Deus: "Haja luz!" E houve luz.",
        4: "Deus viu que a luz era boa e separou a luz das trevas.",
        5: "Deus chamou à luz "dia" e às trevas, "noite". Houve tarde e manhã: o primeiro dia.",
      },
    },
  },
  ntlh: {
    genesis: {
      1: {
        1: "No começo Deus criou os céus e a terra.",
        2: "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água.",
        3: "Então Deus disse: "Que haja luz!" e a luz começou a existir.",
        4: "Deus viu que a luz era boa e a separou da escuridão.",
        5: "E Deus chamou a luz de "dia" e a escuridão de "noite". A noite passou, e a manhã chegou. Esse foi o primeiro dia.",
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
      },
    },
  },
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
