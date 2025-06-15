
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Monitor, Smartphone, Tablet } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

const Downloads = () => {
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
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-1 p-6 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed">
        <div className="container mx-auto max-w-4xl bg-black/70 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Downloads</h1>
          
          <p className="text-gray-300 mb-8">
            Baixe a Bíblia Sagrada em diferentes formatos e para diferentes dispositivos. Tenha acesso à Palavra de Deus mesmo sem conexão à internet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center">
              <Smartphone className="w-16 h-16 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Aplicativo para Celular</h2>
              <p className="text-gray-300 mb-4">
                Baixe nosso aplicativo para Android ou iOS e tenha acesso à Bíblia completa, recursos de estudo e muito mais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Android
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  iOS
                </Button>
              </div>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center">
              <Tablet className="w-16 h-16 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Versão para Tablet</h2>
              <p className="text-gray-300 mb-4">
                Versão otimizada para tablets, com interface adaptada para telas maiores e recursos adicionais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Android
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  iPad
                </Button>
              </div>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center">
              <Monitor className="w-16 h-16 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Programa para Desktop</h2>
              <p className="text-gray-300 mb-4">
                Aplicativo completo para Windows, Mac e Linux com recursos avançados de estudo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Windows
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Mac
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  Linux
                </Button>
              </div>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg bg-black/30 flex flex-col items-center text-center">
              <Download className="w-16 h-16 text-indigo-400 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-indigo-300">Arquivos para Download</h2>
              <p className="text-gray-300 mb-4">
                Baixe a Bíblia em diferentes formatos para leitura em diversos dispositivos e leitores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  EPUB
                </Button>
                <Button className="bg-indigo-700 hover:bg-indigo-600">
                  <Download className="mr-2 h-4 w-4" />
                  MOBI
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-black/50">
            <h2 className="text-xl font-bold mb-2 text-indigo-300">Termos de Uso</h2>
            <p className="text-gray-300 text-sm">
              Todos os aplicativos e arquivos disponibilizados para download são gratuitos para uso pessoal. A distribuição comercial não é permitida sem autorização prévia. Os textos bíblicos são de domínio público ou estão sendo utilizados com permissão dos detentores dos direitos de cada tradução.
            </p>
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

export default Downloads;
