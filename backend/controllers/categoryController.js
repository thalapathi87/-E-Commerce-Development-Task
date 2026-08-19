const Category = require("../models/Category");
const Product = require("../models/Product");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return errorResponse(res, 400, "Category already exists");
        }

        const category = await Category.create({
            name,
            description
        });

        return successResponse(res, 201, "Category created successfully", { category });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};


// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return successResponse(res, 200, "Categories fetched successfully", {
            count: categories.length,
            categories
        });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// Get Category By ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return errorResponse(res, 404, "Category not found");
        }

        return successResponse(res, 200, "Category fetched successfully", { category });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!category) {
            return errorResponse(res, 404, "Category not found");
        }

        return successResponse(res, 200, "Category updated successfully", { category });

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

// Delete Category with safety check
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const productCount = await Product.countDocuments({ category: categoryId });

        if (productCount > 0) {
            return errorResponse(res, 409, `Cannot delete category. ${productCount} product(s) are using this category. Remove or reassign them first.`);
        }

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return errorResponse(res, 404, "Category not found");
        }

        return successResponse(res, 200, "Category deleted successfully");

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};