import { useState, useEffect } from 'react';
import { getDashboardStats, getMonthlySales, getOrderStatusChart, getActivityTimeline } from '../../services/dataService';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import StatusBadge from '../../components/StatusBadge';
import { Package, FolderTree, FileText, ShoppingCart, Users, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getMonthlySales().then(setSalesData);
    getOrderStatusChart().then(setPieData);
    getActivityTimeline().then(setTimeline);
  }, []);

  if (!stats) return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} color="primary" trend="up" trendValue="+12.5%" />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingCart} color="secondary" trend="up" trendValue="+8.2%" />
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="indigo" />
        <StatCard title="Low Stock Items" value={stats.lowStockProducts} icon={AlertTriangle} color="accent" trend="down" trendValue="-2" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <ChartCard title="Revenue Overview" subtitle="Monthly revenue for the current year" className="lg:col-span-2">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /> */}
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="#0F6CBD" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Order Status" subtitle="Current distribution of orders">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="45%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:col-span-2">
           <StatCard title="Total Categories" value={stats.totalCategories} icon={FolderTree} color="amber" />
           <StatCard title="Active Blogs" value={stats.totalBlogs} icon={FileText} color="cyan" />
           <StatCard title="Pending Orders" value={stats.pendingOrders} icon={ShoppingCart} color="orange" />
           <StatCard title="Active Admins" value={stats.activeAdmins} icon={Users} color="pink" />
        </div>

        {/* Activity Timeline */}
        <ChartCard title="Recent Activity" className="xl:col-span-1">
          <div className="mt-4 space-y-6">
            {timeline.slice(0, 5).map((item, idx) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} key={item.id} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-slate-200 last:before:hidden dark:before:bg-slate-700">
                <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-primary dark:border-slate-800 dark:bg-blue-500" />
                <p className="text-sm font-medium text-slate-800 dark:text-white">{item.action}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                <p className="mt-1 text-[10px] font-medium text-slate-400">{item.time}</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
