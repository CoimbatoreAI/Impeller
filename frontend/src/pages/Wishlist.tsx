import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Heart, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

interface Product {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
    categoryId: { name: string };
}

const Wishlist = () => {
    const { user, toggleWishlist } = useAuth();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!user || user.wishlist.length === 0) {
                setLoading(false);
                setProducts([]);
                return;
            }

            try {
                const results = await Promise.all(
                    user.wishlist.map(async (id) => {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
                        if (res.ok) return res.json();
                        return null;
                    })
                );
                setProducts(results.filter(p => p !== null));
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProducts();
    }, [user?.wishlist]);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.mainImage,
            quantity: 1,
            category: product.categoryId?.name
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionHeading
                    subtitle="Saved Items"
                    title="My Wishlist"
                    description="Keep track of your favorite fabrics and silhouettes."
                />

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse bg-slate-50 h-96 rounded-sm border border-slate-100" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {products.map((product) => (
                            <div key={product._id} className="group bg-white border border-border overflow-hidden rounded-sm transition-all hover:shadow-xl relative hover:-translate-y-1 duration-500">
                                <Link to={`/products/${product._id}`} className="block aspect-[3/4] overflow-hidden relative">
                                    <img
                                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${product.mainImage}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>

                                <button
                                    onClick={() => toggleWishlist(product._id)}
                                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-md hover:bg-white transition-colors border border-red-50"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="p-6">
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-secondary font-bold font-body">{product.categoryId?.name}</span>
                                    <Link to={`/products/${product._id}`}>
                                        <h4 className="font-heading text-sm mt-3 uppercase tracking-wide group-hover:text-primary transition-colors h-10 line-clamp-2">{product.name}</h4>
                                    </Link>
                                    <p className="text-base font-body font-bold text-primary mt-4">₹{product.price.toLocaleString()}</p>

                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full mt-6 bg-slate-900 hover:bg-primary text-white text-[10px] uppercase tracking-widest font-bold py-6 transition-all duration-300 rounded-px gap-2"
                                    >
                                        <ShoppingCart size={14} /> Add to Bag
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-20 py-32 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm max-w-2xl mx-auto flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                            <Heart className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="font-heading text-xl uppercase tracking-wider text-slate-800">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mt-4 font-body max-w-xs mx-auto">Explore our collection and save the items you love.</p>
                        <Link to="/products">
                            <Button className="mt-8 bg-primary hover:bg-primary/90 rounded-full px-8 py-6 uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-primary/20 group">
                                Start Exploring <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Wishlist;
