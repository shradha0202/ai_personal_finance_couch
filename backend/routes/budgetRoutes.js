const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

// Add a budget
router.post("/", async (req, res) => {
    try {
        const budget = await Budget.create(req.body);

        res.status(201).json(budget);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all budgets
router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find();

        res.json(budgets);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update a budget
router.put("/:id", async (req, res) => {
    try {
        const budget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        res.json(budget);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
    try {
        const budget = await Budget.findByIdAndDelete(req.params.id);

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        res.json({
            message: "Budget deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;