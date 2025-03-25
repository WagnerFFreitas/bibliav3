
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BibleVersionSelector from "@/components/BibleVersionSelector";

const resultadosSimulados = [
  { 
    referencia: "João 3:16", 
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", 
    versao: "NVI" 
  },
  { 
    referencia: "Salmos 23:1", 
    texto: "O Senhor é o meu pastor, nada me faltará.", 
    versao: "ACF" 
  },
  { 
    referencia: "Romanos 8:28", 
    texto: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.", 
    versao: "NVI" 
  },
  { 
    referencia: "Filipenses 4:13", 
    texto: "Posso todas as coisas naquele que me fortalece.", 
    versao: "ARA" 
  },
];

const BibleSearch = () => {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [resultados, setResultados] = useState([]);
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
  
  const realizarPesquisa = (e) => {
    e.preventDefault();
    setPesquisaRealizada(true);
    setResultados(resultadosSimulados);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pesquisar na Bíblia</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre versículos, palavras-chave e referências em diversas versões da Bíblia Sagrada.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <BibleVersionSelector />
          
          <form onSubmit={realizarPesquisa} className="mt-6 flex gap-2">
            <Input
              type="text"
              placeholder="Digite palavras-chave, versículos ou referências..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Pesquisar
            </Button>
          </form>
        </div>
        
        {pesquisaRealizada && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Resultados da Pesquisa</h2>
            
            {resultados.length > 0 ? (
              <div className="space-y-6">
                {resultados.map((resultado, index) => (
                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">{resultado.referencia} <span className="text-sm font-normal text-muted-foreground">({resultado.versao})</span></h3>
                    <p>{resultado.texto}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Nenhum resultado encontrado para sua pesquisa.</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BibleSearch;
