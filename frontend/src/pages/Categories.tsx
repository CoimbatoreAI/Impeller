import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Subcategory {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  subcategories?: Subcategory[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const catData = await catRes.json();

        // Fetch subcategories for each category
        const categoriesWithSubs = await Promise.all(
          catData.map(async (cat: any) => {
            const subRes = await fetch(`${import.meta.env.VITE_API_URL}/subcategories/category/${cat._id}`);
            const subData = await subRes.json();
            return { ...cat, subcategories: subData };
          })
        );

        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Collections"
          title="Browse Categories"
          description="Explore our complete range of garments for the entire family."
        />

        <div className="space-y-32">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="space-y-6">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-0.5 w-12 bg-secondary" />
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </div>
            ))
          ) : categories.length > 0 ? (
            categories.map((cat, index) => (
              <div
                key={cat._id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="image-overlay aspect-[4/3] rounded-sm overflow-hidden bg-slate-100">
                    {cat.image ? (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cat.image}`}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon className="h-12 w-12 text-slate-300" /></div>
                    )}
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="font-heading text-4xl tracking-wide text-foreground mb-4 uppercase">{cat.name}</h3>
                  <div className="w-12 h-0.5 bg-secondary mb-8" />
                  <p className="text-muted-foreground font-body mb-8 leading-relaxed max-w-md">
                    {cat.description || `Discover our exclusive ${cat.name} collection featuring premium fabrics and timeless designs.`}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                      cat.subcategories.map((sub) => (
                        <Link
                          key={sub._id}
                          to={`/products?category=${cat.name}&subcategory=${sub.name}`}
                          className="flex items-center justify-between py-4 border-b border-border group hover:border-secondary transition-all"
                        >
                          <span className="font-body text-foreground group-hover:text-secondary group-hover:pl-2 transition-all tracking-wide flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-50" />
                            {sub.name}
                          </span>
                          <ArrowRight className="h-4 w-4 text-secondary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </Link>
                      ))
                    ) : (
                      <div className="py-4 text-muted-foreground text-sm font-body italic">Stay tuned for new arrivals.</div>
                    )}
                  </div>

                  <div className="mt-12">
                    <Link
                      to="/products"
                      className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-body font-medium hover:bg-primary/90 transition-all shadow-sm"
                    >
                      View All {cat.name}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground italic">No collections available at the moment.</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
