import api from './api';
import { dashboardStats, monthlySalesData, monthlyOrdersData, revenueGrowthData, orderStatusData, categoryDistributionData, activityTimeline } from '../utils/dummyData';

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

// ─── Dashboard (Still Dummy) ───────────────────────────
export const getDashboardStats = async () => { await delay(); return dashboardStats; };
export const getMonthlySales = async () => { await delay(); return monthlySalesData; };
export const getMonthlyOrders = async () => { await delay(); return monthlyOrdersData; };
export const getRevenueGrowth = async () => { await delay(); return revenueGrowthData; };
export const getOrderStatusChart = async () => { await delay(); return orderStatusData; };
export const getCategoryDistribution = async () => { await delay(); return categoryDistributionData; };
export const getActivityTimeline = async () => { await delay(); return activityTimeline; };

// ─── Helpers to normalize _id to id ────────────────────
const normalize = (item) => {
  const normalized = { ...item, id: item._id };
  // For categories
  if (item.title !== undefined) normalized.name = item.title;
  if (item.category_image !== undefined) {
    normalized.image = item.category_image ? `http://localhost:4001${item.category_image}` : '';
  }
  // For products
  if (item.product_image !== undefined) {
    normalized.image = item.product_image ? `http://localhost:4001${item.product_image}` : '';
  }
  // For blogs
  if (item.blog_image !== undefined) {
    normalized.image = item.blog_image ? `http://localhost:4001${item.blog_image}` : '';
  }
  return normalized;
};

// ─── Categories ────────────────────────────────────────
export const getCategories = async () => { const res = await api.get('/categories/get'); return res.data.categories.map(normalize); };
export const getCategoryById = async (id) => { const res = await api.get(`/categories/get/${id}`); return normalize(res.data.category); };
export const createCategory = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) formData.append('category_image', value);
    else if (key === 'name') formData.append('title', value);
    else formData.append(key, value);
  });
  const res = await api.post('/categories/create', formData);
  return normalize(res.data.category);
};
export const updateCategory = async (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) {
      if (typeof value !== 'string') formData.append('category_image', value);
    }
    else if (key === 'name') formData.append('title', value);
    else formData.append(key, value);
  });
  const res = await api.put(`/categories/update/${id}`, formData);
  return normalize(res.data.category);
};
export const deleteCategory = async (id) => { await api.delete(`/categories/delete/${id}`); return { success: true }; };

// ─── Products ──────────────────────────────────────────
export const getProducts = async () => { const res = await api.get('/products/get'); return res.data.products.map(normalize); };
export const getProductById = async (id) => { const res = await api.get(`/products/get/${id}`); return normalize(res.data.product); };
export const createProduct = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) formData.append('product_image', value);
    else if (key === 'name') formData.append('title', value);
    else formData.append(key, value);
  });
  const res = await api.post('/products/create', formData);
  return normalize(res.data.product);
};
export const updateProduct = async (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) {
      if (typeof value !== 'string') formData.append('product_image', value);
    }
    else if (key === 'name') formData.append('title', value);
    else formData.append(key, value);
  });
  const res = await api.put(`/products/update/${id}`, formData);
  return normalize(res.data.product);
};
export const deleteProduct = async (id) => { await api.delete(`/products/delete/${id}`); return { success: true }; };

// ─── Blogs ─────────────────────────────────────────────
export const getBlogs = async () => { const res = await api.get('/blogs/get'); return res.data.blogs.map(normalize); };
export const getBlogById = async (id) => { const res = await api.get(`/blogs/get/${id}`); return normalize(res.data.blog); };
export const createBlog = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) formData.append('blog_image', value);
    else formData.append(key, value);
  });
  const res = await api.post('/blogs/create', formData);
  return normalize(res.data.blog);
};
export const updateBlog = async (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' && value) {
      if (typeof value !== 'string') formData.append('blog_image', value);
    } else {
      formData.append(key, value);
    }
  });
  const res = await api.put(`/blogs/update/${id}`, formData);
  return normalize(res.data.blog);
};
export const deleteBlog = async (id) => { await api.delete(`/blogs/delete/${id}`); return { success: true }; };

// ─── Orders ────────────────────────────────────────────
export const getOrders = async () => { const res = await api.get('/orders/get'); return res.data.orders.map(normalize); };
export const getOrderById = async (id) => { const res = await api.get(`/orders/get/${id}`); return normalize(res.data.order); };
export const updateOrderStatus = async (id, status) => { const res = await api.put(`/orders/update/${id}`, { orderStatus: status }); return normalize(res.data.order); };

// ─── Admin Users ───────────────────────────────────────
export const getAdminUsers = async () => { const res = await api.get('/users/users'); return res.data.map(normalize); };
export const getAdminById = async (id) => { const res = await api.get(`/users/users`); return res.data.map(normalize).find(a => a.id === id); }; // fallback since there's no get by id route
export const createAdmin = async (data) => { const res = await api.post('/users/add-users', data); return { ...data, id: Date.now() }; }; // Doesn't return user, simulating it
export const updateAdmin = async (id, data) => { const res = await api.put(`/users/update-users`, { ...data, id }); return { ...data, id }; };
export const deleteAdmin = async (id) => { await api.delete('/users/delete-users', { data: { id } }); return { success: true }; };
