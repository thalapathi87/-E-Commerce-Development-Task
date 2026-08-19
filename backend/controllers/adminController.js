const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {
    try {
        const [
            totalProducts,
            totalCategories,
            totalOrders,
            totalUsers,
            totalRevenueResult,
            pendingOrders,
            confirmedOrders,
            shippedOrders,
            deliveredOrders,
            lowStockProducts
        ] = await Promise.all([
            Product.countDocuments(),
            Category.countDocuments(),
            Order.countDocuments(),
            User.countDocuments(),
            Order.aggregate([
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]),
            Order.countDocuments({ orderStatus: "Pending" }),
            Order.countDocuments({ orderStatus: "Confirmed" }),
            Order.countDocuments({ orderStatus: "Shipped" }),
            Order.countDocuments({ orderStatus: "Delivered" }),
            Product.countDocuments({ stock: { $lte: 5 } })
        ]);

        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

        const recentOrders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalCategories,
                totalOrders,
                totalUsers,
                totalRevenue,
                pendingOrders,
                confirmedOrders,
                shippedOrders,
                deliveredOrders,
                lowStockProducts
            },
            recentOrders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name image")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ORDER BY ID
const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("items.product", "name image");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                orderStatus: status
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllOrders,
    getOrderDetails,
    updateOrderStatus
};