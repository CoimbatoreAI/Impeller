import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Orders = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="History"
                    title="My Orders"
                    description="View and track your previous purchases."
                />

                <div className="mt-20 py-32 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                        <ShoppingBag className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="font-heading text-xl uppercase tracking-wider text-slate-800">No orders yet</h3>
                    <p className="text-muted-foreground mt-4 font-body max-w-xs mx-auto">Start your design journey with our premium collection.</p>
                    <Link to="/products">
                        <Button className="mt-8 bg-primary hover:bg-primary/90 rounded-full px-8 py-6 uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-primary/20 group">
                            Explore Shop <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Orders;
