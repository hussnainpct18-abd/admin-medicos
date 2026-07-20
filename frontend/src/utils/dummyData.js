// ─── Categories ────────────────────────────────────────
export const categories = [
  { id: 1, name: 'Surgical Instruments', description: 'Professional surgical tools and instruments for operations', image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=200', productsCount: 45, status: 'Active', createdAt: '2025-01-15' },
  { id: 2, name: 'Diagnostic Equipment', description: 'Equipment used for patient diagnosis and monitoring', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200', productsCount: 32, status: 'Active', createdAt: '2025-02-10' },
  { id: 3, name: 'Patient Monitoring', description: 'Continuous monitoring devices for patient vitals', image: 'https://images.unsplash.com/photo-1530497610245-b1f0a79cff74?w=200', productsCount: 28, status: 'Active', createdAt: '2025-03-05' },
  { id: 4, name: 'Hospital Furniture', description: 'Beds, tables, and other furniture for hospital settings', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200', productsCount: 18, status: 'Active', createdAt: '2025-03-20' },
  { id: 5, name: 'Rehabilitation', description: 'Physiotherapy and rehabilitation equipment', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200', productsCount: 22, status: 'Active', createdAt: '2025-04-12' },
  { id: 6, name: 'Laboratory Equipment', description: 'Lab instruments and testing equipment', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200', productsCount: 37, status: 'Active', createdAt: '2025-05-08' },
  { id: 7, name: 'Sterilization', description: 'Autoclaves and sterilization machines', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200', productsCount: 12, status: 'Inactive', createdAt: '2025-06-01' },
  { id: 8, name: 'Emergency Equipment', description: 'Emergency response and first aid equipment', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200', productsCount: 25, status: 'Active', createdAt: '2025-06-15' },
];

// ─── Products ──────────────────────────────────────────
export const products = [
  { id: 1, name: 'Digital Stethoscope Pro', category: 'Diagnostic Equipment', brand: 'MedTech Pro', sku: 'DSP-001', price: 299.99, discountPrice: 249.99, quantity: 150, unit: 'Piece', description: 'Advanced digital stethoscope with noise cancellation', image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=200', featured: true, status: 'Active', createdAt: '2025-01-20' },
  { id: 2, name: 'Pulse Oximeter HD', category: 'Patient Monitoring', brand: 'VitalSign', sku: 'POH-002', price: 89.99, discountPrice: null, quantity: 5, unit: 'Piece', description: 'High-definition pulse oximeter with OLED display', image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=200', featured: false, status: 'Active', createdAt: '2025-02-14' },
  { id: 3, name: 'Surgical Scalpel Set', category: 'Surgical Instruments', brand: 'SurgiCraft', sku: 'SSS-003', price: 449.99, discountPrice: 399.99, quantity: 75, unit: 'Set', description: 'Professional-grade surgical scalpel set with 12 blades', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200', featured: true, status: 'Active', createdAt: '2025-03-10' },
  { id: 4, name: 'Patient Monitor X200', category: 'Patient Monitoring', brand: 'MedTech Pro', sku: 'PMX-004', price: 2499.99, discountPrice: 2199.99, quantity: 3, unit: 'Piece', description: '12-inch touchscreen patient monitor with multi-parameter tracking', image: 'https://images.unsplash.com/photo-1530497610245-b1f0a79cff74?w=200', featured: true, status: 'Active', createdAt: '2025-04-05' },
  { id: 5, name: 'Electric Hospital Bed', category: 'Hospital Furniture', brand: 'CareBed', sku: 'EHB-005', price: 3999.99, discountPrice: null, quantity: 20, unit: 'Piece', description: 'Fully electric adjustable hospital bed with side rails', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200', featured: false, status: 'Active', createdAt: '2025-04-22' },
  { id: 6, name: 'Autoclave Sterilizer', category: 'Sterilization', brand: 'SteriMax', sku: 'ACS-006', price: 1899.99, discountPrice: 1699.99, quantity: 0, unit: 'Piece', description: 'Table-top autoclave sterilizer with LCD control', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200', featured: false, status: 'Inactive', createdAt: '2025-05-15' },
  { id: 7, name: 'Defibrillator AED', category: 'Emergency Equipment', brand: 'LifeSave', sku: 'DAE-007', price: 1599.99, discountPrice: null, quantity: 35, unit: 'Piece', description: 'Automatic external defibrillator with voice guidance', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200', featured: true, status: 'Active', createdAt: '2025-06-01' },
  { id: 8, name: 'Blood Pressure Monitor', category: 'Diagnostic Equipment', brand: 'VitalSign', sku: 'BPM-008', price: 129.99, discountPrice: 109.99, quantity: 200, unit: 'Piece', description: 'Automatic digital blood pressure monitor with memory', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200', featured: false, status: 'Active', createdAt: '2025-06-20' },
  { id: 9, name: 'Ultrasound Machine', category: 'Diagnostic Equipment', brand: 'MedTech Pro', sku: 'USM-009', price: 12999.99, discountPrice: 11499.99, quantity: 8, unit: 'Piece', description: 'Portable ultrasound machine with 3D imaging', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200', featured: true, status: 'Active', createdAt: '2025-07-01' },
  { id: 10, name: 'Wheelchair Lightweight', category: 'Rehabilitation', brand: 'MobilAid', sku: 'WCL-010', price: 599.99, discountPrice: null, quantity: 2, unit: 'Piece', description: 'Ultra-lightweight foldable wheelchair for patients', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200', featured: false, status: 'Active', createdAt: '2025-07-15' },
];

// ─── Blogs ─────────────────────────────────────────────
export const blogs = [
  { id: 1, title: 'The Future of Surgical Robotics in Healthcare', slug: 'future-surgical-robotics', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400', content: 'Surgical robotics is transforming the healthcare industry...', metaTitle: 'Surgical Robotics Future', metaDescription: 'Explore how surgical robotics is transforming healthcare operations.', author: 'Dr. Sarah Johnson', status: 'Published', publishDate: '2025-06-01' },
  { id: 2, title: 'Top 10 Must-Have Medical Devices for Clinics', slug: 'top-medical-devices-clinics', image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400', content: 'Every clinic needs essential medical devices...', metaTitle: 'Top Medical Devices', metaDescription: 'Discover the top 10 must-have medical devices for modern clinics.', author: 'James Wilson', status: 'Published', publishDate: '2025-06-15' },
  { id: 3, title: 'Understanding Patient Monitoring Systems', slug: 'patient-monitoring-systems', image: 'https://images.unsplash.com/photo-1530497610245-b1f0a79cff74?w=400', content: 'Patient monitoring systems are critical...', metaTitle: 'Patient Monitoring Guide', metaDescription: 'Complete guide to understanding patient monitoring systems.', author: 'Dr. Emily Chen', status: 'Published', publishDate: '2025-07-01' },
  { id: 4, title: 'How to Choose the Right Hospital Equipment', slug: 'choose-hospital-equipment', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400', content: 'Choosing hospital equipment requires careful consideration...', metaTitle: 'Hospital Equipment Guide', metaDescription: 'Learn how to choose the right hospital equipment for your facility.', author: 'Mark Thompson', status: 'Draft', publishDate: '2025-07-10' },
  { id: 5, title: 'Sterilization Best Practices in Medical Facilities', slug: 'sterilization-best-practices', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', content: 'Proper sterilization is vital for patient safety...', metaTitle: 'Sterilization Best Practices', metaDescription: 'Learn sterilization best practices for medical facilities.', author: 'Dr. Sarah Johnson', status: 'Published', publishDate: '2025-07-20' },
];

// ─── Orders ────────────────────────────────────────────
export const orders = [
  { id: 'ORD-2025-001', customerName: 'City General Hospital', customerEmail: 'procurement@citygeneral.com', totalAmount: 12499.95, paymentMethod: 'Bank Transfer', paymentStatus: 'Paid', orderStatus: 'Delivered', date: '2025-07-18', shippingAddress: '123 Medical Center Dr, New York, NY 10001', billingAddress: '123 Medical Center Dr, New York, NY 10001', items: [{ name: 'Patient Monitor X200', qty: 3, price: 2199.99 }, { name: 'Digital Stethoscope Pro', qty: 5, price: 249.99 }, { name: 'Blood Pressure Monitor', qty: 10, price: 109.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-15 09:00 AM' }, { status: 'Confirmed', date: '2025-07-15 10:30 AM' }, { status: 'Packed', date: '2025-07-16 02:00 PM' }, { status: 'Shipped', date: '2025-07-17 08:00 AM' }, { status: 'Delivered', date: '2025-07-18 11:00 AM' }] },
  { id: 'ORD-2025-002', customerName: 'MedCare Clinic', customerEmail: 'orders@medcare.com', totalAmount: 4599.97, paymentMethod: 'Credit Card', paymentStatus: 'Paid', orderStatus: 'Shipped', date: '2025-07-19', shippingAddress: '456 Health Ave, Los Angeles, CA 90001', billingAddress: '456 Health Ave, Los Angeles, CA 90001', items: [{ name: 'Surgical Scalpel Set', qty: 2, price: 399.99 }, { name: 'Defibrillator AED', qty: 1, price: 1599.99 }, { name: 'Autoclave Sterilizer', qty: 1, price: 1699.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-19 11:00 AM' }, { status: 'Confirmed', date: '2025-07-19 01:00 PM' }, { status: 'Packed', date: '2025-07-19 05:00 PM' }, { status: 'Shipped', date: '2025-07-20 09:00 AM' }] },
  { id: 'ORD-2025-003', customerName: 'St. Mary\'s Hospital', customerEmail: 'supply@stmarys.org', totalAmount: 25999.98, paymentMethod: 'Bank Transfer', paymentStatus: 'Paid', orderStatus: 'Confirmed', date: '2025-07-20', shippingAddress: '789 Hospital Rd, Chicago, IL 60601', billingAddress: '789 Hospital Rd, Chicago, IL 60601', items: [{ name: 'Ultrasound Machine', qty: 2, price: 11499.99 }, { name: 'Electric Hospital Bed', qty: 1, price: 3999.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-20 08:30 AM' }, { status: 'Confirmed', date: '2025-07-20 10:00 AM' }] },
  { id: 'ORD-2025-004', customerName: 'WellLife Pharmacy', customerEmail: 'orders@welllife.com', totalAmount: 1849.90, paymentMethod: 'Credit Card', paymentStatus: 'Unpaid', orderStatus: 'Pending', date: '2025-07-20', shippingAddress: '101 Wellness Blvd, Houston, TX 77001', billingAddress: '101 Wellness Blvd, Houston, TX 77001', items: [{ name: 'Blood Pressure Monitor', qty: 10, price: 109.99 }, { name: 'Pulse Oximeter HD', qty: 5, price: 89.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-20 02:00 PM' }] },
  { id: 'ORD-2025-005', customerName: 'National Health Center', customerEmail: 'procurement@nhc.gov', totalAmount: 8399.96, paymentMethod: 'Purchase Order', paymentStatus: 'Paid', orderStatus: 'Packed', date: '2025-07-19', shippingAddress: '202 Federal Way, Washington, DC 20001', billingAddress: '202 Federal Way, Washington, DC 20001', items: [{ name: 'Electric Hospital Bed', qty: 2, price: 3999.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-19 09:00 AM' }, { status: 'Confirmed', date: '2025-07-19 11:00 AM' }, { status: 'Packed', date: '2025-07-20 08:00 AM' }] },
  { id: 'ORD-2025-006', customerName: 'QuickCare Urgent', customerEmail: 'supply@quickcare.com', totalAmount: 3199.98, paymentMethod: 'Credit Card', paymentStatus: 'Paid', orderStatus: 'Delivered', date: '2025-07-14', shippingAddress: '303 Express Lane, Phoenix, AZ 85001', billingAddress: '303 Express Lane, Phoenix, AZ 85001', items: [{ name: 'Defibrillator AED', qty: 2, price: 1599.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-12 10:00 AM' }, { status: 'Confirmed', date: '2025-07-12 11:30 AM' }, { status: 'Packed', date: '2025-07-13 09:00 AM' }, { status: 'Shipped', date: '2025-07-13 02:00 PM' }, { status: 'Delivered', date: '2025-07-14 10:30 AM' }] },
  { id: 'ORD-2025-007', customerName: 'Pacific Health Systems', customerEmail: 'orders@pacifichealth.com', totalAmount: 749.93, paymentMethod: 'Bank Transfer', paymentStatus: 'Paid', orderStatus: 'Cancelled', date: '2025-07-10', shippingAddress: '404 Coast Hwy, San Diego, CA 92101', billingAddress: '404 Coast Hwy, San Diego, CA 92101', items: [{ name: 'Digital Stethoscope Pro', qty: 3, price: 249.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-10 03:00 PM' }, { status: 'Cancelled', date: '2025-07-11 09:00 AM' }] },
  { id: 'ORD-2025-008', customerName: 'Sunrise Medical Group', customerEmail: 'purchase@sunrisemedical.com', totalAmount: 5799.95, paymentMethod: 'Credit Card', paymentStatus: 'Paid', orderStatus: 'Delivered', date: '2025-07-08', shippingAddress: '505 Sunrise Ave, Miami, FL 33101', billingAddress: '505 Sunrise Ave, Miami, FL 33101', items: [{ name: 'Wheelchair Lightweight', qty: 5, price: 599.99 }, { name: 'Surgical Scalpel Set', qty: 5, price: 399.99 }], timeline: [{ status: 'Order Placed', date: '2025-07-05 08:00 AM' }, { status: 'Confirmed', date: '2025-07-05 10:00 AM' }, { status: 'Packed', date: '2025-07-06 02:00 PM' }, { status: 'Shipped', date: '2025-07-07 09:00 AM' }, { status: 'Delivered', date: '2025-07-08 11:00 AM' }] },
];

// ─── Admin Users ───────────────────────────────────────
export const adminUsers = [
  { id: 1, name: 'John Mitchell', email: 'john@medicos.com', phone: '+1 555-0101', role: 'Super Admin', avatar: 'https://ui-avatars.com/api/?name=John+Mitchell&background=0F6CBD&color=fff', status: 'Active', createdAt: '2024-06-01', lastLogin: '2025-07-20 09:15 AM' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@medicos.com', phone: '+1 555-0102', role: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2BB673&color=fff', status: 'Active', createdAt: '2024-08-15', lastLogin: '2025-07-20 08:30 AM' },
  { id: 3, name: 'David Park', email: 'david@medicos.com', phone: '+1 555-0103', role: 'Manager', avatar: 'https://ui-avatars.com/api/?name=David+Park&background=6366f1&color=fff', status: 'Active', createdAt: '2024-10-20', lastLogin: '2025-07-19 05:00 PM' },
  { id: 4, name: 'Emily Chen', email: 'emily@medicos.com', phone: '+1 555-0104', role: 'Sales Executive', avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=f59e0b&color=fff', status: 'Active', createdAt: '2025-01-10', lastLogin: '2025-07-20 10:00 AM' },
  { id: 5, name: 'Robert Williams', email: 'robert@medicos.com', phone: '+1 555-0105', role: 'Manager', avatar: 'https://ui-avatars.com/api/?name=Robert+Williams&background=ec4899&color=fff', status: 'Inactive', createdAt: '2025-03-05', lastLogin: '2025-06-15 02:30 PM' },
];

// ─── Dashboard Stats ───────────────────────────────────
export const dashboardStats = {
  totalProducts: 248,
  totalCategories: 8,
  totalBlogs: 24,
  totalOrders: 1456,
  pendingOrders: 23,
  deliveredOrders: 1289,
  revenue: 456789.50,
  activeAdmins: 4,
  lowStockProducts: 5,
  newCustomers: 38,
};

// ─── Chart Data ────────────────────────────────────────
export const monthlySalesData = [
  { month: 'Jan', sales: 32500 }, { month: 'Feb', sales: 41200 }, { month: 'Mar', sales: 38900 },
  { month: 'Apr', sales: 47800 }, { month: 'May', sales: 52300 }, { month: 'Jun', sales: 49100 },
  { month: 'Jul', sales: 58700 }, { month: 'Aug', sales: 55200 }, { month: 'Sep', sales: 61000 },
  { month: 'Oct', sales: 57400 }, { month: 'Nov', sales: 63800 }, { month: 'Dec', sales: 71200 },
];

export const monthlyOrdersData = [
  { month: 'Jan', orders: 85 }, { month: 'Feb', orders: 102 }, { month: 'Mar', orders: 96 },
  { month: 'Apr', orders: 118 }, { month: 'May', orders: 134 }, { month: 'Jun', orders: 127 },
  { month: 'Jul', orders: 148 }, { month: 'Aug', orders: 139 }, { month: 'Sep', orders: 156 },
  { month: 'Oct', orders: 143 }, { month: 'Nov', orders: 162 }, { month: 'Dec', orders: 178 },
];

export const revenueGrowthData = [
  { month: 'Jan', revenue: 32500, prevYear: 28000 }, { month: 'Feb', revenue: 41200, prevYear: 34500 },
  { month: 'Mar', revenue: 38900, prevYear: 31200 }, { month: 'Apr', revenue: 47800, prevYear: 39800 },
  { month: 'May', revenue: 52300, prevYear: 43100 }, { month: 'Jun', revenue: 49100, prevYear: 41600 },
  { month: 'Jul', revenue: 58700, prevYear: 47200 }, { month: 'Aug', revenue: 55200, prevYear: 45800 },
  { month: 'Sep', revenue: 61000, prevYear: 50300 }, { month: 'Oct', revenue: 57400, prevYear: 48900 },
  { month: 'Nov', revenue: 63800, prevYear: 52100 }, { month: 'Dec', revenue: 71200, prevYear: 58000 },
];

export const orderStatusData = [
  { name: 'Delivered', value: 1289, fill: '#2BB673' },
  { name: 'Shipped', value: 67, fill: '#0F6CBD' },
  { name: 'Packed', value: 34, fill: '#6366f1' },
  { name: 'Confirmed', value: 21, fill: '#f59e0b' },
  { name: 'Pending', value: 23, fill: '#fb923c' },
  { name: 'Cancelled', value: 22, fill: '#E53935' },
];

export const categoryDistributionData = [
  { name: 'Surgical Instruments', value: 45, fill: '#0F6CBD' },
  { name: 'Diagnostic Equipment', value: 32, fill: '#2BB673' },
  { name: 'Patient Monitoring', value: 28, fill: '#6366f1' },
  { name: 'Hospital Furniture', value: 18, fill: '#f59e0b' },
  { name: 'Rehabilitation', value: 22, fill: '#ec4899' },
  { name: 'Laboratory', value: 37, fill: '#14b8a6' },
  { name: 'Sterilization', value: 12, fill: '#8b5cf6' },
  { name: 'Emergency', value: 25, fill: '#E53935' },
];

// ─── Activity Timeline ────────────────────────────────
export const activityTimeline = [
  { id: 1, action: 'New order received', description: 'ORD-2025-004 from WellLife Pharmacy', time: '2 hours ago', type: 'order' },
  { id: 2, action: 'Product stock updated', description: 'Patient Monitor X200 stock reduced to 3 units', time: '3 hours ago', type: 'product' },
  { id: 3, action: 'New admin user added', description: 'Emily Chen was added as Sales Executive', time: '5 hours ago', type: 'admin' },
  { id: 4, action: 'Blog published', description: '"Sterilization Best Practices" was published', time: '6 hours ago', type: 'blog' },
  { id: 5, action: 'Order delivered', description: 'ORD-2025-001 delivered to City General Hospital', time: '8 hours ago', type: 'order' },
  { id: 6, action: 'Category updated', description: 'Emergency Equipment category image updated', time: '1 day ago', type: 'category' },
  { id: 7, action: 'Revenue milestone', description: 'Monthly revenue crossed $50,000', time: '1 day ago', type: 'revenue' },
  { id: 8, action: 'Low stock alert', description: 'Autoclave Sterilizer is out of stock', time: '2 days ago', type: 'alert' },
];

// ─── Notifications ─────────────────────────────────────
export const notifications = [
  { id: 1, title: 'New Order Received', message: 'WellLife Pharmacy placed an order worth $1,849.90', time: '2 hours ago', read: false, type: 'order' },
  { id: 2, title: 'Low Stock Alert', message: 'Pulse Oximeter HD has only 5 units remaining', time: '3 hours ago', read: false, type: 'alert' },
  { id: 3, title: 'Payment Received', message: 'City General Hospital paid $12,499.95', time: '5 hours ago', read: true, type: 'payment' },
  { id: 4, title: 'Order Delivered', message: 'ORD-2025-006 has been delivered successfully', time: '8 hours ago', read: true, type: 'order' },
  { id: 5, title: 'New Admin Login', message: 'Emily Chen logged in from a new device', time: '1 day ago', read: true, type: 'security' },
];
