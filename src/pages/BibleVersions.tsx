
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Check } from "lucide-react";

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
  },
  { 
    id: "naa", 
    nome: "Nova Almeida Atualizada", 
    descricao: "Versão que equilibra linguagem contemporânea com fidelidade textual.",
    ano: 2017,
    destaque: true
  },
  { 
    id: "ntlh", 
    nome: "Nova Tradução na Linguagem de Hoje", 
    descricao: "Tradução em linguagem simples e acessível para todos os leitores.",
    ano: 2000,
    destaque: false
  },
  { 
    id: "kjv", 
    nome: "King James Version", 
    descricao: "Tradução clássica em inglês com grande influência histórica.",
    ano: 1611,
    destaque: false
  }
];

const BibleVersions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Versões da Bíblia</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore diferentes traduções da Bíblia Sagrada para enriquecer seu estudo e compreensão das escrituras.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {versoesBiblia.map((versao) => (
            <Card key={versao.id} className={versao.destaque ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {versao.nome}
                  {versao.destaque && <Check className="ml-2 h-5 w-5 text-primary" />}
                </CardTitle>
                <CardDescription>Publicada em {versao.ano}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{versao.descricao}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Book className="mr-2 h-4 w-4" />
                  Ler Esta Versão
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BibleVersions;
