import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-fabric.jpg";
import fabricTexture from "@/assets/fabric-texture.jpg";
import powerloom from "@/assets/powerloom.jpg";
import handloom from "@/assets/handloom.jpg";
import autoloom from "@/assets/autoloom.jpg";
import stitching from "@/assets/stitching.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  categoryId: { _id: string; name: string };
}

interface Category {
  _id: string;
  name: string;
  image?: string;
}

const stats = [
  { number: "30+", label: "Years Textile Experience" },
  { number: "5", label: "Years PROPULSION Brand" },
  { number: "100+", label: "Garment Designs" },
  { number: "1000+", label: "Happy Clients" },
];

const processes = [
  { name: "Handloom", image: handloom },
  { name: "Powerloom", image: powerloom },
  { name: "Autoloom", image: autoloom },
  { name: "Garment Stitching", image: stitching },
];

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/products`),
          fetch(`${import.meta.env.VITE_API_URL}/categories`)
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData.slice(0, 3)); // Only show 3 featured products
        setCategories(catData.slice(0, 4)); // Show top 4 categories
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium fabric craftsmanship" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-secondary mb-6 font-body animate-fade-in">
            Crafted by Tradition · Designed for Tomorrow
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground tracking-wide mb-6 animate-fade-up">
            PROPULSION
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-secondary/80 mb-8 font-body">
            by Impeller Fabrics
          </p>
          <p className="text-primary-foreground/80 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            30 years of textile expertise blending traditional weaving and modern fashion manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-block px-10 py-4 bg-secondary text-secondary-foreground text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-secondary/90 transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              to="/categories"
              className="inline-block px-10 py-4 border border-primary-foreground/40 text-primary-foreground text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="section-padding max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Our Legacy"
          title="The Story of Impeller Fabrics"
          description="IMPELLER FABRICS has over three decades of experience in textile manufacturing, working with handlooms, powerlooms, and autolooms."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8 reveal">
          <div className="space-y-6">
            <p className="text-muted-foreground font-body leading-relaxed">
              PROPULSION represents the modern evolution of our textile legacy, delivering garments that suit current trends while respecting traditional craftsmanship.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              As a Mariner brand of IMPELLER FABRICS, launched 5 years ago, PROPULSION brings together the finest of traditional Indian clothing culture with contemporary fashion sensibilities.
            </p>
            <Link to="/about" className="inline-block text-xs tracking-[0.2em] uppercase text-secondary font-body font-medium border-b border-secondary pb-1 hover:text-secondary/80 transition-colors">
              Read Our Story
            </Link>
          </div>
          <div className="image-overlay">
            <img src={fabricTexture} alt="Premium fabric texture" className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Collections" title="Shop by Category" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 reveal">
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)
            ) : categories.length > 0 ? (
              categories.map((cat) => (
                <Link to={`/products?category=${cat.name}`} key={cat._id} className="group hover-lift">
                  <div className="image-overlay aspect-[3/4] bg-slate-100 overflow-hidden">
                    {cat.image ? (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cat.image}`}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-heading text-lg tracking-wide text-foreground">{cat.name}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-muted-foreground italic">Add categories in admin dashboard to see them here.</div>
            )}
          </div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section className="section-padding max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Craftsmanship"
          title="Our Manufacturing"
          description="We combine traditional weaving techniques with modern garment manufacturing to create garments that balance comfort, durability, and contemporary style."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 reveal">
          {processes.map((process) => (
            <div key={process.name} className="group">
              <div className="image-overlay aspect-square">
                <img src={process.image} alt={process.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 text-center font-heading text-sm tracking-[0.15em] text-foreground">{process.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Featured" title="Our Products" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group hover-lift bg-background reveal block"
                >
                  <div className="image-overlay aspect-[3/4]">
                    {product.mainImage ? (
                      <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${product.mainImage}`} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center"><ImageIcon className="h-10 w-10 text-slate-300" /></div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-body">{product.categoryId?.name}</span>
                    <h3 className="font-heading text-lg tracking-wide text-foreground mt-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">{product.description}</p>
                    <p className="mt-4 font-body font-bold text-primary">₹{product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-muted-foreground italic">Featured products will appear here once added in admin.</div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fabric background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl md:text-5xl text-secondary mb-2">{stat.number}</p>
                <p className="text-xs tracking-[0.15em] uppercase text-primary-foreground/70 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-wide mb-4">
            Discover Fabric Excellence
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-muted-foreground font-body mb-10">
            Experience the finest in textile craftsmanship, where tradition meets modern design.
          </p>
          <Link
            to="/products"
            className="inline-block px-12 py-4 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary/90 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
