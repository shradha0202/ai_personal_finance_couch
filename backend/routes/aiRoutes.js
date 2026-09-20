const express = require("express");
const Transaction = require("../models/Transaction");
const Goal = require("../models/Goal");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        // Get only the goal fields needed by the AI
        const goals = await Goal.find().select(
            "name targetAmount currentAmount deadline"
        );

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

        // Detect potential recurring expenses
        const merchantMap = {};

        transactions.forEach((transaction) => {

            if (transaction.type === "expense" && transaction.merchant) {

                if (!merchantMap[transaction.merchant]) {
                    merchantMap[transaction.merchant] = [];
                }

                merchantMap[transaction.merchant].push(transaction);
            }
        });

        const recurringExpenses = [];

        for (const merchant in merchantMap) {

            const merchantTransactions = merchantMap[merchant];

            if (merchantTransactions.length >= 2) {

                const amounts = merchantTransactions.map(
                    (transaction) => transaction.amount
                );

                const averageAmount =
                    amounts.reduce((sum, amount) => sum + amount, 0) /
                    amounts.length;

                recurringExpenses.push({
                    merchant,
                    occurrences: merchantTransactions.length,
                    averageAmount: Math.round(averageAmount)
                });
            }
        }

        // Calculate savings
        const balance = totalIncome - totalExpenses;

        const totalSavings = totalIncome - totalExpenses;

        const savingsPercentage =
            totalIncome > 0
                ? (totalSavings / totalIncome) * 100
                : 0;

        // Find highest spending category
        let topCategory = null;
        let highestSpending = 0;

        for (const category in categorySpending) {

            if (categorySpending[category] > highestSpending) {
                highestSpending = categorySpending[category];
                topCategory = category;
            }
        }

        // Structured financial data sent to AI
        const financialData = {
            totalIncome,
            totalExpenses,
            balance,
            totalSavings,
            savingsPercentage: Math.round(savingsPercentage),
            categorySpending,
            topCategory,
            recurringExpenses,
            goals
        };

        const prompt = `
You are an AI Personal Finance Coach.

Analyze the user's financial information provided below.

${JSON.stringify(financialData, null, 2)}

Provide practical, simple and personalized financial guidance.

Focus on:
1. Overall spending pattern
2. Highest spending category
3. Potential recurring expenses
4. Current savings situation
5. Savings goals
6. One or two practical actions the user can take

Rules:
- Use only the information provided.
- Do not invent transactions, expenses or income.
- Do not make unsupported assumptions.
- Do not give investment, loan or high-risk financial advice.
- Do not perform unnecessary calculations.
- Keep the advice concise and easy to understand.
- Clearly describe recurring expenses as "potential recurring expenses" because they are detected from repeated merchants.

Give the response as 4 to 6 short bullet points.
`;

        // Try Gemini AI
        try {

            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt
            });

            res.json({
                financialData,
                aiAvailable: true,
                aiAdvice: response.text
            });

        } catch (error) {

            // Gemini unavailable → use fallback advice
            console.error("Gemini error:", error.message);

            res.json({
                financialData,
                aiAvailable: false,
                aiAdvice: [
                    `Your highest spending category is ${topCategory}.`,
                    `Your current balance is ₹${balance}.`,
                    recurringExpenses.length > 0
                        ? `Potential recurring expenses detected: ${recurringExpenses
                              .map(item => item.merchant)
                              .join(", ")}.`
                        : "No potential recurring expenses were detected.",
                    "Consider reducing spending in your highest expense category.",
                    "Review your savings goals and set aside money regularly."
                ]
            });
        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;