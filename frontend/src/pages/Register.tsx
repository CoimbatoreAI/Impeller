import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex items-center justify-center pt-40 pb-20 px-6">
                <Card className="w-full max-w-[450px] shadow-xl border-none ring-1 ring-slate-200">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-3xl font-heading text-center tracking-tight">Create Account</CardTitle>
                        <p className="text-sm text-center text-muted-foreground font-body">Enter your details to join Impeller Fabrics</p>
                    </CardHeader>
                    <form onSubmit={handleRegister}>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="h-12 bg-slate-50 focus-visible:ring-secondary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                                <Input
                                    type="password"
                                    className="h-12 bg-slate-50 focus-visible:ring-secondary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Confirm Password</label>
                                <Input
                                    type="password"
                                    className="h-12 bg-slate-50 focus-visible:ring-secondary"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-4">
                            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-sm tracking-widest uppercase font-medium transition-all" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground font-body">
                                Already have an account?{' '}
                                <Link to="/login" className="text-secondary font-semibold hover:underline">Sign in</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
