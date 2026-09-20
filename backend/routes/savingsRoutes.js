const express = require("express");
const Transaction = require("../models/Transaction");
const Goal = require("../models/Goal");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const goals = await Goal.find();

        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            }

            if (transaction.type === "expense") {
                totalExpenses += transaction.amount;
            }
        });

        const totalSavings = totalIncome - totalExpenses;

        const savingsPercentage =
            totalIncome > 0
                ? (totalSavings / totalIncome) * 100
                : 0;

        const goalProgress = goals.map((goal) => {
            const progress =
                goal.targetAmount > 0
                    ? (goal.currentAmount / goal.targetAmount) * 100
                    : 0;

            return {
                name: goal.name,
                targetAmount: goal.targetAmount,
                currentAmount: goal.currentAmount,
                progressPercentage: Math.round(progress)
            };
        });

        res.json({
            totalIncome,
            totalExpenses,
            totalSavings,
            savingsPercentage: Math.round(savingsPercentage),
            goalProgress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;