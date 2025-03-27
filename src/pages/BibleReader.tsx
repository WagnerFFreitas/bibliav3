
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BibleSidebar from "@/components/BibleSidebar";
import BibleVerseGrid from "@/components/BibleVerseGrid";
import BibleVerse, { getNumeroVersiculos } from "@/components/BibleVerse";
import ScrollToTop from "@/components/ScrollToTop";
import BibleVersionSelector from "@/components/BibleVersionSelector";

const BibleReader = () => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [versaoBiblia, setVersaoBiblia] = useState(searchParams.get("versao") || "nvi");
  
  // Determinar o número de versículos para o capítulo atual
  const totalVerses = getNumeroVersiculos(livro, parseInt(capitulo));
  
  useEffect(() => {
    // Resetar o versículo selecionado ao mudar de capítulo ou livro
    setSelectedVerse(null);
  }, [livro, capitulo]);
  
  useEffect(() => {
    // Atualizar a versão da Bíblia quando os parâmetros de URL mudarem
    const versaoUrl = searchParams.get("versao");
    if (versaoUrl) {
      setVersaoBiblia(versaoUrl);
    }
  }, [searchParams]);
  
  // Formatação do título do livro e capítulo atual
  const formatBookTitle = (book: string) => {
    const formatted = book.charAt(0).toUpperCase() + book.slice(1);
    return formatted;
  };

  const handleVerseSelect = (verse: number) => {
    setSelectedVerse(verse);
    // Adiciona um hash à URL para o versículo selecionado
    window.location.hash = `v${verse}`;
  };
  
  const handleVersionChange = (novaVersao: string) => {
    setVersaoBiblia(novaVersao);
    // Atualiza a URL com a nova versão
    setSearchParams(prev => {
      prev.set("versao", novaVersao);
      return prev;
    });
  };
  
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
      
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar com livros */}
        <BibleSidebar />
        
        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed bg-opacity-20">
          <div className="container mx-auto">
            <h1 className="text-center text-3xl md:text-4xl font-bold uppercase mb-6 text-white">
              {formatBookTitle(livro)} - CAPÍTULO {capitulo}
              {selectedVerse && <span> - VERSÍCULO {selectedVerse}</span>}
            </h1>
            
            <div className="mb-6">
              <BibleVersionSelector 
                onVersionChange={handleVersionChange} 
                initialVersion={versaoBiblia}
              />
            </div>
            
            {/* Grid de versículos (números) - agora com o número correto */}
            <BibleVerseGrid 
              totalVerses={totalVerses} 
              onVerseSelect={handleVerseSelect}
            />
            
            {/* Exibição do texto do versículo */}
            <BibleVerse 
              livro={livro} 
              capitulo={parseInt(capitulo)} 
              versiculo={selectedVerse}
              versao={versaoBiblia}
            />
            
            <footer className="text-center text-sm text-gray-400 mt-8">
              © Bíblia Sagrada 2024
            </footer>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default BibleReader;
