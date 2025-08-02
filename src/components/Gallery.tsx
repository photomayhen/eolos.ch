import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import daVinciProcurement from "@/assets/davinci-procurement.jpg";
import daVinciBuilding from "@/assets/davinci-building.jpg";
import daVinciNetwork from "@/assets/davinci-network.jpg";
import daVinciMarketResearch from "@/assets/davinci-market-research.jpg";
import daVinciMarketingCampaign from "@/assets/davinci-marketing-campaign.jpg";

const galleryItems = [
  {
    image: daVinciProcurement,
    title: "Procurement Architecture",
    category: "Process Design",
    description: "Renaissance-inspired procurement flow designs that optimize vendor relationships and contract management."
  },
  {
    image: daVinciBuilding,
    title: "Supply Chain Infrastructure",
    category: "Network Design",
    description: "Architectural blueprints for modern supply chain networks with classical engineering principles."
  },
  {
    image: daVinciNetwork,
    title: "Data Flow Dynamics",
    category: "Analytics",
    description: "Intelligent data flow patterns that mirror the natural systems studied by Renaissance masters."
  },
  {
    image: daVinciMarketResearch,
    title: "Market Research & Analysis",
    category: "Intelligence",
    description: "Comprehensive market understanding and competitive analysis with data-driven insights."
  },
  {
    image: daVinciMarketingCampaign,
    title: "Marketing Campaign Strategy",
    category: "Campaign Design",
    description: "End-to-end marketing campaign execution from concept to results with strategic precision."
  },
  {
    image: daVinciBuilding,
    title: "Contract Framework",
    category: "Legal Architecture",
    description: "Robust contract management frameworks built on principles of transparency and mutual benefit."
  }
];

const amenities = [
  "Dedicated Account Management",
  "Custom Integration Services",
  "Advanced Security Protocols",
  "Real-time Monitoring",
  "Compliance Assurance",
  "Training & Onboarding",
  "API Integration",
  "Custom Reporting",
  "Multi-language Support"
];

export const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Renaissance
            <span className="text-gradient block">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of procurement solutions where classical artistry meets modern innovation. 
            Each project tells a story of transformation and excellence.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryItems.map((item, index) => {
            const isVisible = visibleItems.includes(index);
            
            return (
              <Card
                key={index}
                data-index={index}
                className={`gradient-card shadow-soft hover:shadow-elegant transition-all duration-500 border-border/50 group cursor-pointer overflow-hidden ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-3 left-3 gradient-primary">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold font-playfair text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Amenities Section */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
              Complete Service Amenities
            </h3>
            <p className="text-muted-foreground">
              Every aspect of our service is designed to provide you with unparalleled support and excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors duration-300 ${
                  visibleItems.includes(10) ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                data-index="10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-2 h-2 bg-primary rounded-full mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Da Vinci Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-sepia-dark font-playfair italic text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            "Learning never exhausts the mind. Every challenge is an opportunity to create something magnificent."
          </blockquote>
          <cite className="text-sm text-muted-foreground">— Leonardo da Vinci (Adapted)</cite>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img 
              src={galleryItems[selectedImage].image} 
              alt={galleryItems[selectedImage].title}
              className="w-full h-auto rounded-lg shadow-elegant"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                {galleryItems[selectedImage].title}
              </h3>
              <p className="text-muted-foreground">
                {galleryItems[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};