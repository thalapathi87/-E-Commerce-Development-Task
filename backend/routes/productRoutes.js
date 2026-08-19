const express = require("express");
const validate = require("../middleware/validationMiddleware");

const {
    productSchema,
    updateProductSchema
} = require("../validators/validationSchemas");
const {
    productQuerySchema
} = require("../validators/validationSchemas");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", validate(productQuerySchema, { source: "query" }), getProducts);
router.get("/:id", getProductById);

// Admin
router.post("/", protect, adminOnly, validate(productSchema), createProduct);
router.put("/:id", protect, adminOnly, validate(updateProductSchema), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;