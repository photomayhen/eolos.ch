import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Search, 
  Handshake, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  BarChart3 
} from "lucide-react";
import daVinciNetwork from "@/assets/davinci-network.jpg";

const services = [
  {
    icon: FileText,
    title: "RFx/Tender Management",
    description: "Streamlined Request for Quotation processes with automated vendor matching and intelligent proposal analysis.",
    features: ["Automated vendor selection", "Real-time quote comparison", "Digital documentation"]
  },
  {
    icon: Search,
    title: "RFP Excellence",
    description: "Comprehensive Request for Proposal management from creation to award with Renaissance-inspired thoroughness.",
    features: ["Strategic proposal crafting", "Multi-criteria evaluation", "Transparent scoring systems"]
  },
  {
    icon: Handshake,
    title: "Contract Negotiation",
    description: "Expert negotiation services that balance traditional wisdom with modern legal frameworks.",
    features: ["Risk assessment", "Terms optimization", "Compliance monitoring"]
  },
  {
    icon: TrendingUp,
    title: "Supply Chain Optimization",
    description: "Transform your supply chain with the precision of da Vinci's engineering and today's analytics.",
    features: ["Performance analytics", "Route optimization", "Demand forecasting"]
  },
  {
    icon: Shield,
    title: "Vendor Due Diligence",
    description: "Thorough vendor assessment combining traditional verification methods with modern data analysis.",
    features: ["Financial stability analysis", "Quality certifications", "Performance history review"]
  },
  {
    icon: Clock,
    title: "Process Automation",
    description: "Intelligent automation that maintains the human touch while accelerating procurement cycles.",
    features: ["Workflow automation", "Real-time notifications", "Integration capabilities"]
  },
  {
    icon: Users,
    title: "Stakeholder Management",
    description: "Coordinated communication strategies that ensure all parties remain aligned throughout the process.",
    features: ["Multi-party coordination", "Progress tracking", "Transparent communication"]
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Deep insights into procurement performance with beautiful dashboards inspired by Renaissance art.",
    features: ["Custom reporting", "KPI monitoring", "Predictive analytics"]
  },
  {
    icon: Search,
    title: "Market Research & Competitive Analysis",
    description: "Data-driven insights that inform your business decisions with comprehensive market understanding.",
    features: ["Comprehensive market analysis", "Pricing analysis, positioning, and gap identification", "Customer survey execution, data collection, and analysis"]
  },
  {
    icon: TrendingUp,
    title: "Product Launch Marketing Campaign",
    description: "End-to-end campaign execution from concept to results with strategic precision.",
    features: ["Complete campaign strategy", "Marketing materials creation", "Launch event planning"]
  }
];

export const Services = () => {
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
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 relative">
      {/* Background illustration */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={daVinciNetwork} 
          alt="Leonardo da Vinci network sketch"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Marketing, Digitalization, Procurement & Supply Chain
            <span className="text-gradient block">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of services combines the methodical approach of Renaissance masters 
            with cutting-edge technology to deliver unparalleled procurement solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <Card 
                key={index}
                data-index={index}
                className={`gradient-card shadow-soft hover:shadow-elegant transition-all duration-500 border-border/50 group cursor-pointer ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-playfair">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-sepia-dark font-playfair italic text-lg mb-6">
            "Simplicity is the ultimate sophistication."
            <span className="block text-sm mt-2">— Leonardo da Vinci</span>
          </p>
        </div>
      </div>
    </section>
  );
};