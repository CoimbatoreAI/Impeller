import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, ListTree, Package, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        categories: 0,
        subcategories: 0,
        products: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [cats, subs, prods, ords] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/categories`, { headers }).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/subcategories`, { headers }).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/products`, { headers }).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/orders`, { headers }).then(res => res.json())
                ]);

                setStats({
                    categories: Array.isArray(cats) ? cats.length : 0,
                    subcategories: Array.isArray(subs) ? subs.length : 0,
                    products: Array.isArray(prods) ? prods.length : 0,
                    orders: Array.isArray(ords) ? ords.length : 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Categories', value: stats.categories, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Total Subcategories', value: stats.subcategories, icon: ListTree, color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: 'Total Products', value: stats.products, icon: Package, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-100' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
