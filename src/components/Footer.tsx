
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Facebook, Instagram, Book } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Book className="mr-2 h-5 w-5" />
              BíbliaOnline
            </h3>
            <p className="text-muted-foreground">
              Facilitando o acesso e estudo da Palavra de Deus em diversas traduções desde 2023.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Bíblia</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/versoes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Versões
                </Link>
              </li>
              <li>
                <Link to="/livros" className="text-muted-foreground hover:text-foreground transition-colors">
                  Livros
                </Link>
              </li>
              <li>
                <Link to="/pesquisar" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pesquisar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dicionario" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dicionário Bíblico
                </Link>
              </li>
              <li>
                <Link to="/estudos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Estudos Bíblicos
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Planos de Leitura
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2023 BíbliaOnline. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termos de Serviço
            </Link>
            <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/atribuicoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Atribuições
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
