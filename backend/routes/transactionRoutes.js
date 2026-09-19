const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Add a transaction
router.post("/", async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.json(transactions);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;