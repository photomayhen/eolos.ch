import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Clock, 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Strategic vendor selection and negotiation excellence drive significant cost savings.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-green-600"
  },
  {
    icon: Clock,
    title: "Faster Processing",
    description: "Streamlined procurement cycles through intelligent automation and optimized workflows.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Compliance Excellence",
    description: "Robust compliance framework ensuring adherence to regulations and internal policies.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Enhanced ROI",
    description: "Measurable returns on procurement investments through data-driven decision making.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Vendor Optimization",
    description: "Curated vendor ecosystem with pre-qualified, performance-monitored suppliers.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-orange-600"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Comprehensive quality control processes ensuring excellence in every delivery.",
    stats: "*Potential figures based on market research and industry standards",
    color: "text-indigo-600"
  }
];

const keyFeatures = [
  "AI-powered vendor matching",
  "Real-time market intelligence",
  "Automated contract management",
  "Risk assessment algorithms",
  "Performance analytics dashboard",
  "24/7 support and monitoring"
];

export const Benefits = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="benefits" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Transformative
            <span className="text-gradient block">Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the renaissance of procurement with measurable results that speak to both the 
            artistry of process and the science of efficiency.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <Card
                key={index}
                data-index={index}
                className={`gradient-card shadow-soft hover:shadow-elegant transition-all duration-500 border-border/50 group ${
                  isVisible ? 'animate-slide-in-left' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform ${benefit.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${
            visibleItems.includes(6) ? 'animate-slide-in-left' : 'opacity-0'
          }`} data-index="6">
            <h3 className="text-3xl font-playfair font-bold text-foreground mb-6">
              Why Choose EOLOS?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our platform combines the wisdom of traditional procurement practices with the power 
              of modern technology, creating a harmonious blend that delivers exceptional results.
            </p>
            
            <div className="space-y-3 mb-8">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="gradient-primary shadow-elegant group" asChild>
              <a href="#contact">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className={`transition-all duration-1000 ${
            visibleItems.includes(7) ? 'animate-slide-in-right' : 'opacity-0'
          }`} data-index="7">
            <Card className="gradient-card shadow-elegant border-border/50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gradient mb-2">Transformative Results</div>
                  <div className="text-lg font-semibold text-foreground">Built on Excellence</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Processing Efficiency</span>
                    <span className="font-semibold text-foreground">Enhanced*</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Vendor Quality</span>
                    <span className="font-semibold text-foreground">Optimized*</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Compliance Excellence</span>
                    <span className="font-semibold text-foreground">Assured*</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Client Satisfaction</span>
                    <span className="font-semibold text-foreground">Premium*</span>
                  </div>
                </div>
                

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-sepia-dark font-playfair italic text-center">
                    "The EOLOS approach transformed our procurement process completely. 
                    The blend of traditional wisdom and modern efficiency is remarkable."
                  </p>
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    — Fortune 500 Manufacturing Company
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};