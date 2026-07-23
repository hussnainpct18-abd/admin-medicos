const productModel = require("../../product/model/product.model");
const categoryModel = require("../../category/model/category.model");
const blogModel = require("../../blog/model/blog.model");
const orderModel = require("../../order/model/order.model");
const userModel = require("../../auth/models/user.model");

function formatRelativeTime(date) {
  if (!date) return "Some time ago";
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

const getDashboardData = async (req, res) => {
  try {
    // 1. Stats Counters
    const totalProducts = await productModel.countDocuments();
    const totalCategories = await categoryModel.countDocuments();
    const totalBlogs = await blogModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const pendingOrders = await orderModel.countDocuments({ orderStatus: "Pending" });
    const activeAdmins = await userModel.countDocuments({ status: "Active" });
    const lowStockProducts = await productModel.countDocuments({ quantity: { $lte: 10 } });

    // Sum grandTotal for all non-cancelled orders
    const revenueRes = await orderModel.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]);
    const totalRevenue = revenueRes.length > 0 ? revenueRes[0].total : 0;

    const stats = {
      totalProducts,
      totalCategories,
      totalBlogs,
      totalOrders,
      pendingOrders,
      activeAdmins,
      lowStockProducts,
      revenue: Math.round(totalRevenue * 100) / 100
    };

    // 2. Monthly Sales for the current year
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const salesAggregation = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear },
          orderStatus: { $ne: "Cancelled" }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$grandTotal" }
        }
      }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesData = monthNames.map((month) => ({ month, sales: 0 }));
    salesAggregation.forEach((item) => {
      const monthIndex = item._id - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        salesData[monthIndex].sales = Math.round(item.sales);
      }
    });

    // 3. Order Status Distribution (for Pie Chart)
    const statusAggregation = await orderModel.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          value: { $sum: 1 }
        }
      }
    ]);

    const statusColors = {
      "Delivered": "#2BB673",
      "Shipped": "#0F6CBD",
      "Processing": "#6366f1",
      "Packed": "#6366f1",
      "Confirmed": "#f59e0b",
      "Pending": "#fb923c",
      "Cancelled": "#E53935"
    };

    let pieData = statusAggregation.map((item) => ({
      name: item._id,
      value: item.value,
      fill: statusColors[item._id] || "#cccccc"
    }));

    if (pieData.length === 0) {
      pieData = [
        { name: "Pending", value: 0, fill: "#fb923c" },
        { name: "Delivered", value: 0, fill: "#2BB673" }
      ];
    }

    // 4. Activity Timeline from recent creations
    const recentProducts = await productModel.find().sort({ createdAt: -1 }).limit(5);
    const recentOrders = await orderModel.find().sort({ createdAt: -1 }).limit(5);
    const recentBlogs = await blogModel.find().sort({ createdAt: -1 }).limit(5);
    const recentCategories = await categoryModel.find().sort({ createdAt: -1 }).limit(5);

    const timelineItems = [];

    recentProducts.forEach((p) => {
      timelineItems.push({
        id: `prod-${p._id}`,
        action: "New product added",
        description: `Product "${p.title}" added to inventory`,
        timestamp: p.createdAt,
        type: "product"
      });
    });

    recentOrders.forEach((o) => {
      timelineItems.push({
        id: `ord-${o._id}`,
        action: "New order received",
        description: `Order #${o._id.toString().slice(-6).toUpperCase()} by ${o.shippingAddress?.fullName || "Customer"}`,
        timestamp: o.createdAt,
        type: "order"
      });
    });

    recentBlogs.forEach((b) => {
      timelineItems.push({
        id: `blog-${b._id}`,
        action: "Blog published",
        description: `"${b.title}" was published`,
        timestamp: b.createdAt,
        type: "blog"
      });
    });

    recentCategories.forEach((c) => {
      timelineItems.push({
        id: `cat-${c._id}`,
        action: "Category added",
        description: `Category "${c.title}" was created`,
        timestamp: c.createdAt,
        type: "category"
      });
    });

    timelineItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const timeline = timelineItems.slice(0, 8).map((item) => ({
      id: item.id,
      action: item.action,
      description: item.description,
      time: formatRelativeTime(item.timestamp),
      type: item.type
    }));

    res.status(200).json({
      stats,
      salesData,
      pieData,
      timeline
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getDashboardData };
