import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Benefits } from "@/components/Benefits";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { NewsletterModal } from "@/components/NewsletterModal";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  useAnalytics(); // Track anonymous visits
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <NewsletterModal />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Services />
        <Benefits />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
