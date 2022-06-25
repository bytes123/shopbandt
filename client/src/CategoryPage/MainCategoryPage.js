import React, { useEffect, useState, useLayoutEffect } from "react";
import LoadingIcons from "react-loading-icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./MainCategoryPage.css";
import { useParams, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Carousel from "../Sliders/Carousel";
import Filter from "./Filter";
import Product from "../Products/Product";
import useWatchMore from "../useWatchMore/useWatchMore";
import WatchMoreBtn from "../useWatchMore/WatchMoreBtn";

export default function MainCategoryPage() {
  let category = useParams();
  let location = useLocation();
  let sliders = ["slider1.png", "slider2.png", "slider3.png"];
  let address = "CategoryPage";

  const [{ category_name, details_product, products }, dispatch] =
    useStateValue();

  const [newProducts, setNewProducts] = useState();
  const { max, handleSetMax, resetMax } = useWatchMore(10);

  let params = useParams();
  let brand_id = params.brand_id;
  let defaultDetailProducts = details_product.filter(
    (item) => item.category_id == category.category_id
  );

  let defaultProducts = products.filter(
    (product) => product.category_id == params.category_id
  );

  const uniqueProducts = [
    ...new Map(
      defaultDetailProducts.map((item) => [item["product_id"], item])
    ).values(),
  ];

  useEffect(() => {
    if (brand_id) {
      setNewProducts(
        defaultDetailProducts.filter((item) => item.brand_id == brand_id)
      );
    } else {
      setNewProducts(defaultDetailProducts);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: category.category_id,
    });
  }, [location.pathname]);

  const sortCollumn = [
    {
      id: "newest",
      label: "Mới nhất",
    },
    {
      id: "desc",
      label: "Giá cao đến thấp",
    },
    {
      id: "asc",
      label: "Giá thấp đến cao",
    },
  ];

  const [sort, setSort] = useState();
  const [openSort, setOpenSort] = useState(false);

  const handleOpenSort = () => {
    setOpenSort(!openSort);
  };

  const submitFilter = (filterValues) => {
    resetMax();
    let newList = uniqueProducts;
    if (filterValues.filter_brand != "") {
      newList = newList.filter(
        (item) => item.brand_id == filterValues.filter_brand
      );
    } else {
      newList = newList.filter(
        (item) =>
          item.brand_id != filterValues.filter_brand &&
          item.category_id == category.category_id
      );
    }

    if (filterValues.filter_price != "") {
      newList = newList.filter(
        (item) =>
          Number(
            item.product_price -
              (item.product_price * item.product_discount) / 100
          ) > Number(filterValues.filter_price.price_filter_se[0]) &&
          Number(
            item.product_price -
              (item.product_price * item.product_discount) / 100
          ) <= Number(filterValues.filter_price.price_filter_se[1])
      );
    } else {
      newList = newList.filter(
        (item) => item.category_id == category.category_id
      );
    }

    if (filterValues.filter_ram != "") {
      newList = newList.filter(
        (item) => item.ram_id == filterValues.filter_ram
      );
    } else {
      newList = newList.filter(
        (item) =>
          item.ram_id != filterValues.filter_ram &&
          item.category_id == category.category_id
      );
    }

    setNewProducts(newList);
  };

  useEffect(() => {
    setOpenSort(false);
    if (sort && sort.id) {
      if (sort.id == "newest") {
        if (newProducts && newProducts.length > 0) {
          setNewProducts(
            newProducts.sort(function (a, b) {
              var c = new Date(a.create_date);
              var d = new Date(b.create_date);
              return c - d;
            })
          );
        }
      }
      if (sort.id == "asc") {
        if (newProducts && newProducts.length > 0) {
          setNewProducts(
            newProducts.sort(
              (a, b) =>
                Number(
                  a.product_price - (a.product_price * a.product_discount) / 100
                ) -
                Number(
                  b.product_price - (b.product_price * b.product_discount) / 100
                )
            )
          );
        } else {
          setNewProducts(
            uniqueProducts.sort(
              (a, b) =>
                Number(
                  a.product_price - (a.product_price * a.product_discount) / 100
                ) -
                Number(
                  b.product_price - (b.product_price * b.product_discount) / 100
                )
            )
          );
        }
      }
      if (sort.id == "desc") {
        if (newProducts && newProducts.length > 0) {
          setNewProducts(
            newProducts.sort(
              (a, b) =>
                Number(
                  b.product_price - (b.product_price * b.product_discount) / 100
                ) -
                Number(
                  a.product_price - (a.product_price * a.product_discount) / 100
                )
            )
          );
        } else {
          setNewProducts(
            uniqueProducts.sort(
              (a, b) =>
                Number(
                  b.product_price - (b.product_price * b.product_discount) / 100
                ) -
                Number(
                  a.product_price - (a.product_price * a.product_discount) / 100
                )
            )
          );
        }
      }
    }
  }, [sort, newProducts]);

  const handleSetSort = (e, item) => {
    e.stopPropagation();
    setSort(item);
  };

  useEffect(() => {}, [newProducts]);

  return (
    <div className="category_page-wrapper">
      <div className="container">
        <div className="category_page-sliders sliders">
          <Carousel sliders={sliders} address={address} />
        </div>
        <Filter submitFilter={submitFilter} />
        <div className="filter-sort">
          <span className="sort_display" onClick={handleOpenSort}>
            Sắp xếp theo:{" "}
            {sort && sort.label ? sort.label : sortCollumn[0].label}
            <KeyboardArrowDownIcon />
          </span>
          <div
            className={`${
              openSort ? "sort-selection active" : "sort-selection"
            }`}
          >
            {sortCollumn.map((item) => (
              <div
                className="sort-item"
                onClick={(e) => handleSetSort(e, item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="filter_products-wrapper">
          {/* <div className="filter_icon-loading">
            {isSpinner ? (
              <LoadingIcons.ThreeDots fill="#06bcee" stroke="transparent" />
            ) : (
              ""
            )}
          </div> */}
          <div className="filter_products-list row">
            {newProducts && newProducts.length > 0 ? (
              newProducts.map((product, index) => {
                if (index < max) {
                  return (
                    <Product
                      key={index}
                      id={product.product_id ?? ""}
                      title={product.product_name ?? ""}
                      category={product.category_id}
                      amount={1}
                      product={product}
                    />
                  );
                }
              })
            ) : newProducts && newProducts.length == 0 ? (
              <p>Không có sản phẩm nào phù hợp</p>
            ) : defaultProducts.length > 0 ? (
              defaultProducts.map((product, index) => {
                if (index <= max) {
                  return (
                    <Product
                      key={index}
                      id={product.product_id ?? ""}
                      title={product.product_name ?? ""}
                      category={product.category_id}
                      amount={1}
                      product={product}
                    />
                  );
                }
              })
            ) : (
              <p>Không có sản phẩm nào phù hợp</p>
            )}
          </div>
        </div>
        <div className="filter_button">
          {!newProducts ? (
            <WatchMoreBtn
              max={max}
              productLength={defaultProducts.length}
              onSetMax={handleSetMax}
            />
          ) : (
            <WatchMoreBtn
              max={max}
              productLength={newProducts.length}
              onSetMax={handleSetMax}
            />
          )}
        </div>
      </div>
    </div>
  );
}
