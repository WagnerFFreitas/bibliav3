
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Pronto para Começar?</h2>
            <p className="text-lg md:text-xl opacity-90">
              Junte-se a milhares de clientes satisfeitos que já estão usando nossa plataforma.
              Comece sua jornada hoje.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Button size="lg" variant="secondary" className="w-full md:w-auto">
              Iniciar Teste Gratuito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
