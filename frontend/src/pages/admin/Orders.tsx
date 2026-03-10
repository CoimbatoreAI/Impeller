import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
    _id: string;
    orderNumber: string;
    customerDetails: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    totalAmount: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                toast.success('Status updated');
                fetchOrders();
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const deleteOrder = async (id: string) => {
        if (!window.confirm('Delete this order?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Order removed');
            fetchOrders();
        } catch (error) {
            toast.error('Error deleting order');
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return <Badge className={`${variants[status] || 'bg-slate-100 text-slate-800'} capitalize border-none`}>{status}</Badge>;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Orders</h1>
            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((o) => (
                            <TableRow key={o._id}>
                                <TableCell className="font-mono text-sm">{o.orderNumber}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{o.customerDetails.name}</div>
                                    <div className="text-xs text-slate-500">{o.customerDetails.phone}</div>
                                </TableCell>
                                <TableCell>₹{o.totalAmount}</TableCell>
                                <TableCell className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{getStatusBadge(o.status)}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2 items-center">
                                    <Select
                                        defaultValue={o.status}
                                        onValueChange={(val) => updateStatus(o._id, val)}
                                    >
                                        <SelectTrigger className="w-28 h-8 text-xs font-semibold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="delivered">Delivered</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="ghost" size="icon" onClick={() => deleteOrder(o._id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Orders;
