const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const validate = require("../middleware/validationMiddleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/validationSchemas");

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser
);

router.post(
    "/login",
    validate(loginSchema),
    loginUser
);

module.exports = router;