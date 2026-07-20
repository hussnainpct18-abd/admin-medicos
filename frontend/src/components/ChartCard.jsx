import { cn } from '../utils/cn';

export default function ChartCard({ title, subtitle, children, action, className }) {
  return (
    <div className={cn(
      'rounded-xl bg-white p-5 shadow-subtle dark:bg-slate-800 dark:shadow-slate-900/20',
      className
    )}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
