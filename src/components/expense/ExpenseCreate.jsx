import { CreateOneExpense } from "../../hooks/useExpenseHooks";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GetAllCategories, CreateOneCategory } from "../../hooks/useCategory";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmCreate from "../modal/ConfirmCreate";
import categoryAPI from "../../api/category-api";
import { useAuthContext } from "../../contexts/AuthContext";
import LineItem from "./LineItem";
import expenseAPI from "../../api/expense-api";
import ItemPositionCreate from "../modal/ItemPositionCreate";

// Save data to sessionStorage
const saveToCache = (value) => {
  sessionStorage.setItem("itemPositions", JSON.stringify(value));
};

export default function ExpenseCreate() {
  const navigate = useNavigate();
  const createPosition = CreateOneExpense();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemPosModal, setShowItemPosModal] = useState(false);
  const { userId } = useAuthContext();
  const [categories, setCategories] = GetAllCategories(userId);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const createHandler = async (values) => {
    values.category =
      categories.length > 0 && values.category == ""
        ? categories[0]._id
        : values.category;

    try {
      const { _id: positionId } = await createPosition(values);
      if (positionId) {
        if (values.itemPositions.length > 0) {
          for (let item of values.itemPositions) {
            await expenseAPI.createItemPosition({
              itemId: item.itemId,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
              unit: JSON.stringify(item.unit),
              item: JSON.stringify(item.item),
              positionId,
            });
          }
        }
        sessionStorage.removeItem("itemPositions");
        navigate(`/expenses/${positionId}/details`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    title: "",
    date: "",
    category: "",
    amount: "",
    itemPositions: [],
    type: type,
  };
  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    createHandler
  );

  const categoryCreateHandler = async () => {
    setShowCategoryModal(true);
  };

  const itemPosCreateHandler = async () => {
    setShowItemPosModal(true);
  };

  const handleConfirmCategoryCreate = async (name) => {
    setShowCategoryModal(false);
    try {
      const response = await categoryAPI.create(name);
      console.log("The response", response);
      setCategories((prev) => [response, ...prev]);
      values.category = response._id;
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmItemPosCreate = async (res) => {
    setShowItemPosModal(false);
    values.itemPositions = [...values.itemPositions, res];
    saveToCache([...values.itemPositions]);
  };

  const handleCloseModal = () => {
    setShowCategoryModal(false);
    setShowItemPosModal(false);
  };

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const cachedData = sessionStorage.getItem("itemPositions");
    if (cachedData) {
      values.itemPositions = JSON.parse(cachedData);
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  values.amount = values.itemPositions.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="expense-create">
      <h2>Create {type}</h2>
      <form id="create" onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={values.title}
          onChange={changeHandler}
          required
        />
        <div className="expense-info">
          <div className="form-group">
            <label className="expense-detail" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="date"
              placeholder="Enter date"
              value={values.date.split("T")[0]}
              onChange={changeHandler}
              title="Enter date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="add-item">
              <select
                className="custom-select__control"
                id="category"
                name="category"
                value={values.category}
                onChange={changeHandler}
                required
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      className="custom-select__option"
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))}{" "}
                {categories.length === 0 && (
                  <option className="custom-select__option" value="">
                    No categories
                  </option>
                )}
              </select>
              <Link
                onClick={categoryCreateHandler}
                className="button"
                id="create-category-button"
                title="Create Category"
              >
                +
              </Link>
            </div>
          </div>
        </div>
        {values.itemPositions.length > 0 && (
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
              {values.itemPositions.map((itempos, index) => (
                <LineItem key={index} {...itempos} />
              ))}
            </tbody>
          </table>
        )}
        <Link
          onClick={itemPosCreateHandler}
          className="button"
          id="create-category-button"
          title="Add a line"
        >
          + Add a line
        </Link>
        <div className="form-group">
          <label htmlFor="amount">Total</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={changeHandler}
            required
            readOnly
          />
        </div>
        <div className="buttons">
          <button className="button" type="submit">
            Create
          </button>
        </div>
      </form>
      <ConfirmCreate
        isOpen={showCategoryModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmCategoryCreate}
        object="Category"
      />
      <ItemPositionCreate
        isOpen={showItemPosModal}
        onRequestClose={handleCloseModal}
        onConfirmItemPos={handleConfirmItemPosCreate}
      />
    </div>
  );
}
