import SectionCard from "../components/SectionCard";

function AICoach() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>AI Finance Coach</h2>
          <p>Personalized insights based on your spending.</p>
        </div>
      </div>

      <SectionCard title="Your Financial Insights">
        <div className="ai-insights">
          <div className="ai-message">
            <span>💡</span>

            <div>
              <h4>Reduce food spending</h4>
              <p>
                Your food expenses are higher than your
                monthly average. Consider setting a weekly
                food budget.
              </p>
            </div>
          </div>

          <div className="ai-message">
            <span>🎯</span>

            <div>
              <h4>You're close to your savings goal</h4>
              <p>
                You have saved 68% of your target. Keeping
                your current savings rate can help you reach
                the goal sooner.
              </p>
            </div>
          </div>

          <div className="ai-message">
            <span>📊</span>

            <div>
              <h4>Recurring expenses detected</h4>
              <p>
                We detected recurring payments such as
                Netflix and other subscriptions.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="coach-box">
        <h3>Ask your Finance Coach</h3>

        <p>
          Try asking: "How can I save ₹5,000 this month?"
        </p>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask something about your finances..."
          />

          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default AICoach;