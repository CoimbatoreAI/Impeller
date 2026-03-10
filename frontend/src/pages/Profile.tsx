import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <SectionHeading
                    subtitle="Account"
                    title="My Profile"
                    description="Manage your account details and preferences."
                />
                <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-sm">
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                            <p className="text-lg font-body mt-1">{user?.email}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account Type</label>
                            <p className="text-lg font-body mt-1 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
