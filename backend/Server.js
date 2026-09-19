require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes=require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use("/api/transactions",transactionRoutes);
app.use("/api/budgets", budgetRoutes);

app.get("/", (req, res) => {
    res.send("Finance Coach Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});