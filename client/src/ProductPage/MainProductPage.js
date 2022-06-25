import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import StarPoints from "../StarPoints";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import RomList from "../Partials/RomList";
import ColorList from "../Partials/ColorList";
import Comment from "./Comment/Comment";
import MainProductInfo from "./MainProductInfo";

import Cookies from "js-cookie";
import "./MainProductPage.css";
import Toast from "../toast/Toast";

export default function MainProductPage() {
  const [
    {
      details_product,
      category_name,
      product_category,
      formatMoney,
      basket,
      isLogined,
      loginedUser,
      comments,
      productImageUrl,
      loginedBasket,
    },
    dispatch,
  ] = useStateValue();
  const { error, success } = Toast;
  const axios = require("axios");
  let params = useParams();
  let location = useLocation();
  let address = "ProductPage";

  // let product = products.filter(
  //   (item) => cleanString(item.product_name) == params.product_name
  // );
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState("1");
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [romList, setRomList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [activeRomIndex, setActiveRomIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleCloseLoading = () => {
    setLoading(false);
  };

  const handleOpenLoading = () => {
    setLoading(true);
  };

  const handleChangeActive = () => {};

  // useEffect(() => {
  //   console.log(loginedUser);
  // }, [loginedUser]);

  const decreseaAmount = () => {
    setAmount(amount - 1);
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  async function getDetailsProduct() {
    try {
      const response = await axios.get("http://localhost:5000/details_product");
      dispatch({
        type: "GET_DETAILS_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function insertLoginedBasket(user_id, details_product_id, amount) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-basket",
        data: {
          user_id: user_id,
          details_product_id: details_product_id,
          amount: amount,
        },
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
        success("Thêm giỏ hàng thành công");
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function insertLoginedExistBasket(user_id, details_product_id, amount) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-exist-basket",
        data: {
          user_id: user_id,
          details_product_id: details_product_id,
          amount: amount,
        },
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
        success("Thêm giỏ hàng thành công");
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  const addToBasket = async (user_id, details_product_id) => {
    if (product && product.product_storage > 0) {
      if (amount <= product.product_storage) {
        if (!isLogined) {
          if (
            basket.some((item) => item.details_product_id == details_product_id)
          ) {
            const storage = basket.filter(
              (item) => item.details_product_id == details_product_id
            )[0].amount;
            if (storage + amount > product.product_storage) {
              error("Giỏ hàng vượt quá số lượng sản phẩm có sẵn !");
            } else {
              setLoading(true);
              dispatch({
                type: "ADD_TO_BASKET",
                payload: {
                  product: { ...product, amount: amount },
                },
              });
              await timeout(1000);
              getDetailsProduct();
              setLoading(false);
              success("Thêm giỏ hàng thành công");
            }
          } else {
            setLoading(true);
            dispatch({
              type: "ADD_TO_BASKET",
              payload: {
                product: { ...product, amount: amount },
              },
            });
            await timeout(1000);
            getDetailsProduct();
            setLoading(false);
            success("Thêm giỏ hàng thành công");
          }
        } else {
          if (
            loginedBasket.some(
              (item) => item.details_product_id == details_product_id
            )
          ) {
            const storage = loginedBasket.filter(
              (item) => item.details_product_id == details_product_id
            )[0].amount;
            if (storage + amount > product.product_storage) {
              error("Giỏ hàng vượt quá số lượng sản phẩm có sẵn !");
            } else {
              setLoading(true);
              insertLoginedExistBasket(user_id, details_product_id, amount);
              // updateStorage(amount, details_product_id);
              await timeout(1000);
              getDetailsProduct();
              setLoading(false);
            }
          } else {
            setLoading(true);
            insertLoginedBasket(user_id, details_product_id, amount);
            await timeout(1000);
            getDetailsProduct();
            setLoading(false);
          }
        }
      } else {
        error("Vượt quá số lượng sản phẩm có sẵn !");
      }
    } else {
      error("Hết hàng rồi :(");
    }
  };

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // useEffect(() => {
  //   console.log(basket);
  // }, [basket]);

  useEffect(() => {
    if (details_product.length > 0) {
      setProduct(
        ...details_product.filter(
          (item) => item.details_product_id == params.detail_id
        )
      );
    }
  }, [details_product, location.pathname]);

  useEffect(() => {
    let categoryName = product_category
      .filter((item) => item.category_id == params.category_name)
      .map((item) => item.category_name);
    setCategory(...categoryName);
  }, [product_category]);

  useEffect(() => {
    if (typeof product == "object") {
      setBrand(product.brand_id);

      // SET ROM SORTED LIST
      let miniList =
        details_product.length > 0
          ? details_product.filter(
              (detail) => detail.product_id == product.product_id
            )
          : [];

      const uniqueRom = [
        ...new Map(miniList.map((item) => [item["rom_id"], item])).values(),
      ];

      var romList = uniqueRom.sort((a, b) => a.rom_value - b.rom_value);

      setRomList(romList);

      // SET COLOR LIST
      let color_list = miniList
        .filter((item) => item.rom_id == product.rom_id)
        .reverse();

      setColorList(color_list);

      // SET INDEX ACTIVE ROM LIST

      romList.forEach((item, index) => {
        if (item.details_product_id == params.detail_id) {
          setActiveRomIndex(index);
        }
      });

      // SET INDEX ACTIVE COLOR LIST

      color_list.forEach((item, index) => {
        if (item.details_product_id == params.detail_id) {
          setActiveColorIndex(index);
        }
      });
    }
  }, [product]);

  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: params.category_name,
    });
  }, [location.pathname]);

  return (
    <div className="product_main-wrapper">
      <div className="container">
        <div className="product_main-navigate">
          <Link to={`/category/${category_name}`}>{category ?? ""}</Link>
          <span className="product_main-navigate-icon">{`>`}</span>
          <Link to={`/category/${category_name}/${brand}`}>
            {category ?? ""}{" "}
            {product && product.product_name ? product.product_name : ""}{" "}
          </Link>
        </div>
        <div className="product_main-content">
          <div className="product_main-content-top">
            <div className="product_main-top-left">
              <div className="product_main-content-title">
                <h2 className="product_title">
                  {category ?? ""}{" "}
                  {product && product.product_name ? product.product_name : ""}{" "}
                  {product && product.rom_value ? product.rom_value + "GB" : ""}
                </h2>
              </div>
            </div>
            <div className="product_main-content-stars product_rating">
              <StarPoints stars={product.product_star_point ?? 5} />
            </div>
            <div className="product_main-content-rates">
              <span>{comments.length} đánh giá</span>
            </div>
            {/* <div className="product_main-content-comparasion">
              <AddCircleOutlineIcon />
              <p>So sánh</p>
            </div> */}
          </div>
          <div className="product_main-content-bottom">
            <div className="main_content-bottom-left">
              <div className="product_main-image">
                <img
                  src={
                    product && product.product_image
                      ? productImageUrl(product.product_image)
                      : ""
                  }
                  alt=""
                />
              </div>
              <MainProductInfo product={product} />
              <Comment product={product} />
            </div>
            <div className="main_content-bottom-right">
              <div className="main_content-price">
                {product &&
                product.product_price &&
                product.product_discount != 0 ? (
                  <div className="product_price discount">
                    <h4 className="main_content-price-header">Giá gốc</h4>
                    <div>
                      <span>
                        {formatMoney(product.product_price)}
                        <sup>
                          <span className="unit-price">đ</span>
                        </sup>
                      </span>

                      <div className="discount-percent">
                        -{product.product_discount}%
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product &&
                product.product_price &&
                product.product_discount != 0 ? (
                  <div className="product_price">
                    <h4 className="main_content-price-header">Giá giảm</h4>
                    <div>
                      {formatMoney(
                        product.product_price -
                          (product.product_price * product.product_discount) /
                            100
                      )}
                      <sup>
                        <span className="unit-price">đ</span>
                      </sup>
                    </div>
                  </div>
                ) : (
                  <div className="product_price">
                    <h4 className="main_content-price-header">Giá</h4>
                    <div>
                      {formatMoney(product.product_price)}
                      <sup>
                        <span className="unit-price">đ</span>
                      </sup>
                    </div>
                  </div>
                )}
              </div>

              <RomList
                romHeader={true}
                romList={romList}
                onActiveChange={handleChangeActive}
                activeItem={activeRomIndex}
                isLink={true}
              />
              <ColorList
                romList={colorList}
                onActiveChange={handleChangeActive}
                activeItem={activeColorIndex}
                isLink={true}
              />
              <div className="main_content-quantity">
                <h4 className="main_content-quantity-header">
                  Số lượng sản phẩm
                </h4>
                <span>{product.product_storage} sản phẩm có sẵn</span>
              </div>
              <div className="main_content-gift">
                <div className="gift_wrapper">
                  <h2 className="gift_title">Nhận ngay khuyến mại đặc biệt</h2>
                  <div className="gifts">
                    <ul className="gift_list">
                      <li className="gift_item">
                        <div className="gift_icon">
                          <CheckCircleIcon />
                        </div>
                        <span className="gift_value">Free ship</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="product_info-quantity-wrapper">
                <h4 className="product_info-quantity-header">Chọn số lượng</h4>
                <div className="product_info-quantity">
                  <span
                    className={`${
                      amount > 1
                        ? "product_info-quantity-minus active"
                        : "product_info-quantity-minus"
                    }`}
                    onClick={() => amount > 1 && decreseaAmount()}
                  >
                    -
                  </span>
                  <input type="number" min="1" value={amount} />
                  <span
                    className="product_info-quantity-plus active"
                    onClick={increaseAmount}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="main_content-button-buy">
                <button
                  className="main_content_buy-submit"
                  onClick={() =>
                    addToBasket(loginedUser.user_id, product.details_product_id)
                  }
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              <div className="main_content-configation">
                <h2 className="product_configation-title">
                  {product && product.product_name
                    ? `Cấu hình ${product.category_name} ${product.product_name}`
                    : ""}
                </h2>
                <ul className="product_configation-list">
                  {product && product.ram_value ? (
                    <li className="product_configation-item">
                      <h4 className="product_detail-title">RAM:</h4>
                      <span className="product_detail-item">
                        {product.ram_value}GB
                      </span>
                    </li>
                  ) : (
                    ""
                  )}
                  {product && product.rom_value ? (
                    <li className="product_configation-item">
                      <h4 className="product_detail-title">BỘ NHỚ TRONG:</h4>
                      <span className="product_detail-item">
                        {product.rom_value}GB
                      </span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
