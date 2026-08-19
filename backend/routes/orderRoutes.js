const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    orderSchema
} = require("../validators/validationSchemas");

const router = express.Router();

// Checkout / Create Order
router.post(
    "/",
    protect,
    validate(orderSchema),
    createOrder
);

// User Order History
router.get(
    "/my-orders",
    protect,
    getMyOrders
);

// Single Order
router.get(
    "/:id",
    protect,
    getOrderById
);

module.exports = router;