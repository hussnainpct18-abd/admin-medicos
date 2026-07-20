import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/" className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-blue-400">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          {item.href ? (
            <Link to={item.href} className="text-slate-500 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-blue-400">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800 dark:text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
