
import { useState, useEffect } from "react";

// Dados simulados para diferentes versões com títulos
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
    { numero: 11, texto: "Então disse Deus: 'Cubra-se a terra de vegetação: plantas que dêem sementes e árvores cujos frutos produzam sementes de acordo com as suas espécies.' E assim aconteceu." },
    { numero: 12, texto: "A terra fez brotar a vegetação: plantas que dêem sementes de acordo com as suas espécies, e árvores cujos frutos produzem sementes de acordo com as suas espécies. E Deus viu que ficou bom." },
    { numero: 13, texto: "Passaram-se a tarde e a manhã; esse foi o terceiro dia." },
  ],
  acf: [
    { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
    { numero: 2, texto: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
    { numero: 3, texto: "E disse Deus: Haja luz; e houve luz." },
    { numero: 4, texto: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
    { numero: 5, texto: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro." },
  ],
  arc: [
    { numero: 1, texto: "No princípio criou Deus os céus e a terra.", titulo: "A CRIAÇÃO" },
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

const getNomeVersao = (id: string): string => {
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

interface BibleVerseDisplayProps {
  livro?: string;
  capitulo?: number;
  versao?: string;
  singleVerse?: number;
  slideMode?: boolean;
  readingMode?: boolean;
}

const BibleVerseDisplay = ({ 
  livro = "Gênesis", 
  capitulo = 1, 
  versao = "nvi",
  singleVerse,
  slideMode = false,
  readingMode = false
}: BibleVerseDisplayProps) => {
  const [versiculos, setVersiculos] = useState(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  
  useEffect(() => {
    setVersiculos(versiculosPorVersao[versao] || versiculosPorVersao.nvi);
  }, [versao]);

  const versesData = singleVerse 
    ? versiculos.filter((v: any) => v.numero === singleVerse)
    : versiculos;

  if (slideMode) {
    return (
      <div className="text-center">
        {versesData.map((versiculo: any) => (
          <div key={versiculo.numero}>
            {versiculo.titulo && (
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-500 mb-4">
                {versiculo.titulo}
              </h3>
            )}
            <p className="text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed px-4">
              {versiculo.texto}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {!readingMode && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">{livro} {capitulo}</h2>
          <p className="text-gray-300">{getNomeVersao(versao)}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {versesData.map((versiculo: any, index: number) => (
          <div key={versiculo.numero}>
            {versiculo.titulo && (
              <div className="mb-3">
                <h3 className="text-lg font-bold text-green-500 text-center uppercase tracking-wide">
                  {versiculo.titulo}
                </h3>
              </div>
            )}
            <div className="flex gap-3 text-white">
              <span className="font-bold text-lg text-blue-400 min-w-[30px] flex-shrink-0">
                {versiculo.numero}
              </span>
              <p className="text-lg leading-relaxed">
                {versiculo.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleVerseDisplay;
