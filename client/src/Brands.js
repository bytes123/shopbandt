import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Brands.css";

function Brands({ brandsList }) {
  const [{ cleanString, brandImageUrl }, dispatch] = useStateValue();

  return (
    <div className="category">
      <div className="category_row">
        {brandsList.map((item, index) => {
          return (
            <Link
              to={`/category/${item.category_id + "/" + item.brand_id}`}
              key={index}
            >
              <div className="category_col">
                <img
                  src={brandImageUrl(item.brand_image)}
                  alt={item.brand_name}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Brands;
