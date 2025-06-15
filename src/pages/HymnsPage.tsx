
import { Link } from "react-router-dom";
import { Music, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HymnsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Livros de Hinos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Harpa Cristã Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-indigo-50 dark:bg-indigo-950/30">
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Harpa Cristã
              </CardTitle>
              <CardDescription>
                Coletânea de hinos evangelicos populares
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400">
                A Harpa Cristã é uma coletânea de hinos usada pelas Assembleias de Deus no Brasil, contendo 640 hinos tradicionais.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/harpa">Acessar Harpa Cristã</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Cantor Cristão Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/30">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Cantor Cristão
              </CardTitle>
              <CardDescription>
                Hinário tradicional batista
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400">
                O Cantor Cristão é um hinário tradicional usado pelas igrejas batistas no Brasil, contendo hinos clássicos que fazem parte da tradição batista.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/hinario">Acessar Cantor Cristão</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HymnsPage;
