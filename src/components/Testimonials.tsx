
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Emma Wilson",
    title: "CEO, TechStart",
    content: "This platform has completely transformed how we operate. The interface is intuitive and the features are exactly what we needed.",
    avatar: "EW",
  },
  {
    name: "Alex Johnson",
    title: "Designer, CreativeHub",
    content: "I've tried many similar tools, but this one stands out in terms of flexibility and ease of use. Highly recommended for creative professionals.",
    avatar: "AJ",
  },
  {
    name: "Sarah Parker",
    title: "Marketing Director, GrowthCo",
    content: "The analytics capabilities have given us insights we never had before. Our campaigns are now data-driven and much more effective.",
    avatar: "SP",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Don't just take our word for it — hear from some of our satisfied customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="pt-6">
                <QuoteIcon className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="mb-6">{testimonial.content}</p>
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
