import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Layers,
    ListTree,
    Package,
    ShoppingCart,
    LogOut,
    Menu,
    X,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        toast.info('Logged out successfully');
        navigate('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Layers, label: 'Categories', path: '/admin/categories' },
        { icon: ListTree, label: 'Subcategories', path: '/admin/subcategories' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
        { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`bg-slate-900 text-white w-64 flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                        <span className={`font-bold text-xl ${!sidebarOpen && 'lg:hidden'}`}>Admin Panel</span>
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-grow p-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                                title={item.label}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className={!sidebarOpen && 'lg:hidden'}>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-700">
                        <Button variant="ghost" className="w-full flex items-center justify-start gap-3 text-slate-400 hover:bg-slate-800 hover:text-white" onClick={handleLogout}>
                            <LogOut className="h-5 w-5" />
                            <span className={!sidebarOpen && 'lg:hidden'}>Logout</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col overflow-hidden">
                <header className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="text-sm">
                            <span className="text-slate-500">Welcome, </span>
                            <span className="font-medium">Administrator</span>
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
