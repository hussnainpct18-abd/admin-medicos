import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts & Routes
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/products/Products';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';
import Categories from './pages/categories/Categories';
import AddCategory from './pages/categories/AddCategory';
import Blogs from './pages/blogs/Blogs';
import AddBlog from './pages/blogs/AddBlog';
import EditBlog from './pages/blogs/EditBlog';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';
import AdminUsers from './pages/admins/AdminUsers';
import AddAdmin from './pages/admins/AddAdmin';

import PlaceholderPage from './components/PlaceholderPage';
import EditCategory from './pages/categories/EditCategory';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token?" element={<ResetPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              
              {/* Categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/edit/:id" element={<EditCategory title="Edit Category" />} />

              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />

              {/* Blogs */}
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/add" element={<AddBlog />} />
              <Route path="blogs/edit/:id" element={<EditBlog />} />

              {/* Orders */}
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetails />} />

              {/* Admins */}
              <Route path="admins" element={<AdminUsers />} />
              <Route path="admins/add" element={<AddAdmin />} />
              <Route path="admins/edit/:id" element={<PlaceholderPage title="Edit Admin" />} />

              {/* Reports & Settings */}
              <Route path="reports" element={<PlaceholderPage title="Reports" />} />
              <Route path="settings" element={<PlaceholderPage title="Settings" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
      </AuthProvider>
    </ThemeProvider>
  );
}
