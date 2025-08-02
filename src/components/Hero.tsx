import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import daVinciProcurement from "@/assets/davinci-procurement.jpg";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* DaVinci illustration background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={daVinciProcurement} 
          alt="Leonardo da Vinci procurement sketch"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* EOLOS Logo placeholder - will be replaced with actual logo */}
          <div className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">
              EOLOS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-playfair italic">
              Consulting
            </p>
          </div>

          {/* Hero tagline */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
              A Symphony of
              <span className="text-gradient block">Old and New</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where Leonardo da Vinci's timeless innovation meets modern procurement excellence. 
              Transforming supply chains with the artistry of the Renaissance and the precision of today's technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <Button size="lg" className="gradient-primary shadow-elegant text-lg px-8 py-6 group">
              Discover Our Solutions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </div>

          {/* Floating stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-900 ${
            isVisible ? 'animate-scale-in' : 'opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">20%+</div>
              <div className="text-sm text-muted-foreground">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Vendors Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Process Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};