import { Link } from "react-router-dom";
import Expense from "./Expense";
import { GetAllExpenses } from "../../hooks/useExpenseHooks";
import { useParams, useSearchParams } from "react-router-dom";

export default function ExpenseList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [expenses] = GetAllExpenses(type);
  sessionStorage.removeItem("itemPositionsEdit");
  return (
    <section id="expense-list">
      <div className="buttons">
        <Link to={`/expenses/create?type=${type}`} className="button">
          Add {type === "income" ? "Income" : "Expense"}
        </Link>
      </div>
      <table id="allExpenses">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense) => (
            <Expense key={expense._id} {...expense} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
