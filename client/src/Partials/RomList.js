import React from "react";
import "./RomList.css";
import { Link } from "react-router-dom";
function RomList({ romHeader, romList, activeItem, onActiveChange, isLink }) {
  return (
    <div className="product_capacity">
      {romHeader && <h4 className="product_capacity-header">Dung lượng</h4>}
      <div className="product_capacity-list">
        {romList.length > 0
          ? romList.map((item, index) => {
              return isLink ? (
                <Link
                  key={index}
                  className={
                    index == activeItem
                      ? "product_capacity-item active"
                      : "product_capacity-item"
                  }
                  to={`/phone/${item.product_id}/${item.details_product_id}`}
                >
                  {item.rom_value} GB
                </Link>
              ) : (
                <div
                  key={index}
                  className={
                    index == activeItem
                      ? "product_capacity-item active"
                      : "product_capacity-item"
                  }
                  onClick={(e) => onActiveChange(e, index)}
                >
                  {item.rom_value} GB
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default RomList;
