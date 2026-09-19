const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        let totalIncome = 0;
        let totalExpenses = 0;
        const categorySpending = {};

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            }

            if (transaction.type === "expense") {
                totalExpenses += transaction.amount;

                if (!categorySpending[transaction.category]) {
                    categorySpending[transaction.category] = 0;
                }

                categorySpending[transaction.category] += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpenses;

        res.json({
            totalIncome,
            totalExpenses,
            balance,
            categorySpending
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;