
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Check } from "lucide-react";
import { Link } from "react-router-dom";

const versoesBiblia = [
  { 
    id: "nvi", 
    nome: "Nova Versão Internacional", 
    descricao: "Uma tradução contemporânea reconhecida pela sua precisão e clareza.",
    ano: 2000,
    destaque: true
  },
  { 
    id: "acf", 
    nome: "Almeida Corrigida Fiel", 
    descricao: "Versão tradicional revisada que mantém a fidelidade aos textos originais.",
    ano: 1995,
    destaque: false
  },
  { 
    id: "ara", 
    nome: "Almeida Revista e Atualizada", 
    descricao: "Uma atualização da tradução clássica de João Ferreira de Almeida.",
    ano: 1993,
    destaque: false
  }
];

const VersoesBiblia = () => {
  console.log('📖 VersoesBiblia: Renderizando página simplificada');
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Versões da Bíblia</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Teste da página funcionando
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {versoesBiblia.map((versao) => (
            <Card key={versao.id} className={versao.destaque ? "border-blue-500" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {versao.nome}
                  {versao.destaque && <Check className="ml-2 h-5 w-5 text-blue-500" />}
                </CardTitle>
                <CardDescription>Publicada em {versao.ano}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{versao.descricao}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/biblia/genesis/1?versao=${versao.id}`}>
                    <Book className="mr-2 h-4 w-4" />
                    Ler Esta Versão
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersoesBiblia;
