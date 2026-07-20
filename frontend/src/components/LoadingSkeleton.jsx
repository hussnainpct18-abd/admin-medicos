import { cn } from '../utils/cn';

export default function LoadingSkeleton({ variant = 'text', width, height, count = 1, className }) {
  const base = 'animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-xl',
    image: 'h-48 w-full rounded-xl',
    button: 'h-10 w-24 rounded-xl',
    table: 'h-12 w-full',
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(base, variants[variant], className)}
          style={{ width, height }}
        />
      ))}
    </div>
  );
}
