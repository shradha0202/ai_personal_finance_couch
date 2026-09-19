const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        let totalIncome = 0;
        let totalExpenses = 0;

        const categorySpending = {};
        const monthlySpending = {};
        const merchantFrequency = {};

        transactions.forEach((transaction) => {

            // Total income
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            }

            // Total expenses
            if (transaction.type === "expense") {
                totalExpenses += transaction.amount;

                // Category-wise spending
                if (!categorySpending[transaction.category]) {
                    categorySpending[transaction.category] = 0;
                }

                categorySpending[transaction.category] += transaction.amount;

                // Merchant frequency
                if (transaction.merchant) {
                    if (!merchantFrequency[transaction.merchant]) {
                        merchantFrequency[transaction.merchant] = 0;
                    }

                    merchantFrequency[transaction.merchant]++;
                }

                // Monthly spending
                const month = new Date(transaction.date)
                    .toISOString()
                    .slice(0, 7);

                if (!monthlySpending[month]) {
                    monthlySpending[month] = 0;
                }

                monthlySpending[month] += transaction.amount;
            }
        });

        // Find top spending category
        let topCategory = null;
        let highestSpending = 0;

        for (const category in categorySpending) {
            if (categorySpending[category] > highestSpending) {
                highestSpending = categorySpending[category];
                topCategory = category;
            }
        }

        const balance = totalIncome - totalExpenses;

        res.json({
            totalIncome,
            totalExpenses,
            balance,
            categorySpending,
            monthlySpending,
            merchantFrequency,
            topCategory
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;