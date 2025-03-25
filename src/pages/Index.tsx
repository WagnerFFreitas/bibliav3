
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BibleVersionSelector from "@/components/BibleVersionSelector";
import BibleVerseDisplay from "@/components/BibleVerseDisplay";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Search, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              A Palavra de Deus Acessível a Todos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore a Bíblia Sagrada em diversas traduções, pesquise versículos e aprofunde seu conhecimento das escrituras.
            </p>
            
            <div className="mb-10">
              <BibleVersionSelector />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link to="/versoes">
                  <Book className="mr-2 h-4 w-4" />
                  Explorar Versões
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/pesquisar">
                  <Search className="mr-2 h-4 w-4" />
                  Pesquisar na Bíblia
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Versículo do Dia */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Versículo do Dia</h2>
            <div className="max-w-3xl mx-auto">
              <BibleVerseDisplay />
            </div>
          </div>
        </section>
        
        {/* Features/Recursos */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos da Plataforma</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Múltiplas Versões</h3>
                <p className="text-muted-foreground">
                  Acesse diversas traduções da Bíblia, desde as mais tradicionais até as contemporâneas.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pesquisa Avançada</h3>
                <p className="text-muted-foreground">
                  Encontre rapidamente passagens por palavras-chave, temas ou referências específicas.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Favoritos</h3>
                <p className="text-muted-foreground">
                  Salve seus versículos e passagens favoritas para acesso rápido e compartilhamento.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/sobre">
                  Saiba mais sobre nossos recursos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Comece a Explorar a Palavra Hoje</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Acesse a Bíblia Sagrada onde quer que esteja, em qualquer dispositivo, gratuitamente.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/versoes">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
