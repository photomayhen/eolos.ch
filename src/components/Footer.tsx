import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Services",
    links: [
      { name: "RFQ Management", href: "#services" },
      { name: "RFP Excellence", href: "#services" },
      { name: "Contract Negotiation", href: "#services" },
      { name: "Supply Chain Optimization", href: "#services" }
    ]
  },
  {
    title: "Solutions",
    links: [
      { name: "Vendor Selection", href: "#benefits" },
      { name: "Cost Reduction", href: "#benefits" },
      { name: "Process Automation", href: "#benefits" },
      { name: "Performance Analytics", href: "#benefits" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Our Story", href: "#gallery" },
      { name: "Careers", href: "#contact" },
      { name: "Contact", href: "#contact" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Case Studies", href: "#gallery" },
      { name: "White Papers", href: "#" },
      { name: "Blog", href: "#" }
    ]
  }
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-primary-light mb-4">EOLOS</h3>
            <p className="text-sm font-playfair italic mb-4">
              Consulting
            </p>
            <p className="text-background/80 mb-6 leading-relaxed">
              Where Renaissance wisdom meets modern procurement excellence. 
              Transforming supply chains with the artistry of the past and the precision of today.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-light" />
                <span className="text-sm">info@eolos.ch</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-light" />
                <span className="text-sm">Winterthur</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-background mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-background/70 hover:text-primary-light transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-background mb-3">
              Stay Updated
            </h4>
            <p className="text-background/70 text-sm mb-4">
              Subscribe to our newsletter for the latest insights in procurement excellence.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <Button className="bg-primary-light hover:bg-primary text-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-background/70 text-sm">
              <p>© 2024 EOLOS Consulting. All rights reserved.</p>
              <p className="text-xs mt-1">*Potential figures based on market research and industry standards, not our experience (new business)</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-background/70 hover:text-primary-light transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-background/70 hover:text-primary-light transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-background/70 hover:text-primary-light transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-background/70 hover:text-primary-light transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Da Vinci Quote */}
        <div className="text-center mt-8 pt-8 border-t border-background/20">
          <blockquote className="text-background/60 font-playfair italic text-sm">
            "Obstacles cannot crush me; every obstacle yields to stern resolve."
          </blockquote>
          <cite className="text-background/40 text-xs mt-2 block">— Leonardo da Vinci</cite>
        </div>
      </div>
    </footer>
  );
};