const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const productRoutes = require("./routes/products");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ShopEase API is running 🚀"
    });
});

app.use("/api/products", productRoutes);


// ================= DATABASE =================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(5000, () => {

            console.log(
                "Server running on http://localhost:5000"
            );

        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });
