import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import aboutHero from "@/assets/about-hero.jpg";
import handloom from "@/assets/handloom.jpg";
import fabricTexture from "@/assets/fabric-texture.jpg";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="About Impeller Fabrics" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-secondary mb-4 font-body">Our Story</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground tracking-wide">About Us</h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding max-w-5xl mx-auto">
        <SectionHeading subtitle="Heritage" title="Three Decades of Excellence" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal">
          <div className="space-y-6">
            <p className="text-muted-foreground font-body leading-relaxed">
              IMPELLER FABRICS has built three decades of expertise in textile weaving and garment manufacturing, evolving from handloom traditions to modern production technology.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Our journey began with traditional handlooms and has grown to encompass powerlooms and autolooms, always adapting to the latest fashion trends while preserving the artisan spirit.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              PROPULSION represents the next generation of fashion by combining heritage craftsmanship with contemporary clothing styles, serving men, women, boys, and girls with garments that celebrate Indian textile culture.
            </p>
          </div>
          <img src={handloom} alt="Traditional handloom weaving" className="w-full h-96 object-cover" />
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-card">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal">
          <img src={fabricTexture} alt="Premium fabric" className="w-full h-96 object-cover" />
          <div>
            <SectionHeading subtitle="Vision" title="The PROPULSION Brand" align="left" />
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Launched 5 years ago as a Mariner brand of IMPELLER FABRICS, PROPULSION embodies our commitment to bringing together traditional craftsmanship and modern fashion manufacturing.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              We specialize in manufacturing garments that combine traditional Indian clothing culture with modern fashion trends, creating pieces that are both timeless and contemporary.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
