import { useMemo, useState } from "react";

export default function SavingsGoals({
  goals = [],
  addGoal,
  updateGoal,
  deleteGoal,
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  const goalData = useMemo(() => {
    return goals.map((goal) => {
      const targetAmount = Number(goal.target) || 0;
      const savedAmount = Number(goal.saved) || 0;

      const percentage =
        targetAmount > 0
          ? Math.min((savedAmount / targetAmount) * 100, 100)
          : 0;

      const remaining = Math.max(targetAmount - savedAmount, 0);

      return {
        ...goal,
        targetAmount,
        savedAmount,
        percentage,
        remaining,
      };
    });
  }, [goals]);

  const totalTarget = goals.reduce(
    (total, goal) => total + (Number(goal.target) || 0),
    0
  );

  const totalSaved = goals.reduce(
    (total, goal) => total + (Number(goal.saved) || 0),
    0
  );

  const handleAddGoal = (e) => {
    e.preventDefault();

    const targetAmount = Number(target);
    const savedAmount = Number(saved || 0);

    if (!name.trim()) {
      alert("Please enter a goal name.");
      return;
    }

    if (!target || targetAmount <= 0) {
      alert("Please enter a valid target amount.");
      return;
    }

    if (savedAmount < 0) {
      alert("Saved amount cannot be negative.");
      return;
    }

    if (savedAmount > targetAmount) {
      alert("Saved amount cannot be greater than the target.");
      return;
    }

    addGoal({
      name: name.trim(),
      target: targetAmount,
      saved: savedAmount,
    });

    setName("");
    setTarget("");
    setSaved("");
    setShowForm(false);
  };

  const handleUpdateGoal = (goal) => {
    const currentSaved = Number(goal.saved) || 0;

    const newSaved = window.prompt(
      `How much have you saved toward "${goal.name}"?`,
      currentSaved
    );

    if (newSaved === null) {
      return;
    }

    if (newSaved.trim() === "" || Number(newSaved) < 0) {
      alert("Please enter a valid saved amount.");
      return;
    }

    const savedAmount = Number(newSaved);
    const targetAmount = Number(goal.target) || 0;

    if (savedAmount > targetAmount) {
      alert("Saved amount cannot be greater than the target.");
      return;
    }

    updateGoal(goal.id, savedAmount);
  };

  const handleDeleteGoal = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this savings goal?"
    );

    if (confirmed) {
      deleteGoal(id);
    }
  };

  return (
    <div className="page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Savings Goals</h2>
          <p>Track your progress toward the things that matter.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          ＋ Add Goal
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="card summary-card">
          <span>Total Goals</span>
          <strong>{goals.length}</strong>
        </div>

        <div className="card summary-card">
          <span>Total Saved</span>
          <strong>
            ₹{totalSaved.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="card summary-card">
          <span>Total Target</span>
          <strong>
            ₹{totalTarget.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      {/* GOALS */}
      <div className="goals-grid">
        {goalData.length === 0 ? (
          <div className="card empty-state">
            <h3>No savings goals yet</h3>

            <p>
              Create a goal to start tracking your savings.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              Add Savings Goal
            </button>
          </div>
        ) : (
          goalData.map((goal) => {
            const completed =
              goal.savedAmount >= goal.targetAmount &&
              goal.targetAmount > 0;

            return (
              <div
                className="card goal-card"
                key={goal.id}
              >
                {/* TITLE */}
                <div className="card-title-row">
                  <div>
                    <h3>{goal.name}</h3>

                    <p>
                      {completed
                        ? "Goal completed"
                        : "Savings progress"}
                    </p>
                  </div>

                  <strong className="goal-percentage">
                    {Math.round(goal.percentage)}%
                  </strong>
                </div>

                {/* AMOUNTS */}
                <div className="goal-amounts">
                  <div>
                    <span>Saved</span>

                    <strong>
                      ₹
                      {goal.savedAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Target</span>

                    <strong>
                      ₹
                      {goal.targetAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${goal.percentage}%`,
                    }}
                  ></div>
                </div>

                {/* STATUS */}
                <p className="goal-status">
                  {completed
                    ? "You've reached this goal!"
                    : `₹${goal.remaining.toLocaleString(
                        "en-IN"
                      )} remaining`}
                </p>

                {/* ACTIONS */}
                <div className="action-buttons">
                  <button
                    className="small-button ghost"
                    onClick={() =>
                      handleUpdateGoal(goal)
                    }
                  >
                    Update Savings
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteGoal(goal.id)
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

      {/* ADD GOAL MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>Add Savings Goal</h3>

                <p>
                  Set a target and start saving.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddGoal}>
              {/* GOAL NAME */}
              <label>Goal Name</label>

              <input
                type="text"
                placeholder="Example: New Laptop"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              {/* TARGET */}
              <label>Target Amount</label>

              <input
                type="number"
                min="1"
                placeholder="Example: 60000"
                value={target}
                onChange={(e) =>
                  setTarget(e.target.value)
                }
              />

              {/* SAVED */}
              <label>Already Saved</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 10000"
                value={saved}
                onChange={(e) =>
                  setSaved(e.target.value)
                }
              />

              {/* BUTTONS */}
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
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}