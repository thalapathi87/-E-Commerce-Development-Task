const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const seedCategories = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const categories = [
        { name: "Electronics", description: "Electronic devices and gadgets" },
        { name: "Fashion", description: "Clothing and accessories" },
        { name: "Shoes", description: "Footwear for all occasions" },
        { name: "Accessories", description: "Watches, bags, and more" },
        { name: "Home", description: "Home decor and furniture" },
        { name: "Beauty", description: "Beauty and personal care" },
        { name: "Sports", description: "Sports equipment and gear" },
        { name: "Grocery", description: "Food and daily essentials" },
        { name: "Books", description: "Books and stationery" },
        { name: "Gaming", description: "Video games and consoles" }
    ];

    for (const category of categories) {
        const exists = await Category.findOne({ name: category.name });
        if (!exists) {
            await Category.create(category);
            console.log(`Created category: ${category.name}`);
        } else {
            console.log(`Category already exists: ${category.name}`);
        }
    }

    console.log("Category seeding completed.");
};

module.exports = seedCategories;
