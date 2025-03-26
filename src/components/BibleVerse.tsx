
import React from "react";

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number | null;
}

// Dados de exemplo para simular o conteúdo da Bíblia
const versiculosExemplo = {
  genesis: {
    1: {
      1: "No princípio, Deus criou os céus e a terra.",
      2: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.",
      3: "Disse Deus: 'Haja luz', e houve luz.",
      4: "Deus viu que a luz era boa, e separou a luz das trevas.",
      5: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.",
      // ... outros versículos
    },
    2: {
      1: "Assim foram concluídos os céus e a terra, e tudo o que neles há.",
      2: "No sétimo dia Deus já havia concluído a obra que realizara, e nesse dia descansou.",
      3: "Abençoou Deus o sétimo dia e o santificou, porque nele descansou de toda a obra que realizara na criação.",
      // ... outros versículos
    },
    // ... outros capítulos
  },
  exodo: {
    1: {
      1: "São estes os nomes dos filhos de Israel que entraram no Egito com Jacó, cada um com sua família:",
      2: "Rúben, Simeão, Levi e Judá;",
      3: "Issacar, Zebulom e Benjamim;",
      // ... outros versículos
    },
    // ... outros capítulos
  },
  // ... outros livros
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

const BibleVerse: React.FC<BibleVerseProps> = ({ livro, capitulo, versiculo }) => {
  // Simulando a obtenção do texto do versículo
  const getVerseText = () => {
    try {
      const bookContent = (versiculosExemplo as any)[livro];
      if (!bookContent) return "Livro não encontrado.";
      
      const chapterContent = bookContent[capitulo];
      if (!chapterContent) return "Capítulo não encontrado.";
      
      if (!versiculo) return "Selecione um versículo.";
      
      const verseContent = chapterContent[versiculo];
      return verseContent || "Versículo não encontrado.";
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      return "Erro ao buscar o versículo.";
    }
  };

  return (
    <div className="mt-8 text-center">
      {versiculo ? (
        <div className="p-6 bg-black/60 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-indigo-300">
            {formatBookName(livro)} {capitulo}:{versiculo}
          </h3>
          <p className="text-xl text-gray-300 mb-4">
            {getVerseText()}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 italic">Selecione um versículo para visualizar o texto.</p>
      )}
    </div>
  );
};

export default BibleVerse;
