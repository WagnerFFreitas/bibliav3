
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como posso começar a usar a plataforma?",
    answer: "Para começar, basta clicar no botão 'Iniciar Teste Gratuito' e seguir o processo de cadastro. Em poucos minutos, você terá acesso completo a todos os recursos durante o período de avaliação."
  },
  {
    question: "Quais são os planos de preços disponíveis?",
    answer: "Oferecemos diversos planos para atender às necessidades de diferentes usuários, desde freelancers até grandes empresas. Visite nossa página de preços para ver detalhes completos sobre cada plano."
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Você continuará tendo acesso aos recursos até o final do período de faturamento atual."
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer: "Sim, oferecemos suporte técnico prioritário para todos os nossos clientes. Nossa equipe está disponível por chat, e-mail e telefone para ajudar com quaisquer questões que você possa ter."
  },
  {
    question: "A plataforma funciona em dispositivos móveis?",
    answer: "Sim, nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar e gerenciar seus projetos de qualquer lugar."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Perguntas Frequentes</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Encontre respostas para as perguntas mais comuns sobre nossa plataforma.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
