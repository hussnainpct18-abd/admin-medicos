import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2, Stethoscope } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: 'admin@medicos.com', password: 'password', remember: false },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.remember);
      toast.success('Welcome back! Login successful.');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Mobile logo */}
      <div className="flex items-center gap-3 mb-8 lg:hidden">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F6CBD] to-[#2BB673] shadow-lg">
          <Stethoscope className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">MedicosPro</h1>
          <p className="text-xs text-slate-400">Admin Dashboard</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back 👋</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to your admin account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="admin@medicos.com"
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20 dark:focus:border-blue-400'}`}
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20 dark:focus:border-blue-400'}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" {...register('remember')} />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot Password?</Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6CBD] to-[#0d5ba3] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:opacity-70"
        >
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Demo: admin@medicos.com / password
      </p>
    </motion.div>
  );
}
