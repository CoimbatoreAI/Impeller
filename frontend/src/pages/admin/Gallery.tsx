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
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryItem {
    _id: string;
    title: string;
    image: string;
    category?: string;
}

const AdminGallery = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', category: 'General' });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery`);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            toast.error('Failed to fetch gallery');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
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
        if (!file) {
            toast.error('Please select an image');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('image', file);

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data,
            });
            if (res.ok) {
                toast.success('Gallery item added');
                setIsAddOpen(false);
                resetForm();
                fetchGallery();
            }
        } catch (error) {
            toast.error('Error adding gallery item');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', category: 'General' });
        setFile(null);
        setPreview('');
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Gallery item deleted');
                fetchGallery();
            }
        } catch (error) {
            toast.error('Error deleting item');
        }
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gallery Management</h1>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Gallery Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Gallery Image</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <Input
                                placeholder="Image Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Category (e.g., Manufacturing, Store)"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                required
                            />
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Select Image</label>
                                <Input type="file" accept="image/*" onChange={handleFileChange} required />
                                {preview && (
                                    <div className="mt-2 aspect-video rounded-lg border overflow-hidden">
                                        <img src={preview} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full">Upload and Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[120px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={4} className="text-center py-10">Loading gallery...</TableCell></TableRow>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <div className="h-16 w-16 rounded border bg-slate-100 overflow-hidden">
                                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image}`} alt={item.title} className="h-full w-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold">{item.title}</TableCell>
                                    <TableCell className="text-slate-500">{item.category}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}>
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={4} className="text-center py-10 text-slate-500">No gallery items found.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminGallery;
