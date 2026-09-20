import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import SavingsGoals from "./pages/SavingsGoals";
import AICoach from "./pages/AICoach";

const initialTransactions = [
  {
    id: 1,
    merchant: "Swiggy",
    category: "Food",
    amount: 420,
    type: "Debit",
    date: "20 Sep 2026",
  },
  {
    id: 2,
    merchant: "Amazon",
    category: "Shopping",
    amount: 1299,
    type: "Debit",
    date: "19 Sep 2026",
  },
  {
    id: 3,
    merchant: "Salary",
    category: "Income",
    amount: 50000,
    type: "Credit",
    date: "18 Sep 2026",
  },
  {
    id: 4,
    merchant: "Netflix",
    category: "Entertainment",
    amount: 649,
    type: "Debit",
    date: "17 Sep 2026",
  },
  {
    id: 5,
    merchant: "Uber",
    category: "Transport",
    amount: 280,
    type: "Debit",
    date: "16 Sep 2026",
  },
];

const initialBudgets = [
  {
    id: 1,
    category: "Food",
    limit: 5000,
  },
  {
    id: 2,
    category: "Shopping",
    limit: 4000,
  },
  {
    id: 3,
    category: "Transport",
    limit: 3000,
  },
  {
    id: 4,
    category: "Entertainment",
    limit: 2000,
  },
];

const initialGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 100000,
    saved: 40000,
  },
  {
    id: 2,
    name: "Laptop",
    target: 60000,
    saved: 25000,
  },
];

function loadData(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);

    if (saved) {
      return JSON.parse(saved);
    }

    return defaultValue;
  } catch {
    return defaultValue;
  }
}

export default function App() {
  // -----------------------------
  // GLOBAL TRANSACTIONS
  // -----------------------------

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions"
      );

      const data = await response.json();

      const formattedTransactions = data.map((transaction) => ({
        id: transaction._id,
        merchant: transaction.merchant || "Unknown",
        category: transaction.category,
        amount: transaction.amount,
        type:
          transaction.type === "income"
            ? "Credit"
            : "Debit",
        date: new Date(transaction.date).toLocaleDateString(
          "en-IN"
        ),
      }));

      setTransactions(formattedTransactions);

    } catch (error) {
      console.error(
        "Failed to fetch transactions:",
        error
      );
    }
  };

  fetchTransactions();
}, []);

  // -----------------------------
  // GLOBAL BUDGETS
  // -----------------------------

  const [budgets, setBudgets] = useState([]);
  useEffect(() => {
  const fetchBudgets = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/budgets"
      );

      const data = await response.json();

      const formattedBudgets = data.map((budget) => ({
        id: budget._id,
        category: budget.category,
        limit: Number(budget.limit),
      }));

      setBudgets(formattedBudgets);

    } catch (error) {
      console.error(
        "Failed to fetch budgets:",
        error
      );
    }
  };

  fetchBudgets();
}, []);

  // -----------------------------
  // GLOBAL SAVINGS GOALS
  // -----------------------------

  const [goals, setGoals] = useState([]);
  useEffect(() => {
  const fetchGoals = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/goals"
      );

      const data = await response.json();

      const formattedGoals = data.map((goal) => ({
        id: goal._id,
        name: goal.name,
        target: Number(goal.targetAmount),
        saved: Number(goal.currentAmount),
        deadline: goal.deadline,
      }));

      setGoals(formattedGoals);

    } catch (error) {
      console.error(
        "Failed to fetch goals:",
        error
      );
    }
  };

  fetchGoals();
}, []);
  // -----------------------------
  // SAVE TRANSACTIONS
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "finance_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // -----------------------------
  // SAVE BUDGETS
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "finance_budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  // -----------------------------
  // SAVE GOALS
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "finance_goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  // -----------------------------
  // FINANCIAL TOTALS
  // -----------------------------

  const totals = useMemo(() => {
    const income = transactions
      .filter(
        (transaction) =>
          transaction.type === "Credit"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

    const expenses = transactions
      .filter(
        (transaction) =>
          transaction.type === "Debit"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

    const savings = income - expenses;

    return {
      income,
      expenses,
      savings,
    };
  }, [transactions]);

  // =============================
  // TRANSACTION FUNCTIONS
  // =============================

  const addTransaction = (transaction) => {
    setTransactions((previous) => [
      {
        ...transaction,
        id: Date.now(),
        amount: Number(transaction.amount),
      },
      ...previous,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter(
        (transaction) =>
          transaction.id !== id
      )
    );
  };

  const renameTransaction = (
    id,
    newMerchant
  ) => {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              merchant: newMerchant,
            }
          : transaction
      )
    );
  };

  // =============================
  // BUDGET FUNCTIONS
  // =============================

  const addBudget = (budget) => {
    setBudgets((previous) => [
      ...previous,
      {
        ...budget,
        id: Date.now(),
        limit: Number(budget.limit),
      },
    ]);
  };

  const updateBudget = (
    id,
    newLimit
  ) => {
    setBudgets((previous) =>
      previous.map((budget) =>
        budget.id === id
          ? {
              ...budget,
              limit: Number(newLimit),
            }
          : budget
      )
    );
  };

  const deleteBudget = (id) => {
    setBudgets((previous) =>
      previous.filter(
        (budget) =>
          budget.id !== id
      )
    );
  };

  // =============================
  // SAVINGS GOAL FUNCTIONS
  // =============================

  const addGoal = (goal) => {
    setGoals((previous) => [
      ...previous,
      {
        ...goal,
        id: Date.now(),
        target: Number(goal.target),
        saved: Number(goal.saved || 0),
      },
    ]);
  };

  const updateGoal = (
    id,
    newSaved
  ) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              saved: Number(newSaved),
            }
          : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((previous) =>
      previous.filter(
        (goal) =>
          goal.id !== id
      )
    );
  };

  // =============================
  // SEND EVERYTHING TO PAGES
  // =============================

  const sharedData = {
    transactions,
    budgets,
    goals,
    totals,

    addTransaction,
    deleteTransaction,
    renameTransaction,

    addBudget,
    updateBudget,
    deleteBudget,

    addGoal,
    updateGoal,
    deleteGoal,
  };

  return (
    <Layout>

      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
              {...sharedData}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              {...sharedData}
            />
          }
        />

        <Route
          path="/transactions"
          element={
            <Transactions
              {...sharedData}
            />
          }
        />

        <Route
          path="/budget"
          element={
            <Budget
              {...sharedData}
            />
          }
        />

        <Route
          path="/savings-goals"
          element={
            <SavingsGoals
              {...sharedData}
            />
          }
        />

        <Route
          path="/ai-coach"
          element={
            <AICoach
              {...sharedData}
            />
          }
        />

      </Routes>

    </Layout>
  );
}