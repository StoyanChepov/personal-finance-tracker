import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

Modal.setAppElement("#root");

export default function ConfirmCreate({ isOpen, onRequestClose, onConfirm, object }) {
  const { values, changeHandler, submitHandler } = useForm(
    { name: "" },
    async ({ name }) => {
      try {
        await onConfirm(name);
      } catch (error) {
        console.error(error);
      }
    }
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      contentLabel="Confirm Create"
    >
      <h2 className="modal-header">Create {object}</h2>
      <form id="create-category" onSubmit={submitHandler}>
        <label htmlFor="category" className="modal-text">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter "
          value={values.name}
          onChange={changeHandler}
        />

        <div className="modal-buttons">
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button className="modal-button modal-button-confirm-create">Create</button>
        </div>
      </form>
    </Modal>
  );
}
