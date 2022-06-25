import React, { useEffect } from "react";
import "./ProductCategory.css";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import WatchIcon from "@mui/icons-material/Watch";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import { useStateValue } from "./StateProvider";
import { Link, useLocation } from "react-router-dom";

export default function ProductCategory() {
  const [{ product_category, category_name }, dispatch] = useStateValue();
  let location = useLocation();
  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: "",
    });
  }, [location.pathname]);
  return (
    <div className="productCategory">
      <ul className="productCategory-list">
        {product_category.map((item, index) => {
          return (
            <Link to={`/category/${item.category_id}`} key={index}>
              <li
                className={
                  item.category_id == category_name
                    ? "productCategory-item active"
                    : "productCategory-item"
                }
              >
                <i className={`lo-${item.category_id}`}></i>
                <span>{item.category_name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
