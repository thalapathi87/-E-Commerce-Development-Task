const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
        console.log("Admin user already exists.");
        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
    });

    console.log("Admin user created successfully.");
    console.log("Email:", adminEmail);
};

module.exports = seedAdmin;
