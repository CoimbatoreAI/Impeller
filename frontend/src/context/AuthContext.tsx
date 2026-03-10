import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
    id: string;
    email: string;
    role: string;
    wishlist: string[];
    cart: { productId: string; quantity: number }[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    loading: boolean;
    updateLocalCart: (cart: { productId: string; quantity: number }[]) => void;
    updateLocalWishlist: (wishlist: string[]) => void;
    toggleWishlist: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('userToken');
        const savedUser = localStorage.getItem('userData');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));

            // Verify token and refresh user data
            fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${savedToken}` }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Session expired');
                })
                .then(data => {
                    setUser(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                })
                .catch(() => {
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token: string, userData: User) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        toast.info('Logged out successfully');
    };

    const updateLocalCart = (cart: { productId: string; quantity: number }[]) => {
        if (user) {
            const updatedUser = { ...user, cart };
            setUser(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
    };

    const updateLocalWishlist = (wishlist: string[]) => {
        if (user) {
            const updatedUser = { ...user, wishlist };
            setUser(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
    };

    const toggleWishlist = async (productId: string) => {
        if (!user || !token) {
            toast.error("Please login to use wishlist");
            return;
        }

        const isWishlisted = user.wishlist.includes(productId);
        const newWishlist = isWishlisted
            ? user.wishlist.filter(id => id !== productId)
            : [...user.wishlist, productId];

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/wishlist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ wishlist: newWishlist })
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
                toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
            }
        } catch (error) {
            toast.error("Failed to update wishlist");
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, updateLocalCart, updateLocalWishlist, toggleWishlist }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
