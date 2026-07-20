import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../services/dataService';
import { formatCurrency } from '../../utils/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import StatusBadge from '../../components/StatusBadge';
import { Printer, Mail, MapPin, Phone, Mail as MailIcon, User } from 'lucide-react';
import { toast } from 'react-toastify';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setLoading(true);
    const data = await getOrderById(id);
    setOrder(data);
    setLoading(false);
  };

  const handleStatusChange = async (e) => {
    setUpdating(true);
    try {
      await updateOrderStatus(id, e.target.value);
      setOrder({ ...order, orderStatus: e.target.value });
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading order details...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Orders', href: '/orders' }, { label: order.id }]} />
          <h1 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">Order {order.id}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <span>{order.date}</span> • <StatusBadge status={order.orderStatus} /> • <StatusBadge status={order.paymentStatus} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={order.orderStatus}
            onChange={handleStatusChange}
            disabled={updating}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button onClick={() => toast.info('Invoice printing simulated')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button onClick={() => toast.info('Email sent successfully')} className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Mail className="h-4 w-4" /> Email Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Products & Timeline */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Ordered Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Qty</th>
                    <th className="pb-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-medium text-slate-800 dark:text-white">{item.name}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-400">{formatCurrency(item.price)}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-400">{item.qty}</td>
                      <td className="py-3 text-right font-medium text-slate-800 dark:text-white">{formatCurrency(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="pt-4 text-right text-slate-500 dark:text-slate-400">Subtotal</td>
                    <td className="pt-4 text-right font-medium text-slate-800 dark:text-white">{formatCurrency(order.totalAmount)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="pt-2 text-right text-slate-500 dark:text-slate-400">Shipping</td>
                    <td className="pt-2 text-right font-medium text-slate-800 dark:text-white">$0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="pt-2 text-right font-semibold text-slate-800 dark:text-white">Total</td>
                    <td className="pt-2 text-right font-semibold text-primary">{formatCurrency(order.totalAmount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Order Timeline</h2>
            <div className="space-y-6">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-slate-200 last:before:hidden dark:before:bg-slate-700">
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-primary dark:border-slate-800" />
                  <p className="font-medium text-slate-800 dark:text-white">{event.status}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{event.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Info */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Customer Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{order.customerName}</p>
                  <p className="text-sm text-slate-500">Customer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MailIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{order.customerEmail}</p>
                  <p className="text-sm text-slate-500">Email Address</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Shipping Address</h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {order.shippingAddress}
              </p>
            </div>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-subtle dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Payment Information</h2>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
