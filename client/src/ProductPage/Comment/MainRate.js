import React, { useState } from "react";
import RateProduct from "./RateProduct";
import RateForm from "./RateForm";
import UseRate from "./UseRate";
import validate from "./validate";
import { useStateValue } from "../../StateProvider";

import Toast from "../../toast/Toast";
import { RiTruckLine } from "react-icons/ri";

function MainRate({ onOpenLoading, onCloseLoading, product, onModalClose }) {
  const [{ comments, productImageUrl }, dispatch] = useStateValue();
  const [activeStar, setActiveStar] = useState(null);
  const [isOpenRateForm, setIsOpenRateForm] = useState(false);

  const { error, success } = Toast;
  const axios = require("axios");

  const handleOpenRateForm = (index) => {
    document.body.style.overflow = "hidden";
    setIsOpenRateForm(true);
    setActiveStar(index);
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getComments(details_product_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-comments",
        data: {
          details_product_id: details_product_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_COMMENTS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const insertComment = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-comments",
        data: {
          data: data,
        },
      });
      if (response.data) {
        window.alert("Đánh giá của bạn đã được gửi và chờ admin xét duyệt");
        onModalClose();
      } else {
        error("Lỗi");
        onModalClose();
      }
    } catch (error) {
      error("Lỗi");
      onModalClose();
    }
  };
  const handleSend = (e) => {
    const data = {
      details_product_id: product.details_product_id,
      star_point: activeStar + 1,
      comment_author: values.fullname,
      comment_description: values.description,
      comment_phoneNumber: values.phoneNumber,
      comment_email: values.email,
    };

    insertComment(data);
  };

  const { values, errors, handleChange, handleSubmit } = UseRate(
    handleSend,
    validate
  );

  return (
    <form className="rate_form modal_form bd-r-2">
      <div className="rate_form-heading w-100 bd-b-blur">
        <h2 className="rate_form-header fw-b p-5">Đánh giá</h2>
      </div>
      <div className="rate_form-content p-5">
        <div className="rate_form-laptop ">
          <img
            className="w-100p"
            src={productImageUrl(product && product.product_image)}
            alt=""
          />
          <h3 className="rate_form-laptop-header ml-2">
            {(product && product.category_name) ?? ""}{" "}
            {(product && product.product_name) ?? ""}/
            {(product && product.ram_value) ?? ""}GB/
            {(product && product.rom_value) ?? ""}GB
          </h3>
        </div>
        <RateProduct
          activeStar={activeStar}
          handleOpenRateForm={handleOpenRateForm}
        />
        {isOpenRateForm ? (
          <>
            <RateForm
              values={values}
              errors={errors}
              handleChange={handleChange}
            />
            <div className="rate_form-submit text-center">
              <button
                className="rate_form-btn btn-primary bd-r-1"
                onClick={(e) => handleSubmit(e)}
              >
                Gửi đánh giá ngay
              </button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
}

export default MainRate;
