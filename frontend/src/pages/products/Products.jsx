import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/dataService';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setProducts(products.filter(p => p.id !== deleteId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: 'Product',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.image} alt={row.original.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <p className="font-medium text-slate-800 dark:text-white">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.sku}</p>
          </div>
        </div>
      ),
    },
    { header: 'Category', accessorKey: 'category' },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">${row.original.price}</p>
          {row.original.discountPrice && (
            <p className="text-xs text-slate-400 line-through">${row.original.discountPrice}</p>
          )}
        </div>
      ),
    },
    { header: 'Stock', accessorKey: 'quantity' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/products/edit/${row.original.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700">
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
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Products</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your medical equipment inventory.</p>
        </div>
        <Link to="/products/add" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-sm shadow-blue-500/20">
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
        <DataTable
          columns={columns}
          data={products}
          searchPlaceholder="Search products..."
          selectable
          onBulkDelete={(rows) => toast.info(`Bulk delete ${rows.length} items (simulated)`)}
          onExportCSV={() => toast.success('CSV exported successfully')}
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
