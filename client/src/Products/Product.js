import React, { useEffect, useState } from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import RomList from "../Partials/RomList";
import { useLocation } from "react-router-dom";

export default function Product({
  id,
  title,
  amount,
  category,
  image,
  price,
  rating,
  product,
}) {
  const [
    { roms, details_product, formatMoney, cleanString, productImageUrl },
    dispatch,
  ] = useStateValue();
  const [activeProduct, setActiveProduct] = useState(0);
  const [romList, setRomList] = useState([]);
  let location = useLocation();

  let miniList =
    details_product.length > 0
      ? details_product.filter(
          (detail) => detail.product_id == product.product_id
        )
      : [];

  useEffect(() => {
    // SET ROM LIST FOR PRODUCTS ITEM
    const uniqueRom = [
      ...new Map(miniList.map((item) => [item["rom_id"], item])).values(),
    ];
    var toArray = [...Object.values(uniqueRom)];

    var sortedUniqueRom = [...toArray]
      .sort((a, b) => a.rom_value - b.rom_value)
      .reverse();

    setRomList(sortedUniqueRom);
  }, [details_product, activeProduct, product]);

  const handleChangeActive = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveProduct(index);
  };

  return romList[activeProduct] && romList[activeProduct].details_product_id ? (
    <div className="product col-lg-2 col-md-4 col-sm-12">
      <Link
        to={`/${category}/${cleanString(id)}/${
          romList[activeProduct]
            ? romList[activeProduct].details_product_id
            : ""
        }`}
      >
        <div className="product_wrapper">
          <img
            className="product_img"
            src={
              romList[activeProduct]
                ? productImageUrl(romList[activeProduct].product_image)
                : ""
            }
            alt=""
          />
          <div className="product_info">
            <p className="product_title">
              {romList[activeProduct]
                ? romList[activeProduct].category_name
                : ""}{" "}
              {title}
            </p>
            <RomList
              romHeader={false}
              romList={romList}
              onActiveChange={handleChangeActive}
              activeItem={activeProduct}
            />
            <p className="product_price discount">
              <span>
                <strong>
                  {formatMoney(
                    romList[activeProduct]
                      ? romList[activeProduct].product_price
                      : ""
                  )}
                </strong>
                <sup>
                  <b>
                    <u>đ</u>
                  </b>
                </sup>
              </span>
              {romList[activeProduct].product_discount != 0 && (
                <div className="discount-percent">
                  -{romList[activeProduct].product_discount}%
                </div>
              )}
            </p>
            <p className="product_price ">
              <strong>
                {formatMoney(
                  romList[activeProduct]
                    ? romList[activeProduct].product_price -
                        (romList[activeProduct].product_price *
                          romList[activeProduct].product_discount) /
                          100
                    : ""
                )}
              </strong>
              <sup>
                <b>
                  <u>đ</u>
                </b>
              </sup>
            </p>
            <div className="product_rating">
              {Array(
                romList[activeProduct]
                  ? romList[activeProduct].product_star_point
                  : ""
              )
                .fill()
                .map((_, i) => (
                  <p key={i}>
                    <StarIcon />
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    ""
  );
}
