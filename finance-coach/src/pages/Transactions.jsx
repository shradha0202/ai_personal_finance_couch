import { useState } from "react";

export default function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  renameTransaction,
}) {
  const [showForm, setShowForm] = useState(false);

  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Debit");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editingMerchant, setEditingMerchant] =
    useState("");

  // --------------------------------
  // ADD TRANSACTION
  // --------------------------------

  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!merchant.trim() || !amount) {
      alert("Please enter merchant and amount.");
      return;
    }

    addTransaction({
      merchant: merchant.trim(),
      category,
      amount: Number(amount),
      type,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    // Clear form
    setMerchant("");
    setCategory("Food");
    setAmount("");
    setType("Debit");

    // Close popup
    setShowForm(false);
  };

  // --------------------------------
  // DELETE
  // --------------------------------

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmed) {
      deleteTransaction(id);
    }
  };

  // --------------------------------
  // START RENAME
  // --------------------------------

  const handleRenameStart = (transaction) => {
    setEditingId(transaction.id);
    setEditingMerchant(transaction.merchant);
  };

  // --------------------------------
  // SAVE RENAME
  // --------------------------------

  const handleRenameSave = (id) => {
    if (!editingMerchant.trim()) {
      alert("Merchant name cannot be empty.");
      return;
    }

    renameTransaction(
      id,
      editingMerchant.trim()
    );

    setEditingId(null);
    setEditingMerchant("");
  };

  // --------------------------------
  // CANCEL RENAME
  // --------------------------------

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingMerchant("");
  };

  // --------------------------------
  // SEARCH + FILTER
  // --------------------------------

  const filteredTransactions =
    transactions.filter((transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.merchant
          .toLowerCase()
          .includes(searchText) ||
        transaction.category
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        transaction.type === filter;

      return matchesSearch && matchesFilter;
    });

  return (
    <div className="page">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="page-header">

        <div>
          <h2>Transactions</h2>

          <p>
            Track and manage your income and expenses.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          ＋ Add Transaction
        </button>

      </div>


      {/* ========================= */}
      {/* SEARCH + FILTER */}
      {/* ========================= */}

      <div className="card transaction-controls">

        <input
          type="text"
          placeholder="Search merchant or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="filter-buttons">

          <button
            className={
              filter === "All"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={
              filter === "Credit"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() =>
              setFilter("Credit")
            }
          >
            Income
          </button>

          <button
            className={
              filter === "Debit"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() =>
              setFilter("Debit")
            }
          >
            Expenses
          </button>

        </div>

      </div>


      {/* ========================= */}
      {/* TRANSACTION TABLE */}
      {/* ========================= */}

      <div className="card">

        <div className="card-title-row">

          <div>
            <h3>All Transactions</h3>

            <p>
              {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

        </div>


        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-state"
                  >
                    No transactions found.
                  </td>

                </tr>

              ) : (

                filteredTransactions.map(
                  (transaction) => (

                    <tr key={transaction.id}>

                      {/* MERCHANT */}

                      <td>

                        {editingId ===
                        transaction.id ? (

                          <input
                            type="text"
                            value={editingMerchant}
                            onChange={(e) =>
                              setEditingMerchant(
                                e.target.value
                              )
                            }
                            autoFocus
                          />

                        ) : (

                          <strong>
                            {transaction.merchant}
                          </strong>

                        )}

                      </td>


                      {/* CATEGORY */}

                      <td>
                        {transaction.category}
                      </td>


                      {/* DATE */}

                      <td>
                        {transaction.date}
                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong
                          className={
                            transaction.type ===
                            "Credit"
                              ? "amount-income"
                              : "amount-expense"
                          }
                        >

                          {transaction.type ===
                          "Credit"
                            ? "+"
                            : "-"}

                          ₹
                          {Number(
                            transaction.amount
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>

                      </td>


                      {/* TYPE */}

                      <td>

                        <span
                          className={
                            transaction.type ===
                            "Credit"
                              ? "badge income"
                              : "badge expense"
                          }
                        >
                          {transaction.type ===
                          "Credit"
                            ? "Income"
                            : "Expense"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        {editingId ===
                        transaction.id ? (

                          <div className="action-buttons">

                            <button
                              className="small-button"
                              onClick={() =>
                                handleRenameSave(
                                  transaction.id
                                )
                              }
                            >
                              Save
                            </button>

                            <button
                              className="small-button ghost"
                              onClick={
                                handleRenameCancel
                              }
                            >
                              Cancel
                            </button>

                          </div>

                        ) : (

                          <div className="action-buttons">

                            <button
                              className="small-button ghost"
                              onClick={() =>
                                handleRenameStart(
                                  transaction
                                )
                              }
                            >
                              Rename
                            </button>

                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(
                                  transaction.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        )}

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ========================= */}
      {/* ADD TRANSACTION MODAL */}
      {/* ========================= */}

      {showForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h3>Add Transaction</h3>

                <p>
                  Add a new income or expense.
                </p>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleAddTransaction}
            >

              {/* MERCHANT */}

              <label>
                Merchant
              </label>

              <input
                type="text"
                placeholder="Example: Swiggy"
                value={merchant}
                onChange={(e) =>
                  setMerchant(e.target.value)
                }
              />


              {/* CATEGORY */}

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option value="Food">
                  Food
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Income">
                  Income
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              {/* AMOUNT */}

              <label>
                Amount
              </label>

              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />


              {/* TYPE */}

              <label>
                Transaction Type
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >

                <option value="Debit">
                  Expense
                </option>

                <option value="Credit">
                  Income
                </option>

              </select>


              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Transaction
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}