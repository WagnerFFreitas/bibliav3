
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Zap, Star, Unlock } from "lucide-react";

const features = [
  {
    title: "Fast & Efficient",
    description: "Our platform is optimized for performance and speed.",
    icon: Zap,
  },
  {
    title: "Fully Customizable",
    description: "Tailor everything to your specific needs and preferences.",
    icon: Layers,
  },
  {
    title: "Premium Quality",
    description: "We deliver only the highest quality products and services.",
    icon: Star,
  },
  {
    title: "Unlimited Access",
    description: "Get full access to all features with no restrictions.",
    icon: Unlock,
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Key Features</h2>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Discover what makes our platform stand out from the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
