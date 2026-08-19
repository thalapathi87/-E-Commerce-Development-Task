const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || process.env.NODE_ENV === "development") {
            return callback(null, true);
        }

        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "https://*.vercel.app",
            "https://*.vercel.sh"
        ].filter(Boolean);

        if (allowedOrigins.some((allowed) => origin.match(allowed))) {
            return callback(null, true);
        }

        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400
};

app.use(cors(corsOptions));

// Global Middleware
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Commerce Backend API is running"
    });
});

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend API is running"
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Only start server when running directly (local development)
// Vercel will import the app instead
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown handlers
    process.on("unhandledRejection", (err, reason) => {
        console.error("Unhandled Rejection:", err);
        server.close(() => {
            process.exit(1);
        });
    });

    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
        server.close(() => {
            process.exit(1);
        });
    });
}

module.exports = app;
