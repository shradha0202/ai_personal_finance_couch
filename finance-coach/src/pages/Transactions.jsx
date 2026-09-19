import SectionCard from "../components/SectionCard";

function Transactions() {
  const transactions = [
    ["Swiggy", "Food", "₹420", "Debit"],
    ["Amazon", "Shopping", "₹1,299", "Debit"],
    ["Salary", "Income", "₹50,000", "Credit"],
    ["Netflix", "Entertainment", "₹649", "Debit"],
    ["Uber", "Transport", "₹280", "Debit"],
  ];

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Transactions</h2>
          <p>Track and manage your expenses.</p>
        </div>

        <button className="primary-btn">
          + Add Transaction
        </button>
      </div>

      <SectionCard title="All Transactions">
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
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction[0]}</td>
                  <td>{transaction[1]}</td>
                  <td>{transaction[2]}</td>
                  <td>
                    <span
                      className={
                        transaction[3] === "Credit"
                          ? "badge credit"
                          : "badge debit"
                      }
                    >
                      {transaction[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

export default Transactions;