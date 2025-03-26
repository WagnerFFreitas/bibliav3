import React, { useEffect, useState } from "react";

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number | null;
  versao?: string;
}

// Dados de exemplo para simular o conteúdo da Bíblia em diferentes versões
const versiculosExemploPorVersao: Record<string, any> = {
  // ... keep existing code (versões da Bíblia)
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

