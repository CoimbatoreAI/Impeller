import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User as UserIcon, LogOut, ChevronDown, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "PRODUCTS", path: "/products" },
  { label: "CATEGORIES", path: "/categories" },
  { label: "MANUFACTURING", path: "/manufacturing" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Left: Mobile (Hamburg & Search) / Desktop (Logo) */}
          <div className="flex items-center gap-1 lg:w-[300px] flex-1 lg:flex-none">
            {/* Mobile Only Icons */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <button className="text-foreground p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Desktop Only Logo */}
            <div className="hidden lg:flex items-center">
              <Link to="/" className="flex items-center group">
                <img src="/logo.png" alt="Impeller Logo" className="h-16 w-auto object-contain group-hover:opacity-80 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Center: Mobile (Logo) / Desktop (Nav Links) */}
          <div className="flex-1 flex justify-center">
            {/* Mobile Only Logo */}
            <Link to="/" className="lg:hidden flex items-center">
              <img src="/logo.png" alt="Impeller Logo" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Only Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] tracking-[0.25em] font-heading font-bold transition-all duration-300 hover:text-secondary group relative py-2 ${location.pathname === link.path ? "text-secondary" : "text-foreground/60"
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-secondary transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-center ${location.pathname === link.path ? "scale-x-100" : ""
                    }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Actions (Cart & Login) - Both but Login switches to icon on mobile */}
          <div className="flex items-center justify-end gap-1 md:gap-6 flex-1 lg:w-[300px] lg:flex-none">
            {/* Desktop Search Only */}
            <button className="hidden lg:flex p-2 text-foreground/80 hover:text-secondary transition-all rounded-full hover:bg-slate-100">
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-foreground/80 hover:text-secondary transition-all rounded-full hover:bg-black/5 group">
              <ShoppingCart size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Access */}
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 text-foreground/80 hover:text-secondary transition-all outline-none">
                      <div className="bg-slate-100 p-2 rounded-full group-hover:bg-secondary/10 transition-colors">
                        <UserIcon size={18} strokeWidth={1.5} />
                      </div>
                      <ChevronDown size={14} className="opacity-30 hidden md:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-3 border-border shadow-xl bg-white backdrop-blur-lg">
                    <DropdownMenuLabel className="font-heading font-semibold text-slate-800 py-3 px-4">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer font-body text-[11px] tracking-widest py-3 px-4 uppercase" asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-body text-[11px] tracking-widest py-3 px-4 uppercase" asChild>
                      <Link to="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-body text-[11px] tracking-widest py-3 px-4 uppercase" asChild>
                      <Link to="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-600 font-bold font-body text-[11px] tracking-widest py-3 px-4 uppercase">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  {/* Desktop Button */}
                  <Button variant="outline" className="hidden lg:flex h-10 px-6 border-border/50 text-[10px] tracking-[0.2em] font-heading font-medium hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all uppercase rounded-none">
                    Sign In
                  </Button>
                  {/* Mobile Icon */}
                  <div className="lg:hidden p-2 text-foreground/80 hover:text-secondary transition-colors transition-transform active:scale-95">
                    <UserIcon size={20} strokeWidth={1.5} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - White Background for visibility */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)} />
        <div className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <img src="/logo.png" alt="Impeller" className="h-10 w-auto" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground/40 hover:text-foreground hover:bg-black/5 rounded-full transition-all"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xs tracking-[0.3em] font-heading font-bold transition-colors ${location.pathname === link.path ? "text-secondary" : "text-foreground/70 hover:text-secondary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-border mt-auto space-y-6">
              {user ? (
                <>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-heading">{user.email}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-[10px] tracking-widest uppercase font-bold text-foreground/60 hover:text-secondary transition-colors">Account</Link>
                    <Link to="/orders" onClick={() => setIsOpen(false)} className="text-[10px] tracking-widest uppercase font-bold text-foreground/60 hover:text-secondary transition-colors">Orders</Link>
                  </div>
                  <Button onClick={() => { logout(); setIsOpen(false); }} variant="outline" className="w-full text-red-500 border-red-100 h-12 text-[10px] tracking-widest uppercase hover:bg-red-50 hover:border-red-200">Logout</Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground h-14 text-[10px] tracking-widest uppercase font-heading hover:bg-primary/90 transition-all">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
