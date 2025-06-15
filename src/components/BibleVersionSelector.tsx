
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

const versoesBiblia = [
  { id: "nvi", nome: "Nova Versão Internacional" },
  { id: "acf", nome: "Almeida Corrigida Fiel" },
  { id: "ara", nome: "Almeida Revista e Atualizada" },
  { id: "aa", nome: "Almeida Atualizada" },
  { id: "arc", nome: "Almeida Revisada e Corrigida" },
  { id: "ra", nome: "Almeida Revista e Atualizada (RA)" },
  { id: "naa", nome: "Nova Almeida Atualizada" },
  { id: "ntlh", nome: "Nova Tradução na Linguagem de Hoje" },
  { id: "kjv", nome: "King James Version" },
  { id: "original", nome: "Texto Original com Tradução" }
];

interface BibleVersionSelectorProps {
  onVersionChange?: (versao: string) => void;
  initialVersion?: string;
  bookLink?: string;
}

const BibleVersionSelector = ({ 
  onVersionChange, 
  initialVersion = "nvi",
  bookLink = "/biblia/genesis/1"
}: BibleVersionSelectorProps) => {
  const [versaoSelecionada, setVersaoSelecionada] = useState(initialVersion);

  const handleVersionChange = (versao: string) => {
    setVersaoSelecionada(versao);
    if (onVersionChange) {
      onVersionChange(versao);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center w-full max-w-lg mx-auto px-2 sm:px-0">
      <div className="w-full sm:w-2/3">
        <Select value={versaoSelecionada} onValueChange={handleVersionChange}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue placeholder="Selecione uma versão" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {versoesBiblia.map((versao) => (
              <SelectItem key={versao.id} value={versao.id} className="text-sm">
                {versao.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full sm:w-auto text-sm" size="sm" asChild>
        <Link to={`${bookLink}?versao=${versaoSelecionada}`}>
          <Book className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Ler Agora</span>
          <span className="sm:hidden">Ler</span>
        </Link>
      </Button>
    </div>
  );
};

export default BibleVersionSelector;
