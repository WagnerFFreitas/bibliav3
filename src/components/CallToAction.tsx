
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied customers who are already using our platform.
              Start your journey today.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Button size="lg" variant="secondary" className="w-full md:w-auto">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
