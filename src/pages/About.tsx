
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
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
          <h1 className="text-3xl font-bold mb-6">Sobre a Bíblia Sagrada Online</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              Bem-vindo à Bíblia Sagrada Online, um projeto dedicado a facilitar o acesso à Palavra de Deus em diversas traduções. Nossa plataforma foi criada com o objetivo de tornar a leitura e o estudo da Bíblia mais acessível para todos, independentemente de onde estejam.
            </p>
            
            <h2 className="text-2xl font-bold text-indigo-300 mt-8">Nossa Missão</h2>
            <p>
              Acreditamos que a Palavra de Deus deve ser acessível a todos. Nossa missão é fornecer uma plataforma fácil de usar, com recursos valiosos para o estudo bíblico, ajudando pessoas de todas as idades e origens a se aprofundarem no conhecimento das Escrituras.
            </p>
            
            <h2 className="text-2xl font-bold text-indigo-300 mt-8">Recursos Disponíveis</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Diversas traduções da Bíblia em português e outros idiomas</li>
              <li>Navegação intuitiva por livros, capítulos e versículos</li>
              <li>Ferramentas de busca avançada</li>
              <li>Dicionário e concordância bíblica</li>
              <li>Harpa Cristã e hinários</li>
              <li>Planos de leitura da Bíblia</li>
              <li>Aplicativo disponível para download em diferentes plataformas</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-indigo-300 mt-8">Colaborações e Fontes</h2>
            <p>
              Nossa plataforma utiliza textos bíblicos de fontes confiáveis e respeitadas, garantindo a fidelidade às traduções originais. Trabalhamos em colaboração com estudiosos e organizações que compartilham nossa visão de disseminar a Palavra de Deus.
            </p>
            
            <h2 className="text-2xl font-bold text-indigo-300 mt-8">Contato</h2>
            <p>
              Se você tiver dúvidas, sugestões ou feedback, não hesite em entrar em contato conosco através da nossa <Link to="/contato" className="text-indigo-300 hover:text-indigo-200 underline">página de contato</Link>. Estamos sempre buscando melhorar nossa plataforma para melhor servir nossos usuários.
            </p>
            
            <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-black/30">
              <p className="italic">
                "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça, a fim de que o homem de Deus seja perfeito e perfeitamente habilitado para toda boa obra." <span className="font-semibold">2 Timóteo 3:16-17</span>
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

export default About;
