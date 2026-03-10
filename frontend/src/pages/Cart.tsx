import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft, CreditCard } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { toast } from "sonner";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();
    const [couponCode, setCouponCode] = React.useState("");
    const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; discount: number } | null>(null);
    const [validating, setValidating] = React.useState(false);
    useScrollReveal();

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setValidating(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/coupons/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode, cartTotal: total })
            });
            const data = await res.json();
            if (res.ok) {
                setAppliedCoupon({ code: data.code, discount: data.discount });
                toast.success("Offer code applied successfully!");
            } else {
                toast.error(data.message || "Invalid offer code");
            }
        } catch (error) {
            toast.error("Failed to validate offer code");
        } finally {
            setValidating(false);
        }
    };

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col pt-32">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center reveal">
                    <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mb-8 border-2 border-dashed border-slate-200">
                        <ShoppingBag size={48} className="text-slate-300" />
                    </div>
                    <h2 className="text-3xl font-heading uppercase tracking-wide mb-4">Your Bag is Empty</h2>
                    <p className="text-muted-foreground font-body max-w-sm mb-12 leading-relaxed">
                        It looks like you haven't added any premium selections to your cart yet. Discover our latest collections.
                    </p>
                    <Link
                        to="/products"
                        className="px-12 py-5 bg-primary text-primary-foreground text-xs font-bold tracking-[0.4em] uppercase hover:bg-primary/90 transition-all rounded-full shadow-lg hover:shadow-primary/20 scale-100 active:scale-95"
                    >
                        Explore Collection
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-32">
            <Navbar />

            <main className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-12">
                        <div className="flex items-center justify-between border-b border-border pb-8 reveal">
                            <h1 className="text-4xl font-heading tracking-tight font-medium uppercase">Shopping Bag</h1>
                            <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20 font-body">
                                {itemCount} {itemCount === 1 ? "Item" : "Items"}
                            </span>
                        </div>

                        <div className="space-y-10 reveal">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-8 group pb-10 border-b border-slate-50">
                                    <div className="h-40 w-32 bg-slate-100 overflow-hidden rounded-sm border border-slate-100 flex-shrink-0 relative">
                                        {item.image ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBag size={24} /></div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <span className="text-[10px] tracking-[0.3em] uppercase text-secondary font-bold font-body">{item.category} / {item.subcategory}</span>
                                                <h3 className="text-xl font-heading uppercase tracking-wide leading-tight">{item.name}</h3>
                                            </div>
                                            <p className="text-xl font-body font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>

                                        <p className="text-xs text-muted-foreground font-body">Unit Price: ₹{item.price.toLocaleString()}</p>

                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden h-10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-4 hover:bg-white transition-colors h-full flex items-center"
                                                >
                                                    <Minus size={14} className="text-slate-500" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold h-full flex items-center justify-center border-x border-slate-100">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-4 hover:bg-white transition-colors h-full flex items-center"
                                                >
                                                    <Plus size={14} className="text-slate-500" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs tracking-[0.3em] uppercase text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 group/trash font-bold"
                                            >
                                                <Trash2 size={14} className="group-hover/trash:scale-110 transition-transform" />
                                                <span className="hidden sm:inline">Delete Selection</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/products"
                            className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-muted-foreground hover:text-secondary transition-all font-bold group pt-8"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                            Continue Selection
                        </Link>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:w-96">
                        <div className="bg-slate-50 rounded-sm border border-slate-100 p-10 space-y-10 sticky top-40 reveal">
                            <h2 className="text-2xl font-heading uppercase tracking-wide border-b border-slate-200 pb-6">Summary</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between text-sm tracking-widest text-slate-500 uppercase font-body">
                                    <span>Bag Total</span>
                                    <span className="text-primary font-bold">₹{total.toLocaleString()}</span>
                                </div>

                                {/* Offer Code Section */}
                                <div className="py-2">
                                    {!appliedCoupon ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                placeholder="OFFER CODE"
                                                className="flex-1 bg-white border border-slate-200 px-4 py-2 text-[10px] tracking-widest uppercase focus:outline-none focus:border-secondary"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={validating}
                                                className="bg-secondary text-secondary-foreground px-4 py-2 text-[10px] tracking-widest uppercase font-bold hover:bg-secondary/90 disabled:opacity-50 transition-all font-heading"
                                            >
                                                {validating ? "..." : "Apply"}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center bg-green-50 border border-green-100 p-3 rounded-sm">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-green-700 tracking-widest uppercase">{appliedCoupon.code} APPLIED</span>
                                                <span className="text-[9px] text-green-600 font-body uppercase">Extra discount applied</span>
                                            </div>
                                            <button
                                                onClick={() => setAppliedCoupon(null)}
                                                className="text-[10px] text-red-400 hover:text-red-600 underline tracking-tighter"
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {appliedCoupon && (
                                    <div className="flex justify-between text-sm tracking-widest text-green-600 uppercase font-bold font-body">
                                        <span>Discount</span>
                                        <span>- ₹{appliedCoupon.discount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm tracking-widest text-slate-500 uppercase font-body">
                                    <span>Logistics</span>
                                    <span className="text-secondary font-bold">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-sm tracking-widest text-slate-500 uppercase font-body">
                                    <span>Taxes (Included)</span>
                                    <span>₹0</span>
                                </div>
                                <div className="h-px bg-slate-200 w-full" />
                                <div className="flex justify-between text-xl font-heading uppercase tracking-widest pt-2">
                                    <span>Total Payable</span>
                                    <span className="text-primary font-bold">₹{(total - (appliedCoupon?.discount || 0)).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10">
                                <Link to="/checkout" className="w-full">
                                    <Button className="w-full h-16 bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] tracking-[0.4em] uppercase font-bold rounded-sm gap-3 transition-all shadow-xl hover:shadow-primary/20 scale-100 active:scale-95 group">
                                        Secure Checkout <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                                <div className="flex items-center justify-center gap-6 py-4 opacity-50">
                                    <CreditCard size={20} />
                                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Visa / UPI / Bank</span>
                                </div>
                            </div>

                            <div className="bg-white/60 p-6 rounded-sm border border-slate-200/50 space-y-4">
                                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-800">The Impeller Promise</p>
                                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                                    Every selection from Impeller Fabrics is quality-checked and meticulously packed to ensure your premium garments arrive in perfect condition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
