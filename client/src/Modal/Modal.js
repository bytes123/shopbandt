import React, { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

function Modal({
  ModalForm,
  onOpenLoading,
  onCloseLoading,
  handleOpenModal,
  isOpenModal,
  product,
}) {
  const modalRef = useRef(null);
  const outModal = useRef();

  const handleCloseModal = (e) => {
    if (e.target == modalRef.current) {
      handleOpenModal(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleCloseModalForm = () => {
    document.body.style.overflow = "auto";
    handleOpenModal(false);
  };

  return (
    <>
      {isOpenModal ? (
        <div
          className="modal"
          onClick={(e) => handleCloseModal(e)}
          ref={modalRef}
        >
          <div className="close_modal">
            <button
              className="close_modal-btn"
              onMouseDown={() => handleOpenModal(false)}
            >
              <CloseIcon />
              Đóng
            </button>
          </div>
          {ModalForm ? (
            <ModalForm
              product={product}
              onModalClose={handleCloseModalForm}
              onOpenLoading={onOpenLoading}
              onCloseLoading={onCloseLoading}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Modal;
