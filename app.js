const express = require("express");
require("dotenv").config();

require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Request Received:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Body:", req.body);
    next();
});

app.get("/", (req, res) => {
    res.send("🚀 Welcome to UserHub API");
});

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=========================================");
    console.log("🚀 UserHub API Server Started");
    console.log("=========================================");
    console.log(`🌐 Server URL : http://localhost:${PORT}`);
    console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
    console.log("=========================================");
});