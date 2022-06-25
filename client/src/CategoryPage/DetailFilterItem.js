import React, { useState, useEffect, useRef } from "react";
import "./Filter.css";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

export default function DetailFilterItem({
  index,
  option,
  currentIndex,
  setCurrentIndex,
  onNewFilterValues,
  filterValues,
  Button,
}) {
  const [isOpenedBar, setIsOpenedBar] = useState(false);
  const barItem = useRef(null);
  const selectedActive = useRef(null);
  const selectedNan = useRef(null);
  const [
    {
      price_filter,
      category_name,
      selected_filter,
      details_product,
      brands,
      brandImageUrl,
    },
    dispatch,
  ] = useStateValue();

  const [isSelectedOption, setIsSelectedOption] = useState(false);

  let filter_brand = "Hãng";
  let filter_price = "Giá";
  let filter_ram = "RAM";
  let filter_rom = "ROM";

  const filterDetail = details_product.filter((item) => {
    if (item.category_id == category_name) {
      return item;
    }
  });

  let ramFilters = [
    ...new Map(
      filterDetail.map((item) => [item["product_ram"], item])
    ).values(),
  ];

  let romFilters = [
    ...new Map(
      filterDetail.map((item) => [item["product_rom"], item])
    ).values(),
  ];

  let brandsProduct = brands
    .filter((item) => {
      if (item.category_id == category_name) {
        return item;
      }
    })
    .map((item) => item);

  const handleOpenedBar = () => {
    setIsOpenedBar(!isOpenedBar);
  };
  const handleCurrentIndex = (e, index) => {
    handleOpenedBar();
    window.onclick = (ev) => {
      if (ev.target !== e.target && ev.target !== barItem.current) {
        setIsOpenedBar(false);
      } else if (ev.target == e.target && index != currentIndex) {
        setCurrentIndex(index);
        setIsOpenedBar(true);
      } else if (ev.target == e.target && index == currentIndex) {
        setIsOpenedBar(!isOpenedBar);
      }
    };
  };

  const handleBar = (e, index) => {
    e.stopPropagation();
  };

  const handleSelectOption = (e, key, item) => {
    if (e.target == selectedActive.current) {
      setIsSelectedOption(false);
      onNewFilterValues(key, "");
    } else {
      setIsSelectedOption(true);
      onNewFilterValues(key, item);
    }
  };
  return (
    <>
      <div
        className="filter_item-main"
        onClick={(e) => (index != 0 ? handleCurrentIndex(e, index) : null)}
      >
        {index == 0 ? (
          <div className="prev_icon disconnect">
            <AutoFixHighIcon />
          </div>
        ) : (
          ""
        )}
        <span className="disconnect">{option}</span>
        {index != 0 ? (
          <div className="next_icon disconnect">
            <ArrowDropDownIcon />
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        ref={barItem}
        className={`${
          currentIndex === index && isOpenedBar
            ? "filter_bar active"
            : "filter_bar"
        }`}
        onClick={(e) => handleBar(e, index)}
      >
        <div className="option_filter-list-wrapper">
          <div className="option_filter-list">
            <div className="arrow-up"></div>
            {option == filter_brand
              ? brandsProduct.map((item, index) => {
                  return (
                    <div
                      ref={
                        item.brand_id == filterValues.filter_brand
                          ? selectedActive
                          : selectedNan
                      }
                      className={`${
                        item.brand_id == filterValues.filter_brand
                          ? "option_filter-item active"
                          : "option_filter-item"
                      } `}
                      key={index}
                      onClick={(e) =>
                        handleSelectOption(e, "filter_brand", item.brand_id)
                      }
                    >
                      <img
                        src={brandImageUrl(item.brand_image)}
                        alt=""
                        className="disconnect"
                      />
                    </div>
                  );
                })
              : ""}
            {option == filter_price
              ? price_filter
                  .filter((item) => item.category_id == category_name)
                  .map((item, index) => {
                    return (
                      <div
                        ref={
                          item.price_filter_id ==
                          filterValues.filter_price.price_filter_id
                            ? selectedActive
                            : selectedNan
                        }
                        className={`${
                          item.price_filter_id ==
                          filterValues.filter_price.price_filter_id
                            ? "option_filter-item active"
                            : "option_filter-item"
                        }`}
                        key={index}
                        onClick={(e) =>
                          handleSelectOption(e, "filter_price", {
                            price_filter_id: item.price_filter_id,
                            price_filter_se: [
                              item.price_filter_start,
                              item.price_filter_end,
                            ],
                          })
                        }
                      >
                        <span className="disconnect">
                          {item.price_filter_value}
                        </span>
                      </div>
                    );
                  })
              : ""}
            {option == filter_ram
              ? ramFilters.map((item, index) => {
                  return (
                    <div
                      ref={
                        item.ram_id == filterValues.filter_ram
                          ? selectedActive
                          : selectedNan
                      }
                      className={`${
                        item.ram_id == filterValues.filter_ram
                          ? "option_filter-item active"
                          : "option_filter-item"
                      }`}
                      key={index}
                      onClick={(e) =>
                        handleSelectOption(e, "filter_ram", item.ram_id)
                      }
                    >
                      <span className="disconnect">{item.ram_value}</span>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
