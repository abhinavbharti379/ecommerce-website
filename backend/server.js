const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ShopEase backend is running 🚀"
    });
});


// ================= MONGODB =================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log(
                "Server running at http://localhost:5000"
            );
        });
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });
