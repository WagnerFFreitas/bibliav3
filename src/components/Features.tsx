
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Zap, Star, Unlock } from "lucide-react";

const features = [
  {
    title: "Rápido & Eficiente",
    description: "Nossa plataforma é otimizada para performance e velocidade.",
    icon: Zap,
  },
  {
    title: "Totalmente Personalizável",
    description: "Adapte tudo às suas necessidades e preferências específicas.",
    icon: Layers,
  },
  {
    title: "Qualidade Premium",
    description: "Oferecemos apenas produtos e serviços da mais alta qualidade.",
    icon: Star,
  },
  {
    title: "Acesso Ilimitado",
    description: "Tenha acesso completo a todos os recursos sem restrições.",
    icon: Unlock,
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Nossos Principais Recursos</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Descubra o que faz nossa plataforma se destacar da concorrência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
