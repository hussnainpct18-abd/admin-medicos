import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to proceed?', confirmText = 'Confirm', variant = 'danger' }) {
  const variantStyles = {
    danger: { icon: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400', button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
    warning: { icon: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' },
    info: { icon: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', button: 'bg-primary hover:bg-blue-700 focus:ring-primary' },
  };
  const styles = variantStyles[variant] || variantStyles.danger;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
              </div>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                Cancel
              </button>
              <button onClick={onConfirm} className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
