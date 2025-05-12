
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

  return (
    <div className={`${slideMode ? "" : "bg-white rounded-lg shadow-md p-4 w-full"}`}>
      {!slideMode && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">{livro} {capitulo}</h2>
          <p className="text-muted-foreground">{getNomeVersao(versao)}</p>
        </div>
      )}
      
      <div className={`${slideMode ? "" : "space-y-4 my-6"}`}>
        {versesData.map((versiculo: any) => (
          <div key={versiculo.numero} className={slideMode ? "" : "flex flex-col"}>
            {versiculo.titulo && !slideMode && (
              <h3 className="font-semibold text-green-600 mb-1 mt-3 border-b border-green-200 pb-1">
                {versiculo.titulo}
              </h3>
            )}
            <div className={slideMode ? "" : "flex"}>
              {!slideMode && (
                <span className="font-bold text-sm text-primary mr-2 pt-0.5 min-w-[20px]">{versiculo.numero}</span>
              )}
              <p className={slideMode ? "text-5xl text-white" : "text-base"}>
                {versiculo.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {!slideMode && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BibleVerseDisplay;
