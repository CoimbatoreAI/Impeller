import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Info, Check, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    mainImage: string;
    categoryId: { _id: string; name: string };
    subcategoryId: { _id: string; name: string };
    stock: number;
}

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { user, toggleWishlist } = useAuth();

    useScrollReveal();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
                const data = await res.json();
                setProduct(data);
                if (data.mainImage) setActiveImage(data.mainImage);

                // Fetch related products (same category)
                const allRes = await fetch(`${import.meta.env.VITE_API_URL}/products`);
                const allData = await allRes.json();
                setRelatedProducts(allData.filter((p: Product) => p.categoryId?._id === data.categoryId?._id && p._id !== data._id).slice(0, 4));
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.mainImage || '',
            quantity: quantity,
            category: product.categoryId?.name,
            subcategory: product.subcategoryId?.name
        });
    };

    const nextImage = () => {
        if (!product?.images || product.images.length <= 1) return;
        const currentIndex = product.images.indexOf(activeImage);
        const nextIndex = (currentIndex + 1) % product.images.length;
        setActiveImage(product.images[nextIndex]);
    };

    const prevImage = () => {
        if (!product?.images || product.images.length <= 1) return;
        const currentIndex = product.images.indexOf(activeImage);
        const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        setActiveImage(product.images[prevIndex]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Skeleton className="aspect-[3/4] w-full rounded-sm" />
                        <div className="space-y-6">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Image Section */}
                    <div className="reveal space-y-6 sticky top-32">
                        <Link to="/products" className="inline-flex items-center text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground hover:text-secondary transition-colors mb-4 group font-bold">
                            <ChevronLeft className="h-3 w-3 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Collection
                        </Link>
                        <div className="aspect-[3/4] overflow-hidden bg-white border border-border shadow-sm rounded-sm group relative">
                            {activeImage ? (
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${activeImage}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                    <ImageIcon className="h-16 w-16 opacity-30" />
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20">
                                <span className="text-[10px] tracking-widest text-primary font-bold uppercase">{product.categoryId?.name}</span>
                            </div>

                            {/* Slider Navigation Arrows */}
                            {product.images && product.images.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between p-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.preventDefault(); prevImage(); }}
                                        className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all transform hover:-translate-x-1"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); nextImage(); }}
                                        className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all transform hover:translate-x-1"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}

                            {/* Image Counter (Mobile Friendly) */}
                            {product.images && product.images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest uppercase">
                                    {product.images.indexOf(activeImage) + 1} / {product.images.length}
                                </div>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-5 gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(img)}
                                        className={`aspect-square border-2 rounded-sm overflow-hidden transition-all duration-300 p-0.5 ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-slate-300'}`}
                                    >
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${img}`} className="w-full h-full object-cover rounded-px" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="reveal space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-secondary tracking-[0.3em] uppercase text-[10px] font-bold py-1 border-b-2 border-secondary/30">
                                    {product.subcategoryId?.name}
                                </span>
                                {product.stock > 0 ? (
                                    <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                                        <Check className="h-3 w-3" /> In Stock
                                    </span>
                                ) : (
                                    <span className="text-[10px] tracking-widest uppercase font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                                )}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-heading tracking-tight text-foreground leading-tight uppercase font-medium">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-body font-bold text-primary flex items-center gap-2">
                                ₹{product.price.toLocaleString()}
                                <span className="text-sm text-muted-foreground font-normal line-through opacity-50">₹{(product.price * 1.2).toLocaleString()}</span>
                            </p>
                        </div>

                        <div className="space-y-6 border-y border-border py-10">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center border border-border rounded-full overflow-hidden h-14 bg-slate-50 shadow-inner">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="px-5 hover:bg-white transition-colors h-full flex items-center justify-center text-slate-500"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-heading font-bold h-full flex items-center justify-center text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="px-5 hover:bg-white transition-colors h-full flex items-center justify-center text-slate-500"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-[0.3em] rounded-full scale-100 active:scale-95 transition-all shadow-lg hover:shadow-primary/20 gap-3 font-bold"
                                >
                                    <ShoppingCart className="h-4 w-4" /> Add to Shopping Bag
                                </Button>
                                <Button
                                    onClick={() => toggleWishlist(product._id)}
                                    variant="outline"
                                    className={`h-14 w-14 rounded-full border-border hover:bg-slate-50 transition-all ${user?.wishlist?.includes(product._id) ? 'bg-red-50 text-red-500 border-red-100' : ''}`}
                                >
                                    <Heart className={`h-5 w-5 ${user?.wishlist?.includes(product._id) ? 'fill-current' : ''}`} />
                                </Button>
                            </div>
                            <div className="flex items-center justify-center gap-4 text-xs font-body text-slate-500 pt-4">
                                <span className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5" /> Secure Payment</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5" /> Quality Guaranteed</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5" /> Ethically Crafted</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-heading text-sm tracking-[0.2em] uppercase font-bold text-slate-800">Product Narrative</h3>
                            <p className="text-muted-foreground leading-relaxed font-body text-base lg:text-lg">
                                {product.description || "Indulge in the luxury of traditional craftsmanship. Each piece from our collection is meticulously woven using time-honored techniques, resulting in a unique fabric that balances classic aesthetics with contemporary comfort. Experience the texture, weight, and breathability of authentic Impeller textiles."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                            <div className="group">
                                <h4 className="font-heading text-[10px] tracking-[0.3em] uppercase text-secondary mb-3 font-bold">The Material</h4>
                                <p className="text-sm text-slate-600 font-body leading-relaxed group-hover:text-foreground transition-colors">100% Premium long-staple cotton, ethically sourced and hand-selected for its soft hand-feel and durability.</p>
                            </div>
                            <div className="group">
                                <h4 className="font-heading text-[10px] tracking-[0.3em] uppercase text-secondary mb-3 font-bold">Maintenance</h4>
                                <p className="text-sm text-slate-600 font-body leading-relaxed group-hover:text-foreground transition-colors">Preserve the integrity of the weave with a delicate cold wash. Dry clean recommended for festive silhouettes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Section */}
                <section className="mt-40">
                    <div className="flex flex-col items-center mb-16 text-center space-y-4">
                        <span className="text-secondary tracking-[0.4em] uppercase text-[10px] font-bold">Curated Selection</span>
                        <h2 className="text-3xl lg:text-4xl font-heading uppercase tracking-wide">Complete the Collection</h2>
                        <div className="h-0.5 bg-secondary w-16 mt-4" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map((p) => (
                                <Link key={p._id} to={`/products/${p._id}`} className="reveal group bg-white transition-all duration-700 hover:-translate-y-2 border border-transparent hover:border-slate-100 hover:shadow-2xl overflow-hidden rounded-sm">
                                    <div className="aspect-[3/4] overflow-hidden relative">
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${p.mainImage}`} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-secondary font-bold font-body">{p.categoryId?.name}</span>
                                        <h4 className="font-heading text-sm mt-3 uppercase tracking-wide group-hover:text-primary transition-colors h-10 line-clamp-2">{p.name}</h4>
                                        <p className="text-base font-body font-bold text-primary mt-4">₹{p.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm">
                                <p className="text-muted-foreground italic font-body text-sm tracking-widest uppercase">The rest of this narrative is yours to write.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
