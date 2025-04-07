
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollToTop from "@/components/ScrollToTop";

const HinarioPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-gray-300 hover:text-white transition">
            Bíblia Sagrada
          </Link>
          
          <div className="flex w-full md:w-auto items-center gap-2">
            <Button variant="outline" className="rounded-md text-sm bg-zinc-900 border-zinc-700 text-gray-300">
              Todos
            </Button>
            <Input
              type="text"
              placeholder="Digite o termo de busca"
              className="w-full md:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white">
              Buscar
            </Button>
          </div>
        </div>
        
        {/* Menu de navegação */}
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-6 text-gray-400">
            <Link to="/" className="whitespace-nowrap hover:text-white transition">Slide</Link>
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa Cristã</Link>
            <Link to="/hinario" className="whitespace-nowrap hover:text-white transition">Hinário Cristão</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-1 p-6 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed">
        <div className="container mx-auto max-w-5xl bg-black/70 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Hinário Cristão</h1>
          
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Pesquisar hino por título ou número..."
              className="w-full bg-zinc-900 border-zinc-700"
            />
          </div>
          
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
            {Array.from({ length: 50 }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                className="bg-blue-900/80 hover:bg-blue-800 border-blue-700 text-white"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
            <h2 className="text-xl font-bold mb-2 text-blue-300">Hinário Cristão nº 1 - Grande é o Senhor</h2>
            <div className="space-y-4 text-gray-300">
              <p>Grande é o Senhor e mui digno de louvor<br />
                 Na cidade do nosso Deus, seu santo monte<br />
                 Alegria de toda a terra
              </p>
              <p>Grande é o Senhor em quem nós temos a vitória<br />
                 Que nos ajuda contra o inimigo<br />
                 Por isso diante dele nos prostramos
              </p>
              <p>Queremos o teu nome engrandecer<br />
                 E agradecer-te por tua obra em nossas vidas<br />
                 Confiamos em teu infinito amor<br />
                 Tua presença é o nosso sustento
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black p-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-sm text-gray-400">
          © Bíblia Sagrada 2024
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default HinarioPage;
