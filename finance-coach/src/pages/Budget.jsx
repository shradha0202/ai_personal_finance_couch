import { useMemo, useState } from "react";

export default function Budget({
  budgets,
  transactions,
  addBudget,
  updateBudget,
  deleteBudget,
}) {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  const categories = [
    "Food",
    "Shopping",
    "Transport",
    "Entertainment",
    "Bills",
    "Other",
  ];

  const budgetData = useMemo(() => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter(
          (transaction) =>
            transaction.type === "Debit" &&
            transaction.category === budget.category
        )
        .reduce(
          (total, transaction) => total + Number(transaction.amount),
          0
        );

      const percentage =
        budget.limit > 0
          ? Math.min((spent / budget.limit) * 100, 100)
          : 0;

      return {
        ...budget,
        spent,
        percentage,
      };
    });
  }, [budgets, transactions]);

  const handleAddBudget = (e) => {
    e.preventDefault();

    if (!limit || Number(limit) <= 0) {
      alert("Please enter a valid budget limit.");
      return;
    }

    const alreadyExists = budgets.some(
      (budget) => budget.category === category
    );

    if (alreadyExists) {
      alert(`A budget for ${category} already exists.`);
      return;
    }

    addBudget({
      category,
      limit: Number(limit),
    });

    setCategory("Food");
    setLimit("");
    setShowForm(false);
  };

  const handleUpdateBudget = (budget) => {
    const newLimit = window.prompt(
      `Enter new budget limit for ${budget.category}:`,
      budget.limit
    );

    if (newLimit === null) return;

    if (!newLimit || Number(newLimit) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    updateBudget(budget.id, Number(newLimit));
  };

  const handleDeleteBudget = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (confirmed) {
      deleteBudget(id);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Budget</h2>
          <p>Set spending limits and monitor your progress.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          ＋ Add Budget
        </button>
      </div>

      <div className="budget-grid">
        {budgetData.length === 0 ? (
          <div className="card empty-state">
            <h3>No budgets yet</h3>
            <p>Create your first budget to start tracking spending.</p>

            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              Add Budget
            </button>
          </div>
        ) : (
          budgetData.map((budget) => {
            const isOverBudget = budget.spent > budget.limit;

            return (
              <div className="card budget-card" key={budget.id}>
                <div className="card-title-row">
                  <div>
                    <h3>{budget.category}</h3>
                    <p>Monthly spending limit</p>
                  </div>

                  <span
                    className={
                      isOverBudget
                        ? "badge expense"
                        : "badge income"
                    }
                  >
                    {isOverBudget ? "Over Budget" : "On Track"}
                  </span>
                </div>

                <div className="budget-amounts">
                  <div>
                    <span>Spent</span>
                    <strong>
                      ₹{budget.spent.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Limit</span>
                    <strong>
                      ₹{budget.limit.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${budget.percentage}%`,
                    }}
                  ></div>
                </div>

                <p className="budget-status">
                  {isOverBudget
                    ? `₹${(
                        budget.spent - budget.limit
                      ).toLocaleString("en-IN")} over budget`
                    : `₹${(
                        budget.limit - budget.spent
                      ).toLocaleString("en-IN")} remaining`}
                </p>

                <div className="action-buttons">
                  <button
                    className="small-button ghost"
                    onClick={() => handleUpdateBudget(budget)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteBudget(budget.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>Add Budget</h3>
                <p>Create a monthly spending limit.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddBudget}>
              <label>Category</label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label>Monthly Limit</label>

              <input
                type="number"
                min="1"
                placeholder="Example: 5000"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}