import { cn } from '../utils/cn';

export default function FormInput({ label, name, register, errors, type = 'text', placeholder, required, className, ...props }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all',
          'placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20',
          'dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
          errors?.[name] && 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
        )}
        {...(register ? register(name, { required: required && `${label || name} is required` }) : {})}
        {...props}
      />
      {errors?.[name] && (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}
