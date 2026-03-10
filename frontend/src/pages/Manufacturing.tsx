import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import handloom from "@/assets/handloom.jpg";
import powerloom from "@/assets/powerloom.jpg";
import autoloom from "@/assets/autoloom.jpg";
import stitching from "@/assets/stitching.jpg";

const processes = [
  {
    name: "Handloom Weaving",
    image: handloom,
    description: "Our artisans carry forward centuries-old handloom traditions, crafting fabrics with unparalleled texture and character that machines cannot replicate.",
  },
  {
    name: "Powerloom Production",
    image: powerloom,
    description: "Modern powerloom technology enables us to produce high-quality fabrics at scale while maintaining consistent weave patterns and durability.",
  },
  {
    name: "Autoloom Technology",
    image: autoloom,
    description: "State-of-the-art automatic looms deliver precision-engineered fabrics with complex patterns, combining efficiency with exquisite quality.",
  },
  {
    name: "Garment Stitching",
    image: stitching,
    description: "Expert tailors transform our premium fabrics into finished garments, ensuring impeccable stitching, fit, and finish in every piece.",
  },
];

const Manufacturing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src={handloom} alt="Manufacturing process" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-xs tracking-[0.4em] uppercase text-secondary mb-4 font-body">Craftsmanship</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground tracking-wide mb-6">Manufacturing</h1>
          <p className="text-primary-foreground/80 font-body leading-relaxed">
            We combine traditional weaving techniques with modern garment manufacturing to create garments that balance comfort, durability, and contemporary style.
          </p>
        </div>
      </section>

      {/* Processes */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="space-y-24">
          {processes.map((process, index) => (
            <div
              key={process.name}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="image-overlay">
                  <img src={process.image} alt={process.name} className="w-full h-[450px] object-cover" />
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <span className="text-xs tracking-[0.3em] uppercase text-secondary font-body">Step {index + 1}</span>
                <h3 className="font-heading text-2xl md:text-3xl tracking-wide text-foreground mt-2 mb-4">{process.name}</h3>
                <div className="w-12 h-0.5 bg-secondary mb-6" />
                <p className="text-muted-foreground font-body leading-relaxed">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manufacturing;
