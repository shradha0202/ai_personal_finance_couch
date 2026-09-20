require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes=require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const recurringRoutes = require("./routes/recurringRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const budgetAnalysisRoutes = require("./routes/budgetAnalysisRoutes");
const savingsRoutes = require("./routes/savingsRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use("/api/transactions",transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recurring", recurringRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/budget-analysis", budgetAnalysisRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.send("Finance Coach Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});