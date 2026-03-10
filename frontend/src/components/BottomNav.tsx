import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, ShoppingBag } from "lucide-react";

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { icon: <Home size={22} />, label: "Home", path: "/" },
        { icon: <Heart size={22} />, label: "Wishlist", path: "/wishlist" },
        { icon: <ShoppingBag size={22} />, label: "My Order", path: "/orders" },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border flex justify-around items-center h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${isActive ? "text-secondary" : "text-foreground/60"
                            }`}
                    >
                        <span className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                            {item.icon}
                        </span>
                        <span className="text-[10px] mt-1 font-body font-bold uppercase tracking-widest leading-none">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
};

export default BottomNav;
