import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="Delivery"
                    title="Shipping Policy"
                    description="Information about our shipping methods, timelines, and costs."
                />

                <div className="mt-12 prose prose-slate max-w-none font-body text-muted-foreground leading-relaxed space-y-8">
                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">1. Shipping Domestic</h2>
                        <p>
                            We provide shipping across India. Orders are typically processed within 2-3 business days. Delivery times vary by location, typically taking 5-7 business days from the date of dispatch.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">2. Shipping Rates</h2>
                        <p>
                            Shipping charges for your order will be calculated and displayed at checkout. We often offer free shipping on orders above a certain value, which will be highlighted on our homepage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">3. Shipment Confirmation & Tracking</h2>
                        <p>
                            You will receive a shipment confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">4. Customs, Duties, and Taxes</h2>
                        <p>
                            Impeller Fabrics is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">5. Damages</h2>
                        <p>
                            Impeller Fabrics is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">6. International Shipping</h2>
                        <p>
                            We currently ship primarily within India. For international inquiries, please contact us via the contact form or email, and we will evaluate shipping possibilities to your specific location.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShippingPolicy;
