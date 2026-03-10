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
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    categoryId: { _id: string; name: string };
    subcategoryId: { _id: string; name: string };
    stock: number;
    images: string[];
    mainImage?: string;
    isAvailable: boolean;
}

const ProductsAdmin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    // Form States
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        subcategoryId: '',
        stock: '0',
    });

    const [existingImages, setExistingImages] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const [prods, cats] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/products`).then(res => res.json()),
                fetch(`${import.meta.env.VITE_API_URL}/categories`).then(res => res.json())
            ]);
            setProducts(Array.isArray(prods) ? prods : []);
            setCategories(Array.isArray(cats) ? cats : []);
        } catch (error) {
            toast.error('Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchSubcats = async (catId: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/subcategories/category/${catId}`);
            const data = await res.json();
            setSubcategories(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to fetch subcategories');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (img: string) => {
        setExistingImages(prev => prev.filter(i => i !== img));
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', categoryId: '', subcategoryId: '', stock: '0' });
        setFiles([]);
        setPreviews([]);
        setExistingImages([]);
        setSubcategories([]);
        setCurrentProduct(null);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => data.append(key, val));
        files.forEach(file => data.append('images', file));

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data,
            });
            if (res.ok) {
                toast.success('Product added successfully');
                setIsAddOpen(false);
                resetForm();
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Failed to add product');
            }
        } catch (error) {
            toast.error('Error connecting to server');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProduct) return;

        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => data.append(key, val));
        existingImages.forEach(img => data.append('existingImages', img));
        files.forEach(file => data.append('images', file));

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${currentProduct._id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data,
            });
            if (res.ok) {
                toast.success('Product updated');
                setIsEditOpen(false);
                resetForm();
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.message || 'Update failed');
            }
        } catch (error) {
            toast.error('Error connecting to server');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Product deleted');
                fetchData();
            }
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const openEdit = (p: Product) => {
        setCurrentProduct(p);
        setFormData({
            name: p.name,
            description: p.description || '',
            price: p.price.toString(),
            categoryId: p.categoryId?._id || '',
            subcategoryId: p.subcategoryId?._id || '',
            stock: p.stock.toString(),
        });
        setExistingImages(p.images || []);
        if (p.categoryId?._id) fetchSubcats(p.categoryId._id);
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-6 py-4">
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-semibold">Product Name</label>
                                <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter product name" />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-semibold">Description</label>
                                <Textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Product details..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Price (₹)</label>
                                <Input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Stock Quantity</label>
                                <Input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Category</label>
                                <Select onValueChange={(val) => { setFormData({ ...formData, categoryId: val }); fetchSubcats(val); }}>
                                    <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Subcategory</label>
                                <Select onValueChange={(val) => setFormData({ ...formData, subcategoryId: val })}>
                                    <SelectTrigger><SelectValue placeholder="Select Subcategory" /></SelectTrigger>
                                    <SelectContent>
                                        {subcategories.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-semibold">Upload Images (Local Device)</label>
                                <Input type="file" multiple accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
                                <div className="grid grid-cols-5 gap-4 mt-4">
                                    {previews.map((url, i) => (
                                        <div key={i} className="relative group aspect-square border rounded overflow-hidden">
                                            <img src={url} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2 pt-4">
                                <Button type="submit" className="w-full h-12 text-lg">Create Product</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Product Details</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p._id}>
                                <TableCell>
                                    <div className="h-12 w-12 rounded-lg border overflow-hidden bg-slate-100">
                                        {p.mainImage ? (
                                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${p.mainImage}`} alt={p.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-5 w-5 text-slate-400" /></div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-bold">{p.name}</div>
                                    <div className="text-xs text-slate-500">{p.categoryId?.name} › {p.subcategoryId?.name}</div>
                                </TableCell>
                                <TableCell className="font-semibold text-blue-600">₹{p.price}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {p.stock} in stock
                                    </span>
                                </TableCell>
                                <TableCell className="text-right flex justify-end gap-2 py-4">
                                    <Button variant="outline" size="icon" onClick={() => openEdit(p)}>
                                        <Edit className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleDelete(p._id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) resetForm(); }}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
                    <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6 py-4">
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-semibold">Product Name</label>
                            <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-semibold">Description</label>
                            <Textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Price (₹)</label>
                            <Input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Stock Quantity</label>
                            <Input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Category</label>
                            <Select value={formData.categoryId} onValueChange={(val) => { setFormData({ ...formData, categoryId: val }); fetchSubcats(val); }}>
                                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Subcategory</label>
                            <Select value={formData.subcategoryId} onValueChange={(val) => setFormData({ ...formData, subcategoryId: val })}>
                                <SelectTrigger><SelectValue placeholder="Select Subcategory" /></SelectTrigger>
                                <SelectContent>
                                    {subcategories.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Existing Images */}
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-slate-500">Existing Images</label>
                            <div className="grid grid-cols-5 gap-4">
                                {existingImages.map((img, i) => (
                                    <div key={i} className="relative group aspect-square border rounded overflow-hidden">
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${img}`} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeExistingImage(img)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-semibold">Add More Images</label>
                            <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
                            <div className="grid grid-cols-5 gap-4 mt-4">
                                {previews.map((url, i) => (
                                    <div key={i} className="relative group aspect-square border rounded overflow-hidden bg-blue-50">
                                        <img src={url} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2 pt-4">
                            <Button type="submit" className="w-full h-12 text-lg">Update Product</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductsAdmin;
