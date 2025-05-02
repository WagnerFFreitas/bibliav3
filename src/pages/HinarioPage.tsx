
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Presentation, Book } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

const HinarioPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHino, setSelectedHino] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const handleOpenSlideMode = () => {
    if (selectedHino) {
      navigate(`/slide-hino/cantor/${selectedHino}`);
    }
  };
  
  // Simulação de dados para a demonstração
  const hinosSimulados = [
    { numero: 1, titulo: "Glória ao Salvador" },
    { numero: 2, titulo: "Culto à Trindade" },
    { numero: 3, titulo: "O Grande Amor de Deus" },
    { numero: 4, titulo: "Amor Sacrificial" },
    { numero: 5, titulo: "O Amor de Jesus" },
    { numero: 6, titulo: "Firmeza na Fé" },
    { numero: 7, titulo: "Confissão e Súplica" },
    { numero: 8, titulo: "Bênção Pedida" },
    { numero: 9, titulo: "Coração Quebrantado" },
    { numero: 10, titulo: "Vida com Deus" },
  ];
  
  const filteredHinos = hinosSimulados.filter(
    (hino) => 
      hino.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      hino.numero.toString().includes(searchTerm)
  );
  
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">
              <Book className="inline-block mr-2 h-8 w-8 text-blue-500" />
              Cantor Cristão
            </h1>
            
            {selectedHino && (
              <Button 
                onClick={handleOpenSlideMode}
                className="bg-amber-700 hover:bg-amber-600 text-white flex items-center gap-2"
              >
                <Presentation size={18} />
                Apresentação (Slide)
              </Button>
            )}
          </div>
          
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Buscar hino por número ou título..."
              className="w-full bg-zinc-900 border-zinc-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {Array.from({ length: 10 }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                className="bg-blue-900/80 hover:bg-blue-800 border-blue-700 text-white"
                onClick={() => setSearchTerm(((i + 1) * 10).toString())}
              >
                {(i + 1) * 10}
              </Button>
            ))}
            {/* Botão para mostrar todos */}
            <Button
              variant="outline"
              className="bg-green-800/80 hover:bg-green-700 border-green-700 text-white"
              onClick={() => setSearchTerm("")}
            >
              Ver Todos
            </Button>
          </div>
          
          <div className="space-y-2">
            {filteredHinos.map((hino) => (
              <div 
                key={hino.numero}
                className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                  selectedHino === hino.numero 
                    ? "bg-blue-900/80 border-blue-600" 
                    : "bg-black/50 border-gray-800 hover:bg-blue-900/40"
                }`}
                onClick={() => setSelectedHino(hino.numero)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    <span className="text-blue-500 mr-2">{hino.numero}.</span>
                    {hino.titulo}
                  </h2>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/slide-hino/cantor/${hino.numero}`);
                    }}
                  >
                    <Presentation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredHinos.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              Nenhum hino encontrado. Tente uma busca diferente.
            </div>
          )}
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
