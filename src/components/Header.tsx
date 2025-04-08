
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Book, Search, Music, ChevronDown } from "lucide-react";
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
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
                  Harpa e Hinário
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/harpa" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Harpa Cristã</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/hinario" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Hinário Cristão</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
              
              <div className="space-y-2">
                <div className="text-sm font-medium flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Harpa e Hinário
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
                <div className="pl-6 space-y-2">
                  <Link to="/harpa" className="block text-sm font-medium transition-colors hover:text-primary">
                    Harpa Cristã
                  </Link>
                  <Link to="/hinario" className="block text-sm font-medium transition-colors hover:text-primary">
                    Hinário Cristão
                  </Link>
                </div>
              </div>
              
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
