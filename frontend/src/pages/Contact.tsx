import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", inquiry: "general" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "", inquiry: "general" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 section-padding max-w-6xl mx-auto">
        <SectionHeading subtitle="Get in Touch" title="Contact Us" description="We'd love to hear from you. Reach out for business, wholesale, or retail partnership inquiries." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="font-heading text-xl tracking-wide text-foreground mb-6">IMPELLER FABRICS</h3>
              <p className="text-xs tracking-[0.2em] uppercase text-secondary font-body mb-8">Brand: PROPULSION</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Email</p>
                    <p className="font-body text-foreground">impellerfabrics@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Phone</p>
                    <p className="font-body text-foreground">+91 93602 93967</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Location</p>
                    <p className="font-body text-foreground">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm tracking-[0.2em] text-foreground mb-4">INQUIRY TYPES</h4>
              <div className="space-y-3">
                {["Business Inquiry", "Wholesale Inquiry", "Retail Partnership"].map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="font-body text-muted-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-2">Inquiry Type</label>
              <select
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-secondary transition-colors"
              >
                <option value="general">General Inquiry</option>
                <option value="business">Business Inquiry</option>
                <option value="wholesale">Wholesale Inquiry</option>
                <option value="retail">Retail Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-body font-medium hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
