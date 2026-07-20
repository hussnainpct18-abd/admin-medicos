import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPassword('dummy-token', data.password);
      toast.success('Password has been reset successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link to="/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-6 dark:text-slate-400">
        <ArrowLeft className="h-4 w-4" /> Back to Login
      </Link>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Reset Password 🔑</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Please enter your new password below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6CBD] to-[#0d5ba3] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:opacity-70">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Resetting...</> : 'Reset Password'}
        </button>
      </form>
    </motion.div>
  );
}
