import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            login(data.token, data.user);
            toast.success('Login successful!');
            navigate('/');
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
                        <CardTitle className="text-3xl font-heading text-center tracking-tight">Welcome Back</CardTitle>
                        <p className="text-sm text-center text-muted-foreground font-body">Enter your email to sign in to your account</p>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
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
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
                                    <Link to="/forgot-password" stroke-width="2" className="text-xs text-secondary hover:underline font-medium">Forgot password?</Link>
                                </div>
                                <Input
                                    type="password"
                                    className="h-12 bg-slate-50 focus-visible:ring-secondary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-4">
                            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-sm tracking-widest uppercase font-medium transition-all" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground font-body">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-secondary font-semibold hover:underline">Create account</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
