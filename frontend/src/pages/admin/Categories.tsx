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
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
    _id: string;
    name: string;
    description?: string;
    image?: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (file) data.append('image', file);

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data,
            });
            if (res.ok) {
                toast.success('Category added');
                setIsAddOpen(false);
                resetForm();
                fetchCategories();
            }
        } catch (error) {
            toast.error('Error adding category');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentCategory) return;
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (file) data.append('image', file);

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${currentCategory._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data,
            });
            if (res.ok) {
                toast.success('Category updated');
                setIsEditOpen(false);
                resetForm();
                fetchCategories();
            }
        } catch (error) {
            toast.error('Error updating category');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setFile(null);
        setPreview('');
        setCurrentCategory(null);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Category deleted');
                fetchCategories();
            }
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</label>
                                <Input
                                    placeholder="Category Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
                                <Textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category Image</label>
                                <Input type="file" accept="image/*" onChange={handleFileChange} />
                                {preview && (
                                    <div className="mt-2 aspect-video rounded-lg border overflow-hidden">
                                        <img src={preview} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full">Create Category</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat._id}>
                                <TableCell>
                                    <div className="h-10 w-10 rounded border bg-slate-100 overflow-hidden">
                                        {cat.image ? (
                                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cat.image}`} alt={cat.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-4 w-4 text-slate-400" /></div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold">{cat.name}</TableCell>
                                <TableCell className="text-slate-500 max-w-xs truncate">{cat.description || '-'}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2 py-4">
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        setCurrentCategory(cat);
                                        setFormData({ name: cat.name, description: cat.description || '' });
                                        if (cat.image) setPreview(`${import.meta.env.VITE_IMAGE_BASE_URL}${cat.image}`);
                                        setIsEditOpen(true);
                                    }}>
                                        <Edit className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(cat._id)}>
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</label>
                            <Input
                                placeholder="Category Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
                            <Textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Update Image</label>
                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                            {preview && (
                                <div className="mt-2 aspect-video rounded-lg border overflow-hidden">
                                    <img src={preview} className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full">Update Category</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Categories;
