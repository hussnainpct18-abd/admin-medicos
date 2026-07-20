import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      setSent(true);
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link to="/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-6 dark:text-slate-400">
        <ArrowLeft className="h-4 w-4" /> Back to Login
      </Link>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Forgot Password? 🔒</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {sent ? (
        <div className="mt-8 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center dark:bg-emerald-500/10 dark:border-emerald-500/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 mb-3">
            <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">Check Your Email</h3>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
            We&apos;ve sent a password reset link to your email address.
          </p>
          <Link to="/login" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white dark:border-slate-600 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'}`}
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6CBD] to-[#0d5ba3] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:opacity-70">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
          </button>
        </form>
      )}
    </motion.div>
  );
}
