
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Emma Wilson",
    title: "CEO, TechStart",
    content: "Esta plataforma transformou completamente a forma como operamos. A interface é intuitiva e os recursos são exatamente o que precisávamos.",
    avatar: "EW",
  },
  {
    name: "Alex Johnson",
    title: "Designer, CreativeHub",
    content: "Já experimentei muitas ferramentas similares, mas esta se destaca em termos de flexibilidade e facilidade de uso. Altamente recomendada para profissionais criativos.",
    avatar: "AJ",
  },
  {
    name: "Sarah Parker",
    title: "Diretora de Marketing, GrowthCo",
    content: "Os recursos de análise nos deram insights que nunca tivemos antes. Nossas campanhas agora são baseadas em dados e muito mais eficazes.",
    avatar: "SP",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Não acredite apenas na nossa palavra — ouça o que alguns de nossos clientes satisfeitos têm a dizer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <QuoteIcon className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="mb-6 flex-grow">{testimonial.content}</p>
                <Separator className="mb-6" />
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
