import { useAuthContext } from "../../contexts/AuthContext";
import { GetAllItems, GetAllUnits } from "../../hooks/useItem";
import { useState } from "react";
import ItemCreate from "./ItemCreate";
import itemAPI from "../../api/item-api";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ItemPositionCreate({
  isOpen,
  onRequestClose,
  onConfirmItemPos,
  id,
}) {
  const initialValues = {
    itemId: "",
    price: "",
    quantity: "",
    amount: "",
    item: "",
    unit: "",
  };
  const { userId } = useAuthContext();
  const [items, setItems] = GetAllItems(userId);
  const [units, setUnits] = GetAllUnits(userId);
  const [showItemModal, setShowItemModal] = useState(false);

  const handleConfirmItemCreate = async (name, type) => {
    setShowItemModal(false);
    try {
      const response = await itemAPI.create(name, type);
      setItems((prev) => [response, ...prev]);
      values.itemId = response._id;
      values.item = response;
    } catch (error) {
      console.log(error);
    }
  };

  const itemCreateHandler = async () => {
    setShowItemModal(true);
  };

  const handleCloseModal = () => {
    setShowItemModal(false);
  };

  const createHandler = async (values) => {
    console.log("The values in item pos", values);
    if (values.itemId === "" && values.item !== "") {
      const item = items.find((item) => item._id === values.item);
      values.item = item;
    } else if (values.itemId === "" && values.item === "") {
      values.item = items[0];
    }

    const unit = units.find((unit) => unit._id === values.unit);
    if (unit === undefined) {
      values.unit = units[0];
    } else {
      values.unit = unit;
    }
    try {
      await onConfirmItemPos(values);
    } catch (error) {
      console.log(error);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    createHandler
  );

  values.amount = values.price * values.quantity;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      contentLabel="Confirm Create"
    >
      <h2 className="modal-header">Add a line</h2>

      <form id="create-item-pos" onSubmit={submitHandler}>
        <div className="item-position">
          <div className="form-group">
            <label htmlFor="item">Item</label>
            <div className="add-item">
              <select
                className="custom-select__control"
                id="item"
                name="item"
                value={values.item}
                onChange={changeHandler}
                required
              >
                {items.length > 0 &&
                  items.map((item) => (
                    <option
                      className="custom-select__option"
                      key={item._id}
                      value={item._id}
                    >
                      {item.name}
                    </option>
                  ))}{" "}
                {items.length === 0 && (
                  <option className="custom-select__option" value="">
                    No items
                  </option>
                )}
              </select>
              <Link
                onClick={itemCreateHandler}
                className="button"
                id="create-category-button"
                title="Create Item"
              >
                +
              </Link>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={values.price}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={values.quantity}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <div className="add-item">
              <select
                className="custom-select__control"
                id="unit"
                name="unit"
                value={values.unit}
                onChange={changeHandler}
                required
              >
                {units.length > 0 &&
                  units.map((unit) => (
                    <option
                      className="custom-select__option"
                      key={unit._id}
                      value={unit._id}
                    >
                      {unit.name}
                    </option>
                  ))}{" "}
                {units.length === 0 && (
                  <option className="custom-select__option" value="">
                    No units
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
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

        <div className="modal-buttons">
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button className="modal-button modal-button-confirm-create">
            Create
          </button>
        </div>
      </form>
      <ItemCreate
        isOpen={showItemModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmItemCreate}
        object="Item"
      />
    </Modal>
  );
}
