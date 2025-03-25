
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Crie Experiências Incríveis
            <span className="text-primary block md:inline"> Sem Limites</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[42rem] mb-10">
            Construa sites e aplicações impressionantes com nossa plataforma moderna.
            Ferramentas poderosas para designers, desenvolvedores e empresas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" className="w-full">
              Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
