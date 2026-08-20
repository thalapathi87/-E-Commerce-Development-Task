const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(6)
        .max(30)
        .required()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .required()
});

const productSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .min(5)
        .required(),

    price: Joi.number()
        .min(0)
        .required(),

    image: Joi.string()
        .uri()
        .required(),

    category: Joi.string()
        .required(),

    stock: Joi.number()
        .integer()
        .min(0)
        .required()
});

const updateProductSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    description: Joi.string()
        .trim()
        .min(5),

    price: Joi.number()
        .min(0),

    image: Joi.string()
        .uri(),

    category: Joi.string(),

    stock: Joi.number()
        .integer()
        .min(0)
}).unknown(true);

const categorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    description: Joi.string()
        .trim()
        .max(200)
        .allow("")
});

const orderSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),

    address: Joi.string()
        .trim()
        .required(),

    city: Joi.string()
        .trim()
        .required(),

    state: Joi.string()
        .trim()
        .required(),

    pincode: Joi.string()
        .pattern(/^[0-9]{6}$/)
        .required(),

    paymentMethod: Joi.string()
        .valid("COD", "MOCK_PAYMENT")
        .default("COD"),

    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required()
        })
    ).optional()
});

const productQuerySchema = Joi.object({
    search: Joi.string().max(100),
    category: Joi.string().custom((value, helpers) => {
        if (value && !require("mongoose").Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    sort: Joi.string().valid("price_asc", "price_desc", "newest", "oldest", "name_asc", "name_desc"),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(50),
    inStock: Joi.string().valid("true", "false")
});

module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
    updateProductSchema,
    categorySchema,
    orderSchema,
    productQuerySchema
};