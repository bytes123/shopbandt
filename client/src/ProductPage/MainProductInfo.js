import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MainMoreInfoProduct from "./MainMoreInfoProduct";
import { Markup } from "interweave";
function MainProductInfo({ product }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenMoreInfo = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const ModalMore = () => {
    return <MainMoreInfoProduct product={product} />;
  };

  return (
    <div className="main_product-info">
      <div className="main_info-content">
        <h2 className="description_header">Thông tin sản phẩm</h2>
        {<Markup content={product.product_description ?? ""} />}
      </div>
      <div className="main_info-more">
        <button className="main_info-more-btn" onClick={handleOpenMoreInfo}>
          Xem thêm <ArrowRightIcon />
        </button>
      </div>
      <Modal
        handleOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        ModalForm={ModalMore}
      />
    </div>
  );
}

export default MainProductInfo;
