import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
    subcategory?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, token, updateLocalCart } = useAuth();
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('impeller_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const isInitialMount = useRef(true);

    // Initial sync when user logs in
    useEffect(() => {
        if (user && user.cart && user.cart.length > 0) {
            const fetchBackendCart = async () => {
                try {
                    const items = await Promise.all(user.cart.map(async (cItem): Promise<CartItem | null> => {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${cItem.productId}`);
                        if (res.ok) {
                            const product = await res.json();
                            return {
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.mainImage,
                                quantity: cItem.quantity,
                                category: product.categoryId?.name
                            };
                        }
                        return null;
                    }));

                    const validItems = items.filter((item): item is CartItem => item !== null);

                    // Merge local cart with backend cart
                    setCart(prev => {
                        const newCart = [...prev];
                        validItems.forEach(vItem => {
                            const existing = newCart.find(ni => ni.id === vItem.id);
                            if (existing) {
                                existing.quantity = Math.max(existing.quantity, vItem.quantity);
                            } else {
                                newCart.push(vItem);
                            }
                        });
                        return newCart;
                    });
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            };
            fetchBackendCart();
        }
    }, [user?.id]); // Only run when user ID changes (login)

    // Sync to local storage and backend
    useEffect(() => {
        localStorage.setItem('impeller_cart', JSON.stringify(cart));

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (user && token) {
            const backendCart = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            fetch(`${import.meta.env.VITE_API_URL}/auth/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart: backendCart })
            }).then(res => {
                if (res.ok) return res.json();
            }).then(data => {
                if (data) updateLocalCart(data.cart);
            }).catch(err => console.error("Error syncing cart:", err));
        }
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                toast.info(`Increased ${item.name} quantity`);
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            toast.success(`Added ${item.name} to cart`);
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
        toast.info("Removed from cart");
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

