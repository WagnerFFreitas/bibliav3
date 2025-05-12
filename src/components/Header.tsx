
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Book, Search, Music } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-lg font-bold md:text-xl">BíbliaOnline</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
          <Link to="/versoes" className="text-sm font-medium transition-colors hover:text-primary">
            Versões
          </Link>
          <Link to="/biblia/genesis/1" className="text-sm font-medium transition-colors hover:text-primary">
            BÍBLIA
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
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden z-20 shadow-lg animate-fade-in">
            <div className="container py-4 px-4 flex flex-col space-y-4">
              <Link 
                to="/versoes" 
                className="text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-primary flex items-center"
                onClick={toggleMenu}
              >
                Versões
              </Link>
              <Link 
                to="/biblia/genesis/1" 
                className="text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-primary flex items-center"
                onClick={toggleMenu}
              >
                BÍBLIA
              </Link>
              <Link 
                to="/pesquisar" 
                className="text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-primary flex items-center"
                onClick={toggleMenu}
              >
                <Search className="mr-2 h-4 w-4" />
                Pesquisar
              </Link>
              
              <Link 
                to="/harpa-hinario" 
                className="text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-primary flex items-center"
                onClick={toggleMenu}
              >
                <Music className="mr-2 h-4 w-4" />
                Harpa e Hinário
              </Link>
              
              <Link 
                to="/sobre" 
                className="text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-primary flex items-center"
                onClick={toggleMenu}
              >
                Sobre
              </Link>

              <Button size="sm" className="w-full mt-2">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
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
