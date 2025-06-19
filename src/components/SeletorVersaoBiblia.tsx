
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

interface PropriedadesSeletorVersaoBiblia {
  aoMudarVersao?: (versao: string) => void;
  versaoInicial?: string;
  linkLivro?: string;
}

const SeletorVersaoBiblia = ({ 
  aoMudarVersao, 
  versaoInicial = "nvi",
  linkLivro = "/biblia/genesis/1"
}: PropriedadesSeletorVersaoBiblia) => {
  const [versaoSelecionada, setVersaoSelecionada] = useState(versaoInicial);

  const manipularMudancaVersao = (versao: string) => {
    setVersaoSelecionada(versao);
    if (aoMudarVersao) {
      aoMudarVersao(versao);
    }
  };

  const versaoAtual = versoesBiblia.find(v => v.id === versaoSelecionada);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center w-full max-w-lg mx-auto px-2 sm:px-0">
      <div className="w-full sm:w-2/3 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-medium text-sm z-10 pointer-events-none">
          Versão
        </div>
        <Select value={versaoSelecionada} onValueChange={manipularMudancaVersao}>
          <SelectTrigger className="w-full text-sm pl-16 bg-white text-black border-gray-300">
            <SelectValue placeholder="Selecione uma versão">
              {versaoAtual?.nome}
            </SelectValue>
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
        <Link to={`${linkLivro}?versao=${versaoSelecionada}`}>
          <Book className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Ler Agora</span>
          <span className="sm:hidden">Ler</span>
        </Link>
      </Button>
    </div>
  );
};

export default SeletorVersaoBiblia;
