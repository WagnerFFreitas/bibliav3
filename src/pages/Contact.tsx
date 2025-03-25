
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollToTop from "@/components/ScrollToTop";

const Contact = () => {
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
        <div className="container mx-auto max-w-3xl bg-black/70 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Entre em Contato</h1>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Seu nome completo" 
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu-email@exemplo.com" 
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
              <Input 
                id="subject" 
                type="text" 
                placeholder="Assunto da mensagem" 
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
              <Textarea 
                id="message" 
                placeholder="Escreva sua mensagem aqui..." 
                className="bg-zinc-900 border-zinc-700 min-h-[150px]"
              />
            </div>
            
            <Button className="w-full bg-indigo-700 hover:bg-indigo-600">
              Enviar Mensagem
            </Button>
          </form>
          
          <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-black/30">
            <h2 className="text-xl font-bold mb-2 text-indigo-300">Outras Formas de Contato</h2>
            <ul className="space-y-2 text-gray-300">
              <li><strong>Email:</strong> contato@bibliasagrada.com</li>
              <li><strong>Telefone:</strong> (00) 12345-6789</li>
              <li><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h</li>
            </ul>
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

export default Contact;
