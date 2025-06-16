
import { useState, useEffect } from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Dados simulados para diferentes versões
const versiculosPorVersao: Record<string, any> = {
  nvi: [
    { numero: 1, texto: "No princípio, Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "Disse Deus: 'Haja luz', e houve luz.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "Deus viu que a luz era boa, e separou a luz das trevas.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.", titulo: "A CRIAÇÃO" },
    { numero: 6, texto: "Disse Deus: 'Haja um firmamento no meio das águas, e separe ele as águas das águas.'", titulo: "A CRIAÇÃO" },
    { numero: 7, texto: "Deus fez o firmamento e separou as águas que estavam embaixo do firmamento das que estavam por cima. E assim aconteceu.", titulo: "A CRIAÇÃO" },
    { numero: 8, texto: "Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia.", titulo: "A CRIAÇÃO" },
    { numero: 9, texto: "E disse Deus: 'Ajuntem-se as águas que estão debaixo do céu num só lugar, e apareça a parte seca.' E assim aconteceu.", titulo: "A CRIAÇÃO" },
    { numero: 10, texto: "À parte seca Deus chamou terra, e chamou mares ao conjunto das águas. E Deus viu que ficou bom.", titulo: "A CRIAÇÃO" },
    { numero: 11, texto: "Então disse Deus: 'Cubra-se a terra de vegetação: plantas que dêem sementes e árvores cujos frutos produzam sementes de acordo com as suas espécies.' E assim aconteceu.", titulo: "A CRIAÇÃO" },
    { numero: 12, texto: "A terra fez brotar a vegetação: plantas que dêem sementes de acordo com as suas espécies, e árvores cujos frutos produzem sementes de acordo com as suas espécies. E Deus viu que ficou bom.", titulo: "A CRIAÇÃO" },
    { numero: 13, texto: "Passaram-se a tarde e a manhã; esse foi o terceiro dia.", titulo: "A CRIAÇÃO" },
  ],
  acf: [
    { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "E disse Deus: Haja luz; e houve luz.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.", titulo: "A CRIAÇÃO" },
  ],
  ara: [
    { numero: 1, texto: "No princípio, criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "Disse Deus: Haja luz; e houve luz.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.", titulo: "A CRIAÇÃO" },
  ],
  naa: [
    { numero: 1, texto: "No princípio, Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "A terra estava sem forma e vazia, e havia trevas sobre a face do abismo, mas o Espírito de Deus pairava sobre a face das águas.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "Disse Deus: 'Haja luz!' E houve luz.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "Deus viu que a luz era boa e separou a luz das trevas.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "Deus chamou à luz 'dia' e às trevas, 'noite'. Houve tarde e manhã: o primeiro dia.", titulo: "A CRIAÇÃO" },
  ],
  ntlh: [
    { numero: 1, texto: "No começo Deus criou os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "A terra estava sem forma e vazia; a escuridão cobria o abismo, e o Espírito de Deus se movia por cima da água.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "Então Deus disse: 'Que haja luz!' e a luz começou a existir.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "Deus viu que a luz era boa e a separou da escuridão.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "E Deus chamou a luz de 'dia' e a escuridão de 'noite'. A noite passou, e a manhã chegou. Esse foi o primeiro dia.", titulo: "A CRIAÇÃO" },
  ],
  kjv: [
    { numero: 1, texto: "In the beginning God created the heaven and the earth.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.", titulo: "A CRIAÇÃO" },
    { numero: 3, texto: "And God said, Let there be light: and there was light.", titulo: "A CRIAÇÃO" },
    { numero: 4, texto: "And God saw the light, that it was good: and God divided the light from the darkness.", titulo: "A CRIAÇÃO" },
    { numero: 5, texto: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.", titulo: "A CRIAÇÃO" },
  ]
};

const getNomeVersao = (id: string): string => {
  const versoes = {
    "nvi": "Nova Versão Internacional",
    "acf": "Almeida Corrigida Fiel",
    "ara": "Almeida Revista e Atualizada",
    "naa": "Nova Almeida Atualizada",
    "ntlh": "Nova Tradução na Linguagem de Hoje",
    "kjv": "King James Version"
  };
  return versoes[id as keyof typeof versoes] || id.toUpperCase();
};

interface BibleVerseDisplayProps {
  livro?: string;
  capitulo?: number;
  versao?: string;
  singleVerse?: number;
  slideMode?: boolean;
}

const BibleVerseDisplay = ({ 
  livro = "Gênesis", 
  capitulo = 1, 
  versao = "nvi",
  singleVerse,
  slideMode = false
}: BibleVerseDisplayProps) => {
  const [versiculos, setVersiculos] = useState(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  
  useEffect(() => {
    // Atualizar versículos quando a versão mudar
    setVersiculos(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  }, [versao]);

  // Para o modo slide, exibir apenas um versículo se especificado
  const versesData = singleVerse 
    ? versiculos.filter((v: any) => v.numero === singleVerse)
    : versiculos;

  if (slideMode) {
    // Modo slide - apenas o texto do versículo
    return (
      <div className="text-center">
        {versesData.map((versiculo: any) => (
          <p key={versiculo.numero} className="text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed px-4">
            {versiculo.texto}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">{livro} {capitulo}</h2>
        <p className="text-gray-300">{getNomeVersao(versao)}</p>
      </div>
      
      <div className="space-y-4">
        {versesData.map((versiculo: any) => (
          <div key={versiculo.numero} className="flex gap-3 text-white">
            <span className="font-bold text-lg text-blue-400 min-w-[30px] flex-shrink-0">
              {versiculo.numero}
            </span>
            <p className="text-lg leading-relaxed">
              {versiculo.texto}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleVerseDisplay;
