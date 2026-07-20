import { PackageOpen } from 'lucide-react';
import { cn } from '../utils/cn';

export default function EmptyState({ icon: Icon = PackageOpen, title = 'No data found', description = 'There are no items to display.', action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
        <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
