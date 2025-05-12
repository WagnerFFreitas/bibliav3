
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Monitor, Smartphone, Tablet, AlertCircle } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-gray-300 hover:text-white transition">
            BíbliaV3
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
          
          {/* Nova seção para o aplicativo Flutter */}
          <div className="mb-10 p-6 border-2 border-indigo-600 rounded-lg bg-indigo-900/20">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400 flex items-center">
              <Smartphone className="w-8 h-8 mr-2" />
              Novo! Aplicativo Mobile com Flutter
            </h2>
            <p className="text-gray-300 mb-6">
              Experimente nossa versão mais recente desenvolvida com Flutter, oferecendo compatibilidade completa com Android e iOS. 
              Acesse todas as funcionalidades da BíbliaV3 diretamente do seu dispositivo móvel, com suporte offline.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-indigo-300">Principais recursos:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Acesso offline a todas as versões da Bíblia</li>
                  <li>Modo escuro e modo claro</li>
                  <li>Sincronização de anotações entre dispositivos</li>
                  <li>Modo de apresentação para projeção</li>
                  <li>Design otimizado para telas de celular e tablet</li>
                </ul>
              </div>
              
              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-indigo-300">Requisitos:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Android 6.0 ou superior</li>
                  <li>iOS 13 ou superior</li>
                  <li>200MB de espaço em disco</li>
                  <li>Conexão com internet para download inicial</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="mr-2 h-5 w-5" />
                Baixar para Android (APK)
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="mr-2 h-5 w-5" />
                Baixar para iOS (App Store)
              </Button>
            </div>
            
            <Alert className="mt-6 bg-yellow-900/20 border border-yellow-600/50">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertTitle className="text-yellow-500">Código-fonte disponível</AlertTitle>
              <AlertDescription className="text-gray-300">
                Este aplicativo é open source e foi desenvolvido com Flutter. Desenvolvedores interessados podem contribuir acessando nosso repositório no GitHub.
              </AlertDescription>
            </Alert>
          </div>
          
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
          © BíbliaV3 2024
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Downloads;
