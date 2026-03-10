import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowRight,
    ChevronLeft,
    ShoppingBag,
    User,
    MapPin,
    Phone,
    Mail
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Checkout = () => {
    const { cart, total, clearCart, itemCount } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useScrollReveal();

    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
        city: "",
        zipCode: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                ...formData,
                products: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: total,
                paymentStatus: 'Pending',
                status: 'Pending'
            };

            const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                toast.success("Order placed successfully!");
                clearCart();
                navigate("/");
            } else {
                const err = await res.json();
                toast.error(err.message || "Failed to place order");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col pt-32">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <ShoppingBag size={64} className="text-slate-200 mb-6" />
                    <h2 className="text-2xl font-heading mb-4">No selections to checkout</h2>
                    <Link to="/products">
                        <Button variant="outline" className="rounded-full px-8">Return to Collections</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-36 pb-20">
            <Navbar />

            <main className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="flex-1 space-y-12">
                        <div className="flex flex-col space-y-4 border-b border-border pb-10 reveal">
                            <Link to="/cart" className="inline-flex items-center text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground hover:text-secondary group transition-colors font-bold mb-4">
                                <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Review Bag
                            </Link>
                            <h1 className="text-4xl lg:text-5xl font-heading uppercase tracking-tight leading-tight">Secure Finalization</h1>
                            <p className="text-muted-foreground font-body text-sm font-medium tracking-wide">Enter your delivery details to complete your order.</p>
                        </div>

                        <form onSubmit={handleSubmit} id="checkout-form" className="space-y-12 reveal">
                            <section className="space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="h-8 w-8 bg-secondary/10 flex items-center justify-center rounded-full border border-secondary/20">
                                        <User size={16} className="text-secondary" />
                                    </div>
                                    <h2 className="text-xl font-heading uppercase tracking-widest text-slate-800">Identity Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Full Name</label>
                                        <Input
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                            className="h-14 bg-slate-50 border-slate-200 rounded-sm font-body px-6 shadow-sm focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Email Address</label>
                                        <Input
                                            type="email"
                                            name="customerEmail"
                                            value={formData.customerEmail}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john@example.com"
                                            className="h-14 bg-slate-50 border-slate-200 rounded-sm font-body px-6 shadow-sm focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 group md:col-span-2">
                                        <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Mobile Number</label>
                                        <div className="relative">
                                            <Phone size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                type="tel"
                                                name="customerPhone"
                                                value={formData.customerPhone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+91 99999 99999"
                                                className="h-14 bg-slate-50 border-slate-200 rounded-sm font-body pl-14 pr-6 shadow-sm focus:bg-white transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="h-8 w-8 bg-secondary/10 flex items-center justify-center rounded-full border border-secondary/20">
                                        <MapPin size={16} className="text-secondary" />
                                    </div>
                                    <h2 className="text-xl font-heading uppercase tracking-widest text-slate-800">Logistic Destination</h2>
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Shipping Address</label>
                                    <Textarea
                                        name="shippingAddress"
                                        value={formData.shippingAddress}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        placeholder="Complete street address, building, and landmark..."
                                        className="bg-slate-50 border-slate-200 rounded-sm font-body p-6 shadow-sm focus:bg-white transition-all text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Town / City</label>
                                        <Input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Coimbatore"
                                            className="h-14 bg-slate-50 border-slate-200 rounded-sm font-body px-6 shadow-sm focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase group-focus-within:text-secondary transition-colors">Postcode</label>
                                        <Input
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="641001"
                                            className="h-14 bg-slate-50 border-slate-200 rounded-sm font-body px-6 shadow-sm focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] font-bold tracking-[0.5em] uppercase rounded-sm shadow-2xl hover:shadow-primary/30 transition-all scale-100 active:scale-95 flex items-center justify-center gap-4 group"
                                >
                                    {loading ? (
                                        "Processing Transaction..."
                                    ) : (
                                        <>Finalize Order Selection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Desktop Review Section */}
                    <div className="lg:w-[450px]">
                        <div className="bg-slate-50 rounded-sm border border-slate-100 p-10 space-y-10 sticky top-40 reveal">
                            <h2 className="text-2xl font-heading uppercase tracking-widest border-b border-slate-200 pb-6 flex items-center justify-between">
                                Order Brief <span className="text-xs text-secondary font-bold font-body">₹{total.toLocaleString()}</span>
                            </h2>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 border-b border-slate-200/50 pb-6 last:border-0 group">
                                        <div className="h-24 w-16 bg-white border border-slate-100 rounded-sm overflow-hidden flex-shrink-0 relative">
                                            {item.image ? (
                                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={16} className="text-slate-200" /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <p className="text-[10px] tracking-[0.1em] text-secondary font-bold uppercase mb-1">{item.category}</p>
                                                <h4 className="text-xs font-heading font-medium uppercase tracking-wider line-clamp-2 h-8 leading-relaxed mb-1">{item.name}</h4>
                                                <p className="text-[10px] text-muted-foreground font-body">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-body font-bold text-primary self-end">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-secondary">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-lg font-heading tracking-widest uppercase py-4 border-t border-slate-200 mt-4">
                                    <span>Total Payable</span>
                                    <span className="text-primary font-bold">₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-white/80 p-6 rounded-sm border border-slate-200/50 space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="h-5 w-5 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                        <ShieldCheck size={14} />
                                    </div>
                                    <p className="text-[10px] tracking-widest uppercase font-bold text-slate-700 group-hover:text-primary transition-colors">100% Encrypted Transactions</p>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Truck size={14} />
                                    </div>
                                    <p className="text-[10px] tracking-widest uppercase font-bold text-slate-700 group-hover:text-primary transition-colors">Direct mariner-Fast Fulfillment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
