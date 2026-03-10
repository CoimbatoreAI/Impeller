import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, ShoppingBag, Plus, Filter, LayoutGrid } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  categoryId: { _id: string; name: string };
  subcategoryId: { _id: string; name: string };
}

interface Category {
  _id: string;
  name: string;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState(searchParams.get("category") || "All");
  const [activeSubFilter, setActiveSubFilter] = useState(searchParams.get("subcategory") || "All");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useScrollReveal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/products`),
          fetch(`${import.meta.env.VITE_API_URL}/categories`)
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params: any = {};
    if (activeFilter !== "All") params.category = activeFilter;
    if (activeSubFilter !== "All") params.subcategory = activeSubFilter;
    setSearchParams(params);
  }, [activeFilter, activeSubFilter]);

  const filtered = products.filter((p) => {
    const catMatch = activeFilter === "All" || p.categoryId?.name === activeFilter;
    const subMatch = activeSubFilter === "All" || p.subcategoryId?.name === activeSubFilter;
    return catMatch && subMatch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      quantity: 1,
      category: product.categoryId?.name,
      subcategory: product.subcategoryId?.name
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
          <div className="max-w-2xl">
            <span className="text-secondary tracking-[0.4em] uppercase text-[10px] font-bold mb-4 block">Our Collections</span>
            <h1 className="text-4xl lg:text-5xl font-heading uppercase tracking-tight leading-tight mb-6">Discovery Grid</h1>
            <p className="text-muted-foreground font-body text-sm lg:text-base leading-relaxed">
              Explore our meticulously curated selection of premium garments. From traditional silhouettes to contemporary essentials, each piece is a testament to the Impeller legacy of textile excellence.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400">
            <LayoutGrid size={16} />
            <span>{filtered.length} Items Found</span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-8 mb-16 reveal">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-slate-800 mb-4 px-2">
            <Filter size={14} className="text-secondary" />
            Architected Filters
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setActiveFilter("All"); setActiveSubFilter("All"); }}
              className={`px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-bold transition-all border rounded-sm ${activeFilter === "All"
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
            >
              All Selections
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => { setActiveFilter(c.name); setActiveSubFilter("All"); }}
                className={`px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-bold transition-all border rounded-sm ${activeFilter === c.name
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-sm" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group reveal block bg-white border border-transparent hover:border-slate-100 transition-all duration-500 rounded-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                  {product.mainImage ? (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}${product.mainImage}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 opacity-50">
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">No Preview</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="absolute bottom-6 right-6 h-12 w-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    <Plus size={20} />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[8px] tracking-[0.2em] font-bold uppercase text-secondary border border-secondary/10 rounded-sm">
                      {product.categoryId?.name}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-heading text-sm uppercase tracking-wider text-foreground leading-tight group-hover:text-primary transition-colors h-10 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-body font-bold text-primary">₹{product.price.toLocaleString()}</p>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400">{product.subcategoryId?.name}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-40 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm">
              <ShoppingBag size={48} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-xl font-heading uppercase tracking-widest text-slate-400">No Selections Match This Filter</h3>
              <p className="text-xs text-muted-foreground font-body mt-4 tracking-[0.2em] uppercase cursor-pointer hover:text-secondary" onClick={() => { setActiveFilter("All"); setActiveSubFilter("All"); }}>Reset All Parameters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
