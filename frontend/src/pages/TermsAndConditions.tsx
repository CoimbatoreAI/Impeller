import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="Conditions"
                    title="Terms & Conditions"
                    description="The rules and guidelines for using the Impeller Fabrics website and services."
                />

                <div className="mt-12 prose prose-slate max-w-none font-body text-muted-foreground leading-relaxed space-y-8">
                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">1. Agreement to Terms</h2>
                        <p>
                            By accesssing the website at Impeller Fabrics, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Impeller Fabrics' website for personal, non-commercial transitory viewing only.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                            <li>Attempt to decompile or reverse engineer any software contained on Impeller Fabrics' website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on Impeller Fabrics' website are provided on an 'as is' basis. Impeller Fabrics makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">4. Limitations</h2>
                        <p>
                            In no event shall Impeller Fabrics or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Impeller Fabrics' website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">5. Accuracy of Materials</h2>
                        <p>
                            The materials appearing on Impeller Fabrics' website could include technical, typographical, or photographic errors. Impeller Fabrics does not warrant that any of the materials on its website are accurate, complete or current. Impeller Fabrics may make changes to the materials contained on its website at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">6. Links</h2>
                        <p>
                            Impeller Fabrics has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Impeller Fabrics of the site. Use of any such linked website is at the user's own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-foreground tracking-wide mt-8 mb-4">7. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
