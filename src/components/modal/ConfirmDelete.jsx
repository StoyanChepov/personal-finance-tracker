import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ConfirmDelete({
  isOpen,
  onRequestClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      contentLabel="Confirm Delete"
    >
      <h2 className="modal-header">Confirm Delete</h2>
      <p className="modal-text">
        Are you sure you want to delete this expense?
      </p>
      <div className="modal-buttons">
        <button
          type="button"
          onClick={onRequestClose}
          className="modal-button modal-button-cancel"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="modal-button modal-button-confirm"
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
}
