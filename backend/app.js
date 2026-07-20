const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require("./src/auth/routes/auth.routes");
const productRoutes = require("./src/product/routes/product.routes");
const categoryRoutes = require("./src/category/routes/category.routes");
const blogRoutes = require("./src/blog/routes/blog.routes");
const orderRoutes = require("./src/order/routes/order.routes");
const userRoutes = require("./src/user/routes/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running ✅" });
});

module.exports = app;