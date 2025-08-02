import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "hello@eolos.consulting",
    action: "Send us a message"
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    action: "Schedule a call"
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Global Offices",
    action: "Find nearest office"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "24/7 Support Available",
    action: "Contact anytime"
  }
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll be in touch within 24 hours.");
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Begin Your
            <span className="text-gradient block">Transformation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to experience the symphony of old and new? Let's discuss how EOLOS can 
            revolutionize your procurement and supply chain operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-foreground">
                Start the Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your procurement challenges and goals..."
                    rows={5}
                    required
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-primary shadow-elegant group"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="gradient-card shadow-soft hover:shadow-elegant transition-all duration-300 border-border/50 group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{info.details}</p>
                      <p className="text-xs text-primary font-medium">{info.action}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <Card className="gradient-card shadow-elegant border-border/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join hundreds of companies that have transformed their procurement processes 
                  with EOLOS. Experience the perfect harmony of Renaissance wisdom and modern innovation.
                </p>
                <div className="space-y-3 mb-6">
                  <Button size="lg" className="w-full gradient-primary shadow-soft">
                    Schedule a Free Consultation
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No commitment required • 30-minute consultation • Custom solution design
                </p>
              </CardContent>
            </Card>

            {/* Da Vinci Quote */}
            <div className="text-center p-6 bg-sepia/20 rounded-lg border border-sepia-dark/20">
              <blockquote className="text-sepia-dark font-playfair italic text-lg mb-3">
                "The noblest pleasure is the joy of understanding."
              </blockquote>
              <cite className="text-sm text-muted-foreground">— Leonardo da Vinci</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};