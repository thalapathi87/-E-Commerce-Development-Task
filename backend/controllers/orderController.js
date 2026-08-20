const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// CREATE ORDER / CHECKOUT
const createOrder = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            paymentMethod = "COD",
            items
        } = req.body;

        let orderItems = [];
        let totalAmount = 0;

        if (items && Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                const { productId, quantity = 1 } = item;

                let product;

                try {
                    product = await Product.findById(productId);
                } catch (error) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid product ID"
                    });
                }

                if (!product) {
                    return res.status(400).json({
                        success: false,
                        message: "Product not found"
                    });
                }

                if (product.stock < quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient stock for ${product.name}`
                    });
                }

                const subtotal = product.price * quantity;

                totalAmount += subtotal;

                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.image
                });
            }
        } else {
            const cart = await Cart.findOne({
                user: req.user.userId
            }).populate("items.product");

            if (!cart || cart.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Cart is empty"
                });
            }

            for (const item of cart.items) {
                const product = item.product;

                if (!product) {
                    return res.status(400).json({
                        success: false,
                        message: "Product not found"
                    });
                }

                if (product.stock < item.quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient stock for ${product.name}`
                    });
                }

                const subtotal = product.price * item.quantity;

                totalAmount += subtotal;

                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                    image: product.image
                });
            }
        }

        const order = await Order.create({
            user: req.user.userId,

            items: orderItems,

            customerInfo: {
                name,
                email,
                phone
            },

            deliveryAddress: {
                address,
                city,
                state,
                pincode
            },

            totalAmount,

            paymentMethod,

            paymentStatus:
                paymentMethod === "MOCK_PAYMENT"
                    ? "Paid"
                    : "Pending",

            orderStatus: "Pending"
        });

        if (items && Array.isArray(items) && items.length > 0) {
            for (const item of orderItems) {
                await Product.findByIdAndUpdate(
                    item.product,
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                );
            }
        } else {
            const cart = await Cart.findOne({
                user: req.user.userId
            });

            if (cart) {
                for (const item of cart.items) {
                    await Product.findByIdAndUpdate(
                        item.product._id || item.product,
                        {
                            $inc: {
                                stock: -item.quantity
                            }
                        }
                    );
                }

                cart.items = [];
                await cart.save();
            }
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET MY ORDERS
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId
        })
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


// GET SINGLE ORDER
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.userId
        }).populate("items.product", "name image");

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


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById
};