const mongoose = require("mongoose");
require("dotenv").config();

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        const seedCategories = require("./seedCategories");
        const seedProducts = require("./seedProducts");
        const seedAdmin = require("./seedAdmin");

        await seedCategories();
        await seedProducts();
        await seedAdmin();

        console.log("All seeding completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

runSeed();
