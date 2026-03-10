import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="Returns"
                    title="Refund & Returns Policy"
                    description="Our guidelines for returns, exchanges, and refund requests."
                />

                <div className="mt-12 prose prose-slate max-w-none font-body text-muted-foreground leading-relaxed space-y-8">
                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">1. Returns</h2>
                        <p>
                            You have 15 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">2. Non-Returnable Items</h2>
                        <p>
                            Several types of goods are exempt from being returned. Custom-made products or altered garments cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">3. Refunds</h2>
                        <p>
                            Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
                        </p>
                        <p className="mt-4">
                            If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">4. Shipping for Returns</h2>
                        <p>
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">5. Exchanges</h2>
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at impellerfabrics@gmail.com and send your item to our physical address provided in the contact section.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions on how to return your item to us, contact us at impellerfabrics@gmail.com.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
