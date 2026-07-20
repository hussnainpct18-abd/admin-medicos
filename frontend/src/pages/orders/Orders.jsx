import { useState, useEffect } from 'react';
import { getOrders } from '../../services/dataService';
import { formatCurrency, formatDate } from '../../utils/helpers';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const columns = [
    { header: 'Order ID', accessorKey: 'id', cell: ({ getValue }) => <span className="font-medium text-slate-800 dark:text-white">{getValue()}</span> },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-white">{row.original.customerName}</p>
          <p className="text-xs text-slate-500">{row.original.customerEmail}</p>
        </div>
      ),
    },
    { header: 'Amount', accessorKey: 'totalAmount', cell: ({ getValue }) => <span className="font-medium">{formatCurrency(getValue())}</span> },
    { header: 'Payment Method', accessorKey: 'paymentMethod' },
    { header: 'Payment', accessorKey: 'paymentStatus', cell: ({ getValue }) => <StatusBadge status={getValue()} /> },
    { header: 'Status', accessorKey: 'orderStatus', cell: ({ getValue }) => <StatusBadge status={getValue()} /> },
    { header: 'Date', accessorKey: 'date', cell: ({ getValue }) => formatDate(getValue()) },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <Link to={`/orders/${row.original.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700">
          <Eye className="h-4 w-4" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">View and manage customer orders.</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
        <DataTable
          columns={columns}
          data={orders}
          searchPlaceholder="Search orders..."
        />
      </div>
    </div>
  );
}
