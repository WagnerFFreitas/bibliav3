
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

const versoesBiblia = [
  { id: "nvi", nome: "Nova Versão Internacional" },
  { id: "acf", nome: "Almeida Corrigida Fiel" },
  { id: "ara", nome: "Almeida Revista e Atualizada" },
  { id: "naa", nome: "Nova Almeida Atualizada" },
  { id: "ntlh", nome: "Nova Tradução na Linguagem de Hoje" },
  { id: "kjv", nome: "King James Version" }
];

const BibleVersionSelector = () => {
  const [versaoSelecionada, setVersaoSelecionada] = useState("nvi");

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg mx-auto">
      <div className="w-full sm:w-2/3">
        <Select value={versaoSelecionada} onValueChange={setVersaoSelecionada}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma versão" />
          </SelectTrigger>
          <SelectContent>
            {versoesBiblia.map((versao) => (
              <SelectItem key={versao.id} value={versao.id}>
                {versao.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full sm:w-auto" size="sm">
        <Book className="mr-2 h-4 w-4" />
        Ler Agora
      </Button>
    </div>
  );
};

export default BibleVersionSelector;
