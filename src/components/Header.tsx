
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Book, Search, Music } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6" />
          <span className="text-xl font-bold">BíbliaOnline</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Início
          </Link>
          <Link to="/versoes" className="text-sm font-medium transition-colors hover:text-primary">
            Versões
          </Link>
          <Link to="/pesquisar" className="text-sm font-medium transition-colors hover:text-primary">
            Pesquisar
          </Link>
          
          <Link to="/harpa-hinario" className="text-sm font-medium transition-colors hover:text-primary">
            Harpa e Hinário
          </Link>
          
          <Link to="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
            Sobre
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden z-20">
            <div className="container py-4 flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Início
              </Link>
              <Link to="/versoes" className="text-sm font-medium transition-colors hover:text-primary">
                Versões
              </Link>
              <Link to="/pesquisar" className="text-sm font-medium transition-colors hover:text-primary">
                Pesquisar
              </Link>
              
              <Link to="/harpa-hinario" className="text-sm font-medium transition-colors hover:text-primary">
                Harpa e Hinário
              </Link>
              
              <Link to="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
                Sobre
              </Link>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          <Button size="sm">Minha Conta</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
