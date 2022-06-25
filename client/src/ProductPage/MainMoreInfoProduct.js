import React from "react";
import { Markup } from "interweave";
function MainMoreInfoProduct({ product }) {
  return (
    <div className="main_info_product-more">
      <div className="main_info_product-more-wrapper">
        <h2 className="description_header">Thông tin sản phẩm</h2>
        <div className="main_info-more-content">
          <Markup content={product.product_description ?? ""} />
        </div>
      </div>
    </div>
  );
}

export default MainMoreInfoProduct;
