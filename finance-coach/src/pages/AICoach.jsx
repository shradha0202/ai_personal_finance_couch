import { useState } from "react";

export default function AICoach({
  transactions = [],
  budgets = [],
  goals = [],
  totals = {},
}) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("save") ||
      lowerText.includes("saving")
    ) {
      return `You currently have ₹${(
        Number(totals.savings) || 0
      ).toLocaleString("en-IN")} available as savings based on your recorded income and expenses. Try setting a specific monthly savings target.`;
    }

    if (
      lowerText.includes("budget") ||
      lowerText.includes("spend")
    ) {
      return `You have ${budgets.length} active budget${
        budgets.length === 1 ? "" : "s"
      }. Review your spending regularly and try to stay within your category limits.`;
    }

    if (
      lowerText.includes("goal") ||
      lowerText.includes("laptop")
    ) {
      if (goals.length === 0) {
        return "You don't have any savings goals yet. Create one from the Savings Goals page.";
      }

      const goal = goals[0];

      const saved = Number(goal.saved) || 0;
      const target = Number(goal.target) || 0;

      const percentage =
        target > 0
          ? Math.round((saved / target) * 100)
          : 0;

      return `Your "${goal.name}" goal is ${percentage}% complete. You have saved ₹${saved.toLocaleString(
        "en-IN"
      )} out of ₹${target.toLocaleString("en-IN")}.`;
    }

    if (
      lowerText.includes("expense") ||
      lowerText.includes("expenses")
    ) {
      return `Your recorded expenses total ₹${(
        Number(totals.expenses) || 0
      ).toLocaleString("en-IN")}. Look at the Transactions page to identify categories where you may be spending more.`;
    }

    if (
      lowerText.includes("income") ||
      lowerText.includes("salary")
    ) {
      return `Your recorded income is ₹${(
        Number(totals.income) || 0
      ).toLocaleString("en-IN")}.`;
    }

    return "I can help you understand your spending, savings, budgets, and savings goals. Try asking something like: “How can I save more?”";
  };

  const handleAsk = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    const userQuestion = question.trim();

    const answer = generateResponse(userQuestion);

    setMessages((previous) => [
      ...previous,
      {
        type: "user",
        text: userQuestion,
      },
      {
        type: "coach",
        text: answer,
      },
    ]);

    setQuestion("");
  };

  const suggestions = [
    "How can I save more?",
    "How are my expenses?",
    "Tell me about my budget",
    "How are my savings goals?",
  ];

  const handleSuggestion = (text) => {
    setQuestion(text);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>AI Finance Coach</h2>

          <p>
            Get simple insights about your personal finances.
          </p>
        </div>
      </div>

      {/* MAIN AI SECTION */}
      <div className="ai-coach-page">
        <div className="ai-hero-card">
          <div className="ai-hero-icon">✦</div>

          <div>
            <h3>Your Personal Finance Coach</h3>

            <p>
              Ask questions about your spending, savings,
              budgets, and financial goals.
            </p>
          </div>
        </div>

        {/* QUICK SUGGESTIONS */}
        <div className="ai-section">
          <h3>Try asking</h3>

          <div className="ai-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="ai-suggestion-button"
                onClick={() =>
                  handleSuggestion(suggestion)
                }
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-avatar">✦</div>

            <div>
              <strong>Finance Coach</strong>

              <span>
                Your personal finance assistant
              </span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.length === 0 ? (
              <div className="ai-welcome">
                <div className="ai-welcome-icon">
                  ✦
                </div>

                <h3>How can I help?</h3>

                <p>
                  Ask me about your spending, income,
                  budgets, or savings goals.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`ai-message ${
                    message.type === "user"
                      ? "user-message"
                      : "coach-message"
                  }`}
                >
                  <div className="message-label">
                    {message.type === "user"
                      ? "You"
                      : "Finance Coach"}
                  </div>

                  <p>{message.text}</p>
                </div>
              ))
            )}
          </div>

          {/* INPUT */}
          <form
            className="ai-input-area"
            onSubmit={handleAsk}
          >
            <input
              type="text"
              placeholder="Ask your finance coach..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />

            <button
              type="submit"
              className="primary-button"
            >
              Ask Coach
            </button>
          </form>
        </div>

        {/* QUICK FINANCE SUMMARY */}
        <div className="ai-summary-grid">
          <div className="card ai-summary-card">
            <span>Total Income</span>

            <strong>
              ₹{(
                Number(totals.income) || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="card ai-summary-card">
            <span>Total Expenses</span>

            <strong>
              ₹{(
                Number(totals.expenses) || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="card ai-summary-card">
            <span>Current Savings</span>

            <strong>
              ₹{(
                Number(totals.savings) || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}