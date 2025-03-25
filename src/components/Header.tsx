
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SuaMarca</span>
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
          <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">
            Recursos
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            Sobre
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contato
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden z-20">
            <div className="container py-4 flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Início
              </Link>
              <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">
                Recursos
              </Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
                Sobre
              </Link>
              <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contato
              </Link>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Entrar
          </Button>
          <Button size="sm">Começar</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
