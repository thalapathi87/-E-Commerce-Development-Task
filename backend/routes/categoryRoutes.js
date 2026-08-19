const express = require("express");

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    categorySchema
} = require("../validators/validationSchemas");

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin
router.post(
    "/",
    protect,
    adminOnly,
    validate(categorySchema),
    createCategory
);

router.put(
    "/:id",
    protect,
    adminOnly,
    validate(categorySchema),
    updateCategory
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCategory
);

module.exports = router;