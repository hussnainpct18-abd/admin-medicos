export default function PlaceholderPage({ title }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
      <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">This page is under construction.</p>
    </div>
  );
}
