const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const { getDashboardData } = require("../controller/dashboard.controller");

router.get("/stats", authMiddleware, getDashboardData);

module.exports = router;
