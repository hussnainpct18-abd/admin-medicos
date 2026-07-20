import { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../../services/dataService';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId);
      setCategories(categories.filter(c => c.id !== deleteId));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Category',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.image} alt={row.original.name} className="h-10 w-10 rounded-lg object-cover" />
          <p className="font-medium text-slate-800 dark:text-white">{row.original.name}</p>
        </div>
      ),
    },
    { header: 'Products Count', accessorKey: 'productsCount' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    },
    { header: 'Created Date', accessorKey: 'createdAt' },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/categories/edit/${row.original.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700">
            <Edit className="h-4 w-4" />
          </Link>
          <button onClick={() => setDeleteId(row.original.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Categories</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage product categories.</p>
        </div>
        <Link to="/categories/add" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-sm shadow-blue-500/20">
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
        <DataTable
          columns={columns}
          data={categories}
          searchPlaceholder="Search categories..."
          selectable
          onBulkDelete={(rows) => toast.info(`Bulk delete ${rows.length} categories (simulated)`)}
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
}
