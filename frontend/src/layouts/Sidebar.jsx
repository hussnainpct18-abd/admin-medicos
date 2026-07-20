import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, FolderTree, Package, FileText, ShoppingCart,
  Users, BarChart3, Settings, LogOut, ChevronLeft, ChevronDown,
  Stethoscope, X,
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Categories', icon: FolderTree, path: '/categories', children: [
    { label: 'Add Category', path: '/categories/add' },
    { label: 'View Categories', path: '/categories' },
  ]},
  { label: 'Products', icon: Package, path: '/products', children: [
    { label: 'Add Product', path: '/products/add' },
    { label: 'View Products', path: '/products' },
  ]},
  { label: 'Blogs', icon: FileText, path: '/blogs', children: [
    { label: 'Add Blog', path: '/blogs/add' },
    { label: 'View Blogs', path: '/blogs' },
  ]},
  { label: 'Orders', icon: ShoppingCart, path: '/orders' },
  { label: 'Admin Users', icon: Users, path: '/admins', children: [
    { label: 'Add Admin', path: '/admins/add' },
    { label: 'View Admins', path: '/admins' },
  ]},
  { label: 'Reports', icon: BarChart3, path: '/reports' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

function SidebarItem({ item, collapsed, closeMobile }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white',
            collapsed && 'justify-center px-2'
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
            </>
          )}
        </button>
        <AnimatePresence>
          {open && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-4">
                {item.children.map(child => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    end
                    onClick={closeMobile}
                    className={({ isActive }) => cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={closeMobile}
      className={({ isActive }) => cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-white/15 text-white shadow-lg shadow-black/5'
          : 'text-slate-300 hover:bg-white/10 hover:text-white',
        collapsed && 'justify-center px-2'
      )}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0a2540] to-[#0d3b66]">
      {/* Logo */}
      <div className={cn('flex items-center gap-3 border-b border-white/10 px-4 py-5', collapsed && 'justify-center px-2')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F6CBD] to-[#2BB673] shadow-lg">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-base font-bold text-white">MedicosPro</h1>
            <p className="text-[10px] text-slate-400">Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} closeMobile={closeMobile} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-3 py-3">
        <button
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-300 transition-all hover:bg-red-500/20 hover:text-red-200',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle (desktop) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full bg-white shadow-md text-slate-500 hover:text-primary transition-colors dark:bg-slate-700 dark:text-slate-300"
      >
        <ChevronLeft className={cn('h-3.5 w-3.5 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative hidden lg:block h-screen sticky top-0 flex-shrink-0"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-[260px] lg:hidden"
            >
              <button
                onClick={closeMobile}
                className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
