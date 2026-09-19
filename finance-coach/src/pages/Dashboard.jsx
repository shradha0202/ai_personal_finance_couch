import {
  IndianRupee,
  TrendingDown,
  PiggyBank,
  Target,
} from "lucide-react";

import SummaryCard from "../components/SummaryCard";
import SectionCard from "../components/SectionCard";
import ProgressBar from "../components/ProgressBar";

function Dashboard() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Here's your financial overview.</p>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Income"
          value="₹50,000"
          subtitle="This month"
          icon={<IndianRupee size={20} />}
        />

        <SummaryCard
          title="Total Spending"
          value="₹31,200"
          subtitle="62% of income"
          icon={<TrendingDown size={20} />}
        />

        <SummaryCard
          title="Savings"
          value="₹18,800"
          subtitle="38% of income"
          icon={<PiggyBank size={20} />}
        />

        <SummaryCard
          title="Savings Goal"
          value="68%"
          subtitle="On track"
          icon={<Target size={20} />}
        />
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Monthly Budget">
          <div className="budget-row">
            <div>
              <span>Overall spending</span>
              <strong>₹31,200 / ₹40,000</strong>
            </div>

            <span>78%</span>
          </div>

          <ProgressBar value={78} />

          <p className="muted">
            ₹8,800 remaining this month
          </p>
        </SectionCard>

        <SectionCard title="AI Insight">
          <div className="insight">
            <div className="insight-icon">💡</div>

            <div>
              <h4>You're spending more on food</h4>
              <p>
                Food expenses increased by 18% compared
                with last month.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Recent Transactions">
        <div className="transaction-list">
          <div className="transaction">
            <div>
              <strong>Swiggy</strong>
              <span>Food • Today</span>
            </div>

            <b className="expense">-₹420</b>
          </div>

          <div className="transaction">
            <div>
              <strong>Amazon</strong>
              <span>Shopping • Yesterday</span>
            </div>

            <b className="expense">-₹1,299</b>
          </div>

          <div className="transaction">
            <div>
              <strong>Salary</strong>
              <span>Income • 2 days ago</span>
            </div>

            <b className="income">+₹50,000</b>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default Dashboard;