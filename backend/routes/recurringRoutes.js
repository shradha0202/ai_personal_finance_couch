const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find({
            type: "expense"
        });

        const merchantMap = {};

        transactions.forEach((transaction) => {
            const merchant = transaction.merchant;

            if (!merchant) return;

            if (!merchantMap[merchant]) {
                merchantMap[merchant] = [];
            }

            merchantMap[merchant].push(transaction);
        });

        const recurringExpenses = [];

        for (const merchant in merchantMap) {
            const transactions = merchantMap[merchant];

            if (transactions.length >= 2) {
                const amounts = transactions.map(
                    (transaction) => transaction.amount
                );

                const averageAmount =
                    amounts.reduce((sum, amount) => sum + amount, 0) /
                    amounts.length;

                recurringExpenses.push({
                    merchant,
                    occurrences: transactions.length,
                    averageAmount: Math.round(averageAmount),
                    frequency: "recurring"
                });
            }
        }

        res.json(recurringExpenses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;