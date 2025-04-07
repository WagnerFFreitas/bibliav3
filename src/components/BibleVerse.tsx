import React, { useEffect, useState } from "react";

interface BibleVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number | null;
  versao?: string;
}

// Dados de exemplo para simular o conteúdo da Bíblia em diferentes versões
const versiculosExemploPorVersao: Record<string, any> = {
  // ... keep existing code (versões nvi, acf, ara, naa, ntlh, kjv)

  aa: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "A terra, porém, estava vazia e em desordem, e havia trevas sobre a face do abismo; e o Espírito de Deus pairava sobre a face das águas.",
        3: "Disse Deus: Haja luz. E houve luz.",
        4: "Viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia, e às trevas Noite. E foi a tarde e a manhã, o primeiro dia."
      }
    }
  },
  arc: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "E disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro."
      }
    }
  },
  ra: {
    genesis: {
      1: {
        1: "No princípio criou Deus os céus e a terra.",
        2: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.",
        3: "Disse Deus: Haja luz; e houve luz.",
        4: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
        5: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia."
      }
    }
  },
  original: {
    genesis: {
      1: {
        1: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃ (Bereshit bara Elohim et hashamayim ve'et ha'aretz) - No princípio criou Deus os céus e a terra.",
        2: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם׃ - E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.",
        3: "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר׃ - E disse Deus: Haja luz; e houve luz.",
        4: "וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ׃ - E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.",
        5: "וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם וְלַחֹשֶׁךְ קָרָא לָיְלָה וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד׃ - E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro."
      }
    },
    exodo: {
      1: {
        1: "וְאֵלֶּה שְׁמוֹת בְּנֵי יִשְׂרָאֵל הַבָּאִים מִצְרָיְמָה אֵת יַעֲקֹב אִישׁ וּבֵיתוֹ בָּאוּ׃ - E estes são os nomes dos filhos de Israel, que entraram no Egito com Jacó; cada um entrou com sua família:",
        2: "רְאוּבֵן שִׁמְעוֹן לֵוִי וִיהוּדָה׃ - Rúben, Simeão, Levi e Judá;",
        3: "יִשָּׂשכָר זְבוּלֻן וּבִנְיָמִן׃ - Issacar, Zebulom e Benjamim;",
        4: "דָּן וְנַפְתָּלִי גָּד וְאָשֵׁר׃ - Dã e Naftali, Gade e Aser.",
        5: "וַיְהִי כָּל־נֶפֶשׁ יֹצְאֵי יֶרֶךְ־יַעֲקֹב שִׁבְעִים נָפֶשׁ וְיוֹסֵף הָיָה בְמִצְרָיִם׃ - Todas as almas, pois, que descenderam de Jacó, foram setenta almas; José, porém, já estava no Egito."
      }
    }
  }
};

// Definir o número de versículos por capítulo para cada livro
const versiculosPorCapitulo: Record<string, Record<number, number>> = {
  genesis: {
    1: 31,
    2: 25,
    3: 24,
    4: 22,
    5: 25,
    6: 17,
    7: 16,
    8: 17,
    9: 54,
    10: 46,
    11: 34,
    12: 53,
    13: 22,
    14: 25,
    15: 27,
    16: 24,
    17: 18,
    18: 21,
    19: 22,
    20: 4,
    21: 22,
    22: 42,
    23: 22,
    24: 25,
    25: 38,
    26: 26
  },
  exodo: {
    1: 22,
    2: 25,
    3: 17,
    4: 16,
    5: 17,
    6: 16,
    7: 17,
    8: 16,
    9: 17,
    10: 16,
    11: 16,
    12: 16,
    13: 16,
    14: 16,
    15: 16,
    16: 16,
    17: 16,
    18: 16,
    19: 16,
    20: 16,
    21: 16,
    22: 16,
    23: 16,
    24: 38
  },
  levitico: {
    1: 17,
    2: 16,
    3: 17,
    4: 16,
    5: 17,
    6: 16,
    7: 17,
    8: 16,
    9: 17,
    10: 17,
    11: 17,
    12: 17,
    13: 17,
    14: 17,
    15: 17,
    16: 17,
    17: 17,
    18: 17,
    19: 17,
    20: 17,
    21: 17,
    22: 17,
    23: 17,
    24: 34
  },
  numeros: { 1: 54, 36: 13 },
  deuteronomio: { 1: 46, 34: 12 },
  josue: { 1: 18, 24: 33 },
  juizes: { 
    1: 36,
    2: 23,  // Correct number of verses in Judges 2
    3: 31,
    4: 24,
    5: 31,
    6: 40,
    7: 25,
    8: 35,
    9: 57,
    10: 18,
    11: 40,
    12: 15,
    13: 25,
    14: 20,
    15: 20,
    16: 31,
    17: 13,
    18: 31,
    19: 30,
    20: 48,
    21: 25
  },
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
  
  const capitulosFinal = versiculosPorCapitulo[livro] || {};
  const ultimoCapitulo = Object.keys(capitulosFinal).map(Number).sort((a, b) => b - a)[0] || 0;
  
  if (capitulo <= ultimoCapitulo) {
    return 30;
  }
  
  return 0;
};

