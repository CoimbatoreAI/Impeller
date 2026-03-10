import { Link } from "react-router-dom";
import { Instagram, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8">
          {/* Brand Section - Full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 lg:col-span-4">
            <img src="/logo.png" alt="Impeller Logo" className="h-14 md:h-16 w-auto mb-6 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-md font-body">
              Crafted by Tradition. Designed for Tomorrow. Three decades of textile excellence meeting modern fashion.
            </p>
            <div className="mt-8">
              <h4 className="font-heading text-[10px] tracking-[0.2em] text-secondary mb-4 uppercase font-bold">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/impeller_fabrics2023?igsh=M3lnMGhuOTFkMnVj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 group"
                >
                  <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigate Section - 1 col on mobile, 2 cols on desktop */}
          <div className="col-span-1 lg:col-span-2 lg:ml-auto">
            <h4 className="font-heading text-xs tracking-[0.2em] text-secondary mb-6 font-bold uppercase">NAVIGATE</h4>
            <div className="space-y-4">
              {["Home", "About", "Products", "Categories", "Manufacturing", "Gallery", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block text-xs text-primary-foreground/60 hover:text-secondary transition-colors font-body tracking-wider uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Policies Section - 1 col on mobile, 3 cols on desktop */}
          <div className="col-span-1 lg:col-span-3 lg:ml-auto">
            <h4 className="font-heading text-xs tracking-[0.2em] text-secondary mb-6 font-bold uppercase">POLICIES</h4>
            <div className="space-y-4">
              {[
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Shipping Policy", path: "/shipping-policy" },
                { label: "Terms & Conditions", path: "/terms-conditions" },
                { label: "Refund & Returns", path: "/refund-policy" }
              ].map((policy) => (
                <Link
                  key={policy.label}
                  to={policy.path}
                  className="block text-xs text-primary-foreground/60 hover:text-secondary transition-colors font-body tracking-wider uppercase"
                >
                  {policy.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section - Full width on mobile, 3 cols on desktop */}
          <div className="col-span-2 lg:col-span-3 lg:ml-auto">
            <h4 className="font-heading text-xs tracking-[0.2em] text-secondary mb-6 font-bold uppercase">CONTACT</h4>
            <div className="space-y-4 text-xs text-primary-foreground/60 font-body tracking-wider leading-relaxed">
              <p className="font-bold text-primary-foreground/90 uppercase">IMPELLER FABRICS</p>
              <p className="hover:text-secondary transition-colors cursor-pointer">impellerfabrics@gmail.com</p>
              <p className="hover:text-secondary transition-colors cursor-pointer">+91 93602 93967</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-widest text-primary-foreground/30 font-body uppercase text-center md:text-left">
            © {new Date().getFullYear()} PROPULSION by IMPELLER FABRICS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-6 bg-secondary/30" />
            <span className="text-[9px] tracking-[0.3em] text-secondary uppercase font-bold">Premium Textile Craftsmanship</span>
            <div className="h-[1px] w-6 bg-secondary/30" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
