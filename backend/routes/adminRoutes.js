const express = require("express");

const {
    getDashboardStats,
    getAllOrders,
    getOrderDetails,
    updateOrderStatus
} = require("../controllers/adminController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard stats
router.get("/dashboard/stats", protect, adminOnly, getDashboardStats);

// All orders
router.get("/orders", protect, adminOnly, getAllOrders);

// Order details
router.get(
    "/orders/:id",
    protect,
    adminOnly,
    getOrderDetails
);

// Update order status
router.put(
    "/orders/:id/status",
    protect,
    adminOnly,
    updateOrderStatus
);

module.exports = router;