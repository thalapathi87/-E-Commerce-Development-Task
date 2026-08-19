const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            });
        } else {
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                if (
                    product.stock <
                    existingItem.quantity + quantity
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient stock"
                    });
                }

                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity
                });
            }

            await cart.save();
        }

        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET CART
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    items: []
                }
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE QUANTITY
const updateCartQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            (item) =>
                item.product.toString() === req.params.productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        const product = await Product.findById(
            req.params.productId
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        item.quantity = quantity;

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemExists = cart.items.some(
            (item) =>
                item.product.toString() === req.params.productId
        );

        if (!itemExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                item.product.toString() !== req.params.productId
        );

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
};