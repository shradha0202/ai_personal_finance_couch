const express = require("express");
const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find();
        const transactions = await Transaction.find({
            type: "expense"
        });

        const results = [];

        budgets.forEach((budget) => {

            let spent = 0;

            transactions.forEach((transaction) => {
                if (transaction.category === budget.category) {
                    spent += transaction.amount;
                }
            });

            const remaining = budget.limit - spent;

            let status = "under";

            if (spent > budget.limit) {
                status = "over";
            } else if (spent >= budget.limit * 0.8) {
                status = "near";
            }

            results.push({
                category: budget.category,
                budget: budget.limit,
                spent,
                remaining,
                status
            });
        });

        res.json(results);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;