const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
    {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with excellent sound quality.",
        price: 2499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        stock: 25,
        rating: 4.7
    },

    {
        name: "Smart Watch",
        description: "Modern smartwatch for fitness and everyday use.",
        price: 3299,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        stock: 20,
        rating: 4.6
    },

    {
        name: "Classic Denim Jacket",
        description: "Stylish classic denim jacket for everyday wear.",
        price: 1999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
        stock: 15,
        rating: 4.5
    },

    {
        name: "Running Sneakers",
        description: "Comfortable running sneakers designed for daily workouts.",
        price: 2799,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        stock: 30,
        rating: 4.8
    },

    {
        name: "Leather Backpack",
        description: "Premium backpack suitable for college, work and travel.",
        price: 1599,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
        stock: 18,
        rating: 4.4
    },

    {
        name: "Premium Sunglasses",
        description: "Stylish sunglasses with a premium modern design.",
        price: 999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
        stock: 40,
        rating: 4.3
    },

    {
        name: "Oversized T-Shirt",
        description: "Comfortable oversized cotton t-shirt.",
        price: 799,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
        stock: 50,
        rating: 4.5
    },

    {
        name: "Sports Sneakers",
        description: "Lightweight sports sneakers for everyday activities.",
        price: 2499,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
        stock: 22,
        rating: 4.6
    }
];

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products added successfully!");

        await mongoose.disconnect();

        console.log("Database connection closed");

    } catch (error) {

        console.error("Error:", error.message);

        process.exit(1);
    }
}

seedDatabase();
