const mongoose = require("mongoose");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        return successResponse(res, 201, "Product created successfully", { product });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// GET ALL PRODUCTS WITH SEARCH, FILTER, SORT, PAGINATION
const getProducts = async (req, res) => {
    try {
        const {
            search = "",
            category = "",
            minPrice = "",
            maxPrice = "",
            sort = "newest",
            page = "1",
            limit = "12",
            inStock = ""
        } = req.query;

        const query = {};

        // Search by name or description
        if (search.trim()) {
            query.$text = { $search: search.trim() };
        }

        // Category filter
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            query.category = category;
        }

        // Price range filter
        if (minPrice !== "" || maxPrice !== "") {
            query.price = {};
            if (minPrice !== "") {
                const min = Number(minPrice);
                if (isNaN(min) || min < 0) {
                    return errorResponse(res, 400, "Invalid minPrice");
                }
                query.price.$gte = min;
            }
            if (maxPrice !== "") {
                const max = Number(maxPrice);
                if (isNaN(max) || max < 0) {
                    return errorResponse(res, 400, "Invalid maxPrice");
                }
                query.price.$lte = max;
            }
            if (query.price.$gte !== undefined && query.price.$lte !== undefined && query.price.$gte > query.price.$lte) {
                return errorResponse(res, 400, "minPrice cannot be greater than maxPrice");
            }
        }

        // In stock filter
        if (inStock === "true") {
            query.stock = { $gt: 0 };
        }

        // Pagination
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
        const skip = (pageNum - 1) * limitNum;

        // Sorting
        const sortMap = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            name_asc: { name: 1 },
            name_desc: { name: -1 }
        };

        const sortOption = sortMap[sort] || sortMap.newest;

        // Execute queries
        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .populate("category", "name")
                .sort(sortOption)
                .skip(skip)
                .limit(limitNum),
            Product.countDocuments(query)
        ]);

        const totalPages = Math.max(1, Math.ceil(totalProducts / limitNum));

        // Maintain backward compatibility with existing frontend
        return res.status(200).json({
            success: true,
            count: products.length,
            products,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalProducts,
                totalPages,
                hasNextPage: pageNum < totalPages,
                hasPreviousPage: pageNum > 1
            }
        });

    } catch (error) {
        console.error("getProducts error:", {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        return errorResponse(res, 500, error.message);
    }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, 400, "Invalid product ID");
        }

        const product = await Product.findById(id)
            .populate("category", "name");

        if (!product) {
            return errorResponse(res, 404, "Product not found");
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        ).populate("category", "name");

        if (!product) {
            return errorResponse(res, 404, "Product not found");
        }

        return successResponse(res, 200, "Product updated successfully", { product });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return errorResponse(res, 404, "Product not found");
        }

        return successResponse(res, 200, "Product deleted successfully");

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