// Verifica se um versículo existe para um determinado livro e capítulo
const versiculoExiste = (livro: string, capitulo: number, versiculo: number): boolean => {
  const totalVersiculos = getNumeroVersiculos(livro, capitulo);
  return versiculo > 0 && versiculo <= totalVersiculos;
};

// Formata o nome do livro para exibição
const formatBookName = (bookId: string): string => {
  const bookMap: Record<string, string> = {
    "genesis": "Gênesis",
    "exodo": "Êxodo",
    "levitico": "Levítico",
    "numeros": "Números",
    "deuteronomio": "Deuteronômio",
    "josue": "Josué",
    "juizes": "Juízes",
    "rute": "Rute",
    "1samuel": "1 Samuel",
    "2samuel": "2 Samuel",
    "1reis": "1 Reis",
    "2reis": "2 Reis",
    "1cronicas": "1 Crônicas",
    "2cronicas": "2 Crônicas",
    "esdras": "Esdras",
    "neemias": "Neemias",
    "ester": "Ester",
    "jo": "Jó",
    "salmos": "Salmos",
    "proverbios": "Provérbios",
    "eclesiastes": "Eclesiastes",
    "cantares": "Cantares",
    "isaias": "Isaías",
    "jeremias": "Jeremias",
    "lamentacoes": "Lamentações",
    "ezequiel": "Ezequiel",
    "daniel": "Daniel",
    "oseias": "Oséias",
    "joel": "Joel",
    "amos": "Amós",
    "obadias": "Obadias",
    "jonas": "Jonas",
    "miqueias": "Miquéias",
    "naum": "Naum",
    "habacuque": "Habacuque",
    "sofonias": "Sofonias",
    "ageu": "Ageu",
    "zacarias": "Zacarias",
    "malaquias": "Malaquias",
    "mateus": "Mateus",
    "marcos": "Marcos",
    "lucas": "Lucas",
    "joao": "João",
    "atos": "Atos",
    "romanos": "Romanos",
    "1corintios": "1 Coríntios",
    "2corintios": "2 Coríntios",
    "galatas": "Gálatas",
    "efesios": "Efésios",
    "filipenses": "Filipenses",
    "colossenses": "Colossenses",
    "1tessalonicenses": "1 Tessalonicenses",
    "2tessalonicenses": "2 Tessalonicenses",
    "1timoteo": "1 Timóteo",
    "2timoteo": "2 Timóteo",
    "tito": "Tito",
    "filemom": "Filemom",
    "hebreus": "Hebreus",
    "tiago": "Tiago",
    "1pedro": "1 Pedro",
    "2pedro": "2 Pedro",
    "1joao": "1 João",
    "2joao": "2 João",
    "3joao": "3 João",
    "judas": "Judas",
    "apocalipse": "Apocalipse"
  };
  
  return bookMap[bookId] || bookId.charAt(0).toUpperCase() + bookId.slice(1);
};

// Retorna o nome completo da versão baseado no ID
const getNomeVersao = (id: string): string => {
  const versoes: Record<string, string> = {
    "nvi": "Nova Versão Internacional",
    "acf": "Almeida Corrigida Fiel",
    "ara": "Almeida Revista e Atualizada",
    "naa": "Nova Almeida Atualizada",
    "ntlh": "Nova Tradução na Linguagem de Hoje",
    "kjv": "King James Version",
    "aa": "Almeida Atualizada",
    "arc": "Almeida Revisada e Corrigida",
    "ra": "Almeida Revista e Atualizada",
    "original": "Texto Original com Tradução"
  };
  return versoes[id] || id.toUpperCase();
};

