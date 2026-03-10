import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category?: string;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Visual Journey"
          title="Gallery"
          description="A glimpse into our world of textiles, craftsmanship, and fashion."
        />

        {loading ? (
          <div className="columns-2 md:columns-3 gap-6 space-y-6">
            {Array(9).fill(0).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-square rounded-sm" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-6 space-y-6 reveal">
            {items.map((item) => (
              <div key={item._id} className="break-inside-avoid group relative overflow-hidden rounded-sm border border-border shadow-sm bg-white">
                <div className="image-overlay">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image}`}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Caption on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-secondary mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
                  <h3 className="text-white font-heading text-lg uppercase tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-200 mb-6" />
            <p className="text-muted-foreground italic tracking-widest uppercase text-xs">Our visual archives are currently being curated.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
