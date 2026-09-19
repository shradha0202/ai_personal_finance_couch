import SectionCard from "../components/SectionCard";
import ProgressBar from "../components/ProgressBar";

function SavingsGoals() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Savings Goals</h2>
          <p>Build your future one goal at a time.</p>
        </div>

        <button className="primary-btn">
          + New Goal
        </button>
      </div>

      <div className="goals-grid">
        <SectionCard title="Emergency Fund">
          <h2>₹35,000 / ₹50,000</h2>

          <ProgressBar value={70} />

          <p className="muted">70% completed</p>
        </SectionCard>

        <SectionCard title="New Laptop">
          <h2>₹45,000 / ₹80,000</h2>

          <ProgressBar value={56} />

          <p className="muted">56% completed</p>
        </SectionCard>

        <SectionCard title="Vacation">
          <h2>₹20,000 / ₹60,000</h2>

          <ProgressBar value={33} />

          <p className="muted">33% completed</p>
        </SectionCard>
      </div>
    </div>
  );
}

export default SavingsGoals;