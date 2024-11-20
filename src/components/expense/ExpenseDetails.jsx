import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import expenseAPI from "../../api/expense-api";
import { GetOneExpense } from "../../hooks/useExpenseHooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../modal/ConfirmDelete";
import UploadForm from "../upload/UploadForm";
import { motion } from "framer-motion";
import {
  useGetAttachments,
  useCreateAttachment,
} from "../../hooks/useAttachments";
import LineItem from "./LineItem";

export default function ExpenseDetails() {
  const { expenseId } = useParams();
  const [expense, setExpense] = GetOneExpense(expenseId);
  const [showModal, setShowModal] = useState(false);
  const { email, userId } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const [attachments, setAttachments] = useGetAttachments(expenseId);

  const isOwner = expense.userId === userId;
  const navigate = useNavigate();

  const expenseDeleteHandler = async () => {
    setShowModal(true);
    /*
    const isConfirmed = confirm(
      `Are you sure you want to delete the expense with title ${expense.title}?`
    );
    if (!isConfirmed) {
      return;
    }
    */
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await expenseAPI.remove(expenseId);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="expense-details">
      <h2>Title: {expense.title}</h2>
      <p>Amount: {expense.amount} $</p>
      <p>Date: {expense.date.split("T")[0]}</p>
      <p>Category: {expense.category.name}</p>
      {expense.itemPositions?.length > 0 && (
        <table id="allExpenses">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expense.itemPositions.map((itempos, index) => (
              <LineItem key={index} {...itempos} />
            ))}
          </tbody>
        </table>
      )}

      {isOwner && (
        <div className="buttons">
          <Link
            to={`/expenses/${expense._id}/edit`}
            className="button"
            id="edit-button"
          >
            Edit
          </Link>

          <Link
            onClick={expenseDeleteHandler}
            className="button"
            id="delete-button"
          >
            Delete
          </Link>
        </div>
      )}
      <ConfirmDelete
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {
        <div className="attachments">
          {attachments.length > 0 && (
            <ul className="img-container">
              <h2>Attachments</h2>
              {attachments.map((doc) => (
                <motion.li
                  className="img-item"
                  key={doc._id}
                  layout
                  whileHover={{ opacity: 1 }}
                >
                  <motion.img
                    className="mot-img"
                    src={doc.url}
                    alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      }
      {isAuthenticated && (
        <article className="add-attachment">
          <h2>Attachment file</h2>
          <UploadForm setAttachments={setAttachments} />
        </article>
      )}
    </div>
  );
}
