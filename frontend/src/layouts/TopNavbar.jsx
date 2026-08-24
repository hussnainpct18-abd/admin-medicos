import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  notifications as initialNotifications,
  categories,
  products,
  orders,
  blogs,
} from '../utils/dummyData';
import {
  Menu, Search, Bell, Moon, Sun, ChevronDown, LogOut, X,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function TopNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const [notificationsList, setNotificationsList] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = use   State({ products: [], categories: [], orders: [], blogs: [] });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Mobile search input visibility
  
  const [dateTime, setDateTime] = useState(new Date());
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      
      const inDesktopSearch = searchRef.current && searchRef.current.contains(e.target);
      const inMobileSearch = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!inDesktopSearch && !inMobileSearch) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search filtering logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ products: [], categories: [], orders: [], blogs: [] });
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    const filteredProducts = products.filter(
      p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    ).slice(0, 4);

    const filteredCategories = categories.filter(
      c => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    ).slice(0, 3);

    const filteredOrders = orders.filter(
      o => o.id.toLowerCase().includes(query) || o.customerName.toLowerCase().includes(query)
    ).slice(0, 3);

    const filteredBlogs = blogs.filter(
      b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
    ).slice(0, 3);

    setSearchResults({
      products: filteredProducts,
      categories: filteredCategories,
      orders: filteredOrders,
      blogs: filteredBlogs
    });
  }, [searchQuery]);

  // Simulate incoming notifications periodically (every 30s, 15% chance)
  useEffect(() => {
    const alerts = [
      { title: 'New Category Added', message: 'Dental Supplies category was added successfully.', type: 'category' },
      { title: 'Low Stock Alert', message: 'Defibrillator AED has only 2 units remaining.', type: 'alert' },
      { title: 'New Admin Registered', message: 'Sarah Mitchell registered as a Manager.', type: 'security' },
      { title: 'New Order Received', message: 'QuickCare Urgent placed an order worth $499.00', type: 'order' }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        const newNotif = {
          id: Date.now(),
          title: randomAlert.title,
          message: randomAlert.message,
          time: 'Just now',
          read: false,
          type: randomAlert.type
        };
        setNotificationsList(prev => [newNotif, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMarkAsRead = (id) => {
    setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotificationsList([]);
  };

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.categories.length > 0 ||
    searchResults.orders.length > 0 ||
    searchResults.blogs.length > 0;

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
    setShowSearch(false);
  };

  const SearchResultsDropdown = ({ isMobile }) => {
    if (!searchQuery.trim()) return null;

    return (
      <div className={cn(
        "absolute z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800",
        isMobile ? "left-0 right-0 top-12 mt-1 max-h-[350px] overflow-y-auto" : "left-0 top-12 w-[420px] max-h-[480px] overflow-y-auto"
      )}>
        {!hasResults ? (
          <div className="py-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Products */}
            {searchResults.products.length > 0 && (
              <div>
                <h4 className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Products</h4>
                <div className="mt-1 space-y-0.5">
                  {searchResults.products.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleResultClick(`/products/edit/${p.id}`)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-800 dark:text-white">{p.name}</p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400">{p.sku} • {p.category}</p>
                      </div>
                      <span className="text-xs font-bold text-primary dark:text-blue-400">${p.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {searchResults.categories.length > 0 && (
              <div>
                <h4 className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Categories</h4>
                <div className="mt-1 space-y-0.5">
                  {searchResults.categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleResultClick(`/categories/edit/${c.id}`)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <img src={c.image} alt={c.name} className="h-9 w-9 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-800 dark:text-white">{c.name}</p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400">{c.productsCount} products</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {searchResults.orders.length > 0 && (
              <div>
                <h4 className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Orders</h4>
                <div className="mt-1 space-y-0.5">
                  {searchResults.orders.map(o => (
                    <button
                      key={o.id}
                      onClick={() => handleResultClick(`/orders/${o.id}`)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white">{o.id}</p>
                        <p className="truncate text-[10px] text-slate-450 dark:text-slate-400">{o.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-350">${o.totalAmount.toLocaleString()}</p>
                        <span className={cn(
                          "inline-block rounded-full px-1.5 py-0.2 text-[8px] font-bold",
                          o.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-750 dark:bg-yellow-900/30 dark:text-yellow-400'
                        )}>
                          {o.paymentStatus}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Blogs */}
            {searchResults.blogs.length > 0 && (
              <div>
                <h4 className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Blogs</h4>
                <div className="mt-1 space-y-0.5">
                  {searchResults.blogs.map(b => (
                    <button
                      key={b.id}
                      onClick={() => handleResultClick(`/blogs/edit/${b.id}`)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <img src={b.image} alt={b.title} className="h-9 w-9 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-800 dark:text-white">{b.title}</p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 font-normal">By {b.author}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-750 dark:bg-slate-800/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-700">
            <Menu className="h-5 w-5" />
          </button>

          {/* Search (desktop) */}
          <div ref={searchRef} className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search anything..."
              className="w-72 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            />
            {showSearchResults && <SearchResultsDropdown isMobile={false} />}
          </div>

          {/* Mobile search toggle */}
          <button onClick={() => setShowSearch(!showSearch)} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-700">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Date */}
          <div className="hidden xl:block text-right mr-2">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-350">
              {dateTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-12 w-80 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-[10px] font-semibold text-primary hover:underline dark:text-blue-400"
                        >
                          Mark all read
                        </button>
                      )}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary dark:bg-blue-500/20 dark:text-blue-400">{unreadCount} new</span>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificationsList.length === 0 ? (
                      <div className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">
                        No notifications
                      </div>
                    ) : (
                      notificationsList.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkAsRead(n.id)}
                          className={cn(
                            'group relative flex gap-3 border-b border-slate-50 px-4 py-3 transition-colors cursor-pointer hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/30',
                            !n.read && 'bg-blue-50/50 dark:bg-blue-500/5'
                          )}
                        >
                          <div className={cn('mt-1.5 h-2 w-2 flex-shrink-0 rounded-full', !n.read ? 'bg-primary dark:bg-blue-400' : 'bg-transparent')} />
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-xs font-semibold text-slate-800 dark:text-white">{n.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{n.message}</p>
                            <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">{n.time}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(n.id);
                            }}
                            className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                            title="Delete notification"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t border-slate-100 px-4 py-2 dark:border-slate-700">
                    <button
                      onClick={handleClearAll}
                      className="w-full text-center text-xs font-medium text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:underline"
                    >
                      Clear All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full border-2 border-primary/20 object-cover" />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{user?.role}</p>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-slate-400" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{user?.email}</p>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700">
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            ref={mobileSearchRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-700 relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search anything..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-sm text-slate-800 outline-none focus:border-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {showSearchResults && <SearchResultsDropdown isMobile={true} />}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
