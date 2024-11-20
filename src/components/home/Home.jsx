import { useEffect, useState } from "react";
import expenseAPI from "../../api/expense-api";
import { Link } from "react-router-dom";

export default function Home() {
  const [latestExpenses, setLatestExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await expenseAPI.getLatest(3);
      setLatestExpenses(expenses);
    })();
  }, []);
  return (
    <section id="home">
      {latestExpenses.length === 0 && (
        <div className="buttons">
          <Link to={`/expenses/create?type=expense`} className="button" id="edit-button">
            Add Expense
          </Link>

          <Link to={`/expenses/create?type=income`} className="button" id="edit-button">
            Add Income
          </Link>
        </div>
      )}
      {latestExpenses.length > 0 && (
        <div className="latestExpenses">
          <div className="welcome-message">
            <h3>Latest Expenses</h3>
          </div>
          {latestExpenses.map((expense) => (
            <div key={expense._id} className="expense">
              <h3>{expense.title}</h3>
              <p>Amount: {expense.amount} $</p>
              <p>Date: {expense.date.split("T")[0]}</p>
              <p>Category: {expense.category.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
