import { useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard({
  transactions,
  budgets,
  goals,
  totals,
}) {
  const expenseByCategory = useMemo(() => {
    const categoryTotals = {};

    transactions
      .filter((transaction) => transaction.type === "Debit")
      .forEach((transaction) => {
        const category = transaction.category || "Other";

        categoryTotals[category] =
          (categoryTotals[category] || 0) +
          Number(transaction.amount);
      });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const budgetChartData = useMemo(() => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter(
          (transaction) =>
            transaction.type === "Debit" &&
            transaction.category === budget.category
        )
        .reduce(
          (total, transaction) =>
            total + Number(transaction.amount),
          0
        );

      return {
        category: budget.category,
        spent,
        limit: Number(budget.limit),
      };
    });
  }, [budgets, transactions]);

  const totalGoalSaved = goals.reduce(
    (total, goal) => total + Number(goal.saved),
    0
  );

  const totalGoalTarget = goals.reduce(
    (total, goal) => total + Number(goal.target),
    0
  );

  const goalPercentage =
    totalGoalTarget > 0
      ? Math.round((totalGoalSaved / totalGoalTarget) * 100)
      : 0;

  const recentTransactions = transactions.slice(0, 5);

  const PIE_COLORS = [
    "#f97316",
    "#3b82f6",
    "#22c55e",
    "#a855f7",
    "#ef4444",
    "#eab308",
    "#14b8a6",
    "#ec4899",
  ];

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>
            Here's an overview of your financial activity.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card summary-card">
          <span>Total Income</span>

          <strong className="amount-income">
            ₹{totals.income.toLocaleString("en-IN")}
          </strong>

          <small>Money received</small>
        </div>

        <div className="card summary-card">
          <span>Total Expenses</span>

          <strong className="amount-expense">
            ₹{totals.expenses.toLocaleString("en-IN")}
          </strong>

          <small>Money spent</small>
        </div>

        <div className="card summary-card">
          <span>Net Savings</span>

          <strong>
            ₹{totals.savings.toLocaleString("en-IN")}
          </strong>

          <small>Income minus expenses</small>
        </div>

        <div className="card summary-card">
          <span>Savings Goals</span>

          <strong>{goalPercentage}%</strong>

          <small>
            ₹{totalGoalSaved.toLocaleString("en-IN")} saved
          </small>
        </div>
      </div>

      {/* Charts */}
      <div className="dashboard-grid">
        {/* Expense Breakdown */}
        <div className="card chart-card">
          <div className="card-title-row">
            <div>
              <h3>Expense Breakdown</h3>
              <p>Where your money is going</p>
            </div>
          </div>

          {expenseByCategory.length === 0 ? (
            <div className="empty-state">
              <p>No expense data available yet.</p>
            </div>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {expenseByCategory.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PIE_COLORS[
                              index % PIE_COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString(
                        "en-IN"
                      )}`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Budget Overview */}
        <div className="card chart-card">
          <div className="card-title-row">
            <div>
              <h3>Budget Overview</h3>
              <p>Spending versus your limits</p>
            </div>
          </div>

          {budgetChartData.length === 0 ? (
            <div className="empty-state">
              <p>No budgets available yet.</p>
            </div>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={budgetChartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="category" />

                  <YAxis />

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString(
                        "en-IN"
                      )}`
                    }
                  />

                  <Bar
                    dataKey="spent"
                    name="Spent"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="limit"
                    name="Limit"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Savings Progress */}
      <div className="card">
        <div className="card-title-row">
          <div>
            <h3>Savings Goals Progress</h3>

            <p>
              {goals.length} active goal
              {goals.length !== 1 ? "s" : ""}
            </p>
          </div>

          <strong>{goalPercentage}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(
                goalPercentage,
                100
              )}%`,
            }}
          ></div>
        </div>

        <p className="budget-status">
          ₹{totalGoalSaved.toLocaleString("en-IN")} saved
          of ₹{totalGoalTarget.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="card-title-row">
          <div>
            <h3>Recent Transactions</h3>
            <p>Your latest financial activity</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="empty-state"
                  >
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                recentTransactions.map(
                  (transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <strong>
                          {transaction.merchant}
                        </strong>
                      </td>

                      <td>
                        {transaction.category}
                      </td>

                      <td>
                        <strong
                          className={
                            transaction.type === "Credit"
                              ? "amount-income"
                              : "amount-expense"
                          }
                        >
                          {transaction.type === "Credit"
                            ? "+"
                            : "-"}
                          ₹
                          {Number(
                            transaction.amount
                          ).toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={
                            transaction.type === "Credit"
                              ? "badge income"
                              : "badge expense"
                          }
                        >
                          {transaction.type === "Credit"
                            ? "Income"
                            : "Expense"}
                        </span>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}