/**
 * Gera um versículo simulado com base no livro, capítulo e versículo
 * Esta função produz conteúdo consistente baseado nos parâmetros, garantindo
 * que o mesmo versículo sempre produza o mesmo texto
 */
const generateSimulatedVerse = (
  bookId: string, 
  chapter: number, 
  verse: number, 
  version: string
): string => {
  // Mapear versões para estilos de linguagem diferentes
  const versionStyles: Record<string, string> = {
    "nvi": "um estilo contemporâneo e de fácil compreensão",
    "acf": "um estilo clássico e formal, seguindo a tradição textual",
    "ara": "um estilo equilibrado entre formal e contemporâneo",
    "naa": "um estilo acessível com terminologia atualizada",
    "ntlh": "um estilo simples e direto, voltado para fácil compreensão",
    "kjv": "o estilo literário formal do inglês clássico",
    "aa": "um estilo direto e fiel aos originais",
    "arc": "um estilo tradicional com linguagem portuguesa clássica",
    "ra": "um português formal seguindo as tradições da Almeida",
    "original": "o texto original com tradução para o português"
  };
  
  const versionStyle = versionStyles[version] || "estilo próprio";
  const bookName = formatBookName(bookId);
  
  // Criar um identificador único para este versículo específico
  const verseId = `${bookId}-${chapter}-${verse}`;
  
  // Usar esse identificador para criar uma "aleatoriedade" determinística
  const charSum = verseId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Lista de frases introdutórias que podem começar um versículo
  const intros = [
    "Então disse Deus,",
    "E aconteceu que",
    "Naquele tempo,",
    "Assim diz o Senhor,",
    "Por isso,",
    "Bem-aventurado é aquele que",
    "O Senhor declarou,",
    "Portanto,",
    "Eis que",
    "E Jesus disse,"
  ];
  
  // Selecionar uma introdução baseada no ID do versículo (determinístico)
  const selectedIntro = intros[charSum % intros.length];
  
  // Criar o texto do versículo com comprimento baseado no número do versículo
  // Versículos com números maiores tendem a ser mais longos
  const length = 20 + (verse % 5) * 15;
  
  // Texto simulado para o versículo baseado no ID e versão
  if (version === "original") {
    // Texto hebraico ou grego simulado para o Antigo ou Novo Testamento
    const isOldTestament = ["genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "juizes", "rute", "1samuel", "2samuel", "1reis", "2reis", "1cronicas", "2cronicas", "esdras", "neemias", "ester", "jo", "salmos", "proverbios", "eclesiastes", "cantares", "isaias", "jeremias", "lamentacoes", "ezequiel", "daniel", "oseias", "joel", "amos", "obadias", "jonas", "miqueias", "naum", "habacuque", "sofonias", "ageu", "zacarias", "malaquias"].includes(bookId);
    
    const hebrewChars = "אבגדהוזחטיכלמנסעפצקרשת";
    const greekChars = "αβγδεζηθικλμνξοπρστυφχψω";
    
    const chars = isOldTestament ? hebrewChars : greekChars;
    const originalLength = 20 + (verse % 8) * 10;
    let originalText = "";
    
    for (let i = 0; i < originalLength; i++) {
      originalText += chars[Math.floor((charSum + i) % chars.length)];
      if (i % 5 === 4) originalText += " ";
    }
    
    // Adicionamos a transliteração para o hebraico ou grego (simulado)
    let transliteration = "";
    if (isOldTestament) {
      transliteration = ` (${selectedIntro.split(' ')[0]} ${selectedIntro.split(' ')[1]} ${bookName} ${chapter}:${verse})`;
    } else {
      const greekWords = ["Kai", "Theos", "Logos", "Christos", "Pneuma", "Agape", "Elpis", "Pistis", "Doxa"];
      transliteration = ` (${greekWords[charSum % greekWords.length]} ${greekWords[(charSum + 1) % greekWords.length]})`;
    }
    
    return `[${getNomeVersao(version)}]\n${originalText} ${transliteration}\n\n${selectedIntro} este é o texto traduzido do versículo ${bookName} ${chapter}:${verse}. Este versículo foi gerado automaticamente com texto original simulado e sua tradução para o português.`;
  }
  
  return `[${getNomeVersao(version)}] ${selectedIntro} este é o texto simulado para ${bookName} ${chapter}:${verse} em ${versionStyle}. Este versículo foi gerado automaticamente para representar o conteúdo que estaria presente na versão original.`;
};

const BibleVerse: React.FC<BibleVerseProps> = ({ livro, capitulo, versiculo, versao = "nvi" }) => {
  const [textoVersiculo, setTextoVersiculo] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);
  const [avisoSimulado, setAvisoSimulado] = useState<boolean>(false);
  
  useEffect(() => {
    if (versiculo) {
      getVerseText();
    } else {
      setTextoVersiculo("");
      setErro(null);
      setAvisoSimulado(false);
    }
  }, [livro, capitulo, versiculo, versao]);

  const getVerseText = () => {
    try {
      setErro(null);
      setAvisoSimulado(false);
      
      // Verificar se o versículo existe no livro e capítulo
      if (versiculo && !versiculoExiste(livro, capitulo, versiculo)) {
        const totalVersiculos = getNumeroVersiculos(livro, capitulo);
        setTextoVersiculo("");
        setErro(`O versículo ${versiculo} não existe em ${formatBookName(livro)} ${capitulo}. Este capítulo tem apenas ${totalVersiculos} versículos.`);
        return;
      }
      
      // Verificar se a versão existe em nossos dados
      if (!versiculosExemploPorVersao[versao]) {
        // Versão não encontrada, vamos gerar um versículo simulado
        const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
        setTextoVersiculo(simulatedVerse);
        setAvisoSimulado(true);
        return;
      }
      
      // Tentamos obter o versículo da versão solicitada
      const verse = getVerseFromVersion(versao);
      
      if (verse) {
        // Versículo encontrado na versão solicitada
        setTextoVersiculo(verse);
      } else {
        // Versículo não encontrado na versão solicitada, tentamos na NVI
        const nviVerse = getVerseFromVersion("nvi");
        
        if (nviVerse) {
          // Versículo encontrado na NVI, usamos como fallback
          setTextoVersiculo(nviVerse);
          setErro(`Versículo não disponível na versão "${getNomeVersao(versao)}". Exibindo texto da NVI.`);
        } else {
          // Versículo não encontrado em nenhuma versão, geramos conteúdo simulado
          const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
          setTextoVersiculo(simulatedVerse);
          setAvisoSimulado(true);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      
      // Em caso de erro, sempre geramos um versículo simulado
      const simulatedVerse = generateSimulatedVerse(livro, capitulo, versiculo!, versao);
      setTextoVersiculo(simulatedVerse);
      setAvisoSimulado(true);
    }
  };
  
  const getVerseFromVersion = (versionId: string): string | null => {
    if (!versiculosExemploPorVersao[versionId]) {
      return null;
    }
    
    if (!versiculosExemploPorVersao[versionId][livro]) {
      return null;
    }
    
    if (!versiculosExemploPorVersao[versionId][livro][capitulo]) {
      return null;
    }
    
    if (!versiculo || !versiculosExemploPorVersao[versionId][livro][capitulo][versiculo]) {
      return null;
    }
    
    return versiculosExemploPorVersao[versionId][livro][capitulo][versiculo];
  };

  return (
    <div className="mt-8 text-center">
      {versiculo ? (
        <div className="p-6 bg-black/60 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-indigo-300">
            {formatBookName(livro)} {capitulo}:{versiculo} <span className="text-sm">({getNomeVersao(versao)})</span>
          </h3>
          
          {erro && (
            <div className="mb-4 py-2 px-4 bg-red-900/50 border border-red-700 rounded text-red-300 text-sm">
              {erro}
            </div>
          )}
          
          {avisoSimulado && !erro && (
            <div className="mb-4 py-2 px-4 bg-blue-900/50 border border-blue-700 rounded text-blue-300 text-sm">
              Este é um texto simulado. A versão completa deste versículo não está disponível no momento.
            </div>
          )}
          
          {textoVersiculo ? (
            <p className="text-xl text-gray-300 mb-4">
              {textoVersiculo}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              {erro ? "Versículo inválido." : "Versículo não encontrado. Por favor, tente outro versículo ou versão."}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-400 italic">Selecione um versículo para visualizar o texto.</p>
      )}
    </div>
  );
};

export default BibleVerse;
