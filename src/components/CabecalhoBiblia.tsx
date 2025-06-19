
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";

interface PropriedadesCabecalhoBiblia {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const CabecalhoBiblia = ({ searchTerm, setSearchTerm, sidebarOpen, setSidebarOpen }: PropriedadesCabecalhoBiblia) => {
  return (
    <header className="w-full p-2 sm:p-4 bg-black border-b border-gray-800">
      <div className="container mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold italic text-gray-300 hover:text-white transition">
          Bíblia Sagrada
        </Link>
        
        <div className="flex w-full sm:w-auto items-center gap-1 sm:gap-2">
          <Button variant="outline" className="rounded-md text-xs sm:text-sm bg-zinc-900 border-zinc-700 text-gray-300 px-2 sm:px-4">
            Todos
          </Button>
          <Input
            type="text"
            placeholder="Digite o termo de busca"
            className="w-full sm:w-60 md:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-4">
            Buscar
          </Button>
        </div>
      </div>
      
      <nav className="container mx-auto mt-2 sm:mt-4">
        <div className="flex overflow-x-auto py-2 gap-3 sm:gap-6 text-gray-400 text-sm">
          <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
          <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
          <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
          <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
          <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
          <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
          <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed top-20 left-2 z-20 bg-black/80 border-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </Button>
    </header>
  );
};

export default CabecalhoBiblia;
