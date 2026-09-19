import SectionCard from "../components/SectionCard";
import ProgressBar from "../components/ProgressBar";

function Budget() {
  const budgets = [
    ["Food", 6500, 10000, 65],
    ["Shopping", 4200, 7000, 60],
    ["Transport", 2800, 5000, 56],
    ["Entertainment", 3200, 4000, 80],
  ];

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Budget</h2>
          <p>Stay within your monthly spending limits.</p>
        </div>

        <button className="primary-btn">
          + Create Budget
        </button>
      </div>

      <div className="budget-cards">
        {budgets.map((budget, index) => (
          <SectionCard key={index} title={budget[0]}>
            <div className="budget-row">
              <span>₹{budget[1]} spent</span>
              <span>₹{budget[2]}</span>
            </div>

            <ProgressBar value={budget[3]} />

            <p className="muted">
              ₹{budget[2] - budget[1]} remaining
            </p>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

export default Budget;