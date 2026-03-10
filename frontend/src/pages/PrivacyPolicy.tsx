import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="Privacy"
                    title="Privacy Policy"
                    description="Your privacy is important to us. This policy outlines how we handle your personal information."
                />

                <div className="mt-12 prose prose-slate max-w-none font-body text-muted-foreground leading-relaxed space-y-8">
                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, or phone number.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>Any of the information we collect from you may be used in one of the following ways:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
                            <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
                            <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
                            <li>To process transactions</li>
                            <li>To send periodic emails</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">3. Data Security</h2>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We use encrypted gateways for transactions and do not store sensitive payment information on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">4. Cookies</h2>
                        <p>
                            Yes, we use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and keep track of advertisements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">5. Third-Party Disclosure</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">6. Consent</h2>
                        <p>By using our site, you consent to our website's privacy policy.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">7. Contacting Us</h2>
                        <p>
                            If there are any questions regarding this privacy policy, you may contact us using the information on our Contact page.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
