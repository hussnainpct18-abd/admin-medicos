import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'primary', className }) {
  const colorMap = {
    primary: 'from-[#0F6CBD] to-[#0d5ba3]',
    secondary: 'from-[#2BB673] to-[#239e63]',
    accent: 'from-[#E53935] to-[#c62828]',
    purple: 'from-[#7c3aed] to-[#6d28d9]',
    amber: 'from-[#f59e0b] to-[#d97706]',
    cyan: 'from-[#06b6d4] to-[#0891b2]',
    pink: 'from-[#ec4899] to-[#db2777]',
    indigo: 'from-[#6366f1] to-[#4f46e5]',
    teal: 'from-[#14b8a6] to-[#0d9488]',
    orange: 'from-[#f97316] to-[#ea580c]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative overflow-hidden rounded-xl bg-white p-5 shadow-subtle dark:bg-slate-800 dark:shadow-slate-900/20',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
          {trendValue && (
            <div className="mt-2 flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn('text-xs font-semibold', trend === 'up' ? 'text-emerald-500' : 'text-red-500')}>
                {trendValue}
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white', colorMap[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {/* Decorative element */}
      <div className={cn('absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-10', colorMap[color])} />
    </motion.div>
  );
}
