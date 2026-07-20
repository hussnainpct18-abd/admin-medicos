import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, Trash2, Download } from 'lucide-react';
import { cn } from '../utils/cn';
import EmptyState from './EmptyState';

export default function DataTable({
  data = [],
  columns = [],
  searchable = true,
  searchPlaceholder = 'Search...',
  pagination = true,
  selectable = false,
  onBulkDelete,
  onExportCSV,
  onExportPDF,
  actions,
  className,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const tableColumns = useMemo(() => {
    const cols = [];
    if (selectable) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600"
          />
        ),
        size: 40,
      });
    }
    return [...cols, ...columns];
  }, [columns, selectable]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: selectable,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Top Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
              />
            </div>
          )}
          {selectedCount > 0 && onBulkDelete && (
            <button
              onClick={() => onBulkDelete(table.getSelectedRowModel().rows.map(r => r.original))}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" /> Delete ({selectedCount})
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onExportCSV && (
            <button onClick={onExportCSV} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
              <Download className="h-4 w-4" /> CSV
            </button>
          )}
          {onExportPDF && (
            <button onClick={onExportPDF} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
              <Download className="h-4 w-4" /> PDF
            </button>
          )}
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn('flex items-center gap-1', header.column.getCanSort() && 'cursor-pointer select-none hover:text-slate-700 dark:hover:text-white')}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          header.column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
                          header.column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
                          <ArrowUpDown className="h-3 w-3 opacity-40" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-100 transition-colors hover:bg-blue-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableColumns.length} className="px-4 py-8">
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && data.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700">
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                  table.getState().pagination.pageIndex === i
                    ? 'bg-primary text-white'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                )}
              >
                {i + 1}
              </button>
            )).slice(
              Math.max(0, table.getState().pagination.pageIndex - 2),
              Math.min(table.getPageCount(), table.getState().pagination.pageIndex + 3)
            )}
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700">
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
