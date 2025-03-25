
import { useState } from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados simulados para exemplo
const versiculos = [
  { numero: 1, texto: "No princípio, Deus criou os céus e a terra." },
  { numero: 2, texto: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas." },
  { numero: 3, texto: "Disse Deus: 'Haja luz', e houve luz." },
  { numero: 4, texto: "Deus viu que a luz era boa, e separou a luz das trevas." },
  { numero: 5, texto: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia." },
];

const BibleVerseDisplay = ({ livro = "Gênesis", capitulo = 1, versao = "NVI" }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">{livro} {capitulo}</h2>
        <p className="text-muted-foreground">{versao}</p>
      </div>
      
      <div className="space-y-4 my-6">
        {versiculos.map((versiculo) => (
          <div key={versiculo.numero} className="flex">
            <span className="font-bold text-sm text-primary mr-2 pt-0.5 min-w-[20px]">{versiculo.numero}</span>
            <p className="text-base">{versiculo.texto}</p>
          </div>
        ))}
      </div>
      
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
    </div>
  );
};

export default BibleVerseDisplay;
