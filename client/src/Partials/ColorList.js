import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

function ColorList({ romList, activeItem, onActiveChange, isLink }) {
  return (
    <div className="product_colors">
      <h4 className="product_colors-header">Màu sắc</h4>
      <div className="product_colors-list">
        {romList.length > 0
          ? romList.map((item, index) => {
              return isLink ? (
                <Link
                  key={index}
                  className={
                    index == activeItem
                      ? "product_colors-item active"
                      : "product_colors-item"
                  }
                  to={`/phone/${item.product_id}/${item.details_product_id}`}
                >
                  {item.color_value}
                </Link>
              ) : (
                <div
                  key={index}
                  className={
                    index == activeItem
                      ? "product_colors-item active"
                      : "product_colors-item"
                  }
                  onClick={(e) => onActiveChange(e, index)}
                >
                  {item.color_value}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ColorList;
