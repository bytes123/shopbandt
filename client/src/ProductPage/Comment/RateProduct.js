import React, { useState } from "react";
import StarPoints from "../../StarPoints";

function RateProduct({ activeStar, handleOpenRateForm }) {
  return (
    <div className="rate_product my-4 d-flex">
      <div className="rate_product-heading">
        <h4 className="rate_product-header">
          Bạn cảm thấy sản phẩm này như thế nào? (chọn sao nhé):
        </h4>
      </div>
      <div className="rate_star w-100">
        <StarPoints
          customClass="star_select"
          rateContent={true}
          activeStar={activeStar}
          handleOpenRateForm={handleOpenRateForm}
        />
      </div>
    </div>
  );
}

export default RateProduct;
