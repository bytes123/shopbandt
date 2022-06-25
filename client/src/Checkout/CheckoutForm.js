import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Cookies from "js-cookie";
import useCheckout from "./useCheckout";
import validateCheckout from "./validateCheckout";
import PayPal from "./PayPal";
import { useLocation } from "react-router-dom";
import AddressCheckout from "./AddressCheckout";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";

function CheckoutForm({ basket, setBillCode, setIsSuccessPayment }) {
  const [
    {
      loginedBasket,
      profileCustomer,
      formatMoney,
      details_product,
      isLogined,
      paymentMethods,
      loginedUser,
      productImageUrl,
    },
    dispatch,
  ] = useStateValue();

  const { error, success } = Toast;
  const [totalPrice, setTotalPrice] = useState(0);
  const [activePayment, setActivePayment] = useState(0);
  const [isPayPal, setIsPayPal] = useState(false);

  const [isSelectColor, setIsSelectColor] = useState(false);
  const [idActiveDropDown, setIdActiveDropDow] = useState(0);
  const [basketLength, setBasketLength] = useState(0);

  let location = useLocation();
  const axios = require("axios");

  const deleteUserBasket = async () => {
    console.log(1);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/delete-user-basket",
        data: {
          user_id: loginedUser.user_id,
        },
      });
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getBasket(user_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/basket",
        data: {
          user_id: user_id,
        },
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const insertBill = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-bills",
        data: {
          data: data,
        },
      });
      if (response.data) {
        if (!isLogined) {
          localStorage.removeItem("basket");
          dispatch({
            type: "RESET_BASKET",
          });
        } else {
          await deleteUserBasket();
          let user = JSON.parse(Cookies.get("user"));
          getBasket(user.user_id);
        }

        setBillCode(response.data[0].bill_id);
        setIsSuccessPayment(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    // if (activePayment == 1) {
    //   callMomo();
    // }
    if (activePayment == 1) {
      setIsPayPal(true);
    } else {
      if (!isLogined) {
        const newBasket = basket.map((item) => {
          return {
            details_product_id: item.details_product_id,
            product_amount: item.amount,
          };
        });

        const data = {
          basket: JSON.stringify(newBasket),
          profile: profileCustomer,
        };

        data.profile.bill_price = totalPrice;

        insertBill(data);
      } else {
        const newBasket = loginedBasket.map((item) => {
          return {
            details_product_id: item.details_product_id,
            product_amount: item.amount,
          };
        });

        const data = {
          basket: JSON.stringify(newBasket),
          profile: profileCustomer,
        };

        data.profile.user_id = loginedUser.user_id;
        data.profile.bill_price = totalPrice;

        insertBill(data);
      }
    }
  };

  const { handleChange, handleAddress, handleSubmit, values, errors } =
    useCheckout(handleConfirm, validateCheckout);

  useEffect(() => {
    dispatch({
      type: "RESET_PROFILE_CUSTOMER",
    });
  }, [location.pathname]);

  const getColorList = (id, rom) => {
    let miniList =
      details_product.length > 0
        ? details_product.filter((detail) => detail.product_id == id)
        : [];

    let color_list = miniList.filter((item) => item.rom_id == rom).reverse();

    return color_list;
  };

  useEffect(() => {
    if (isLogined) {
      setBasketLength(
        loginedBasket
          .map((item) => item.amount)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    } else {
      setBasketLength(
        basket
          .map((item) => item.amount)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    }
  }, [loginedBasket, basket]);

  useEffect(() => {
    if (isLogined) {
      setTotalPrice(
        loginedBasket
          .map(
            (item) =>
              Number(
                item.product_price -
                  (item.product_price * item.product_discount) / 100
              ) * item.amount
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    } else {
      setTotalPrice(
        basket
          .map((item) => Number(item.product_price) * item.amount)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          )
      );
    }
  }, [basket, loginedBasket]);

  async function callMomo() {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/call-momo",
        data: {
          amount: totalPrice,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function increaseLoginedBasket(user_id, basket_id) {
    console.log(user_id, basket_id);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/increase-basket",
        data: {
          user_id: user_id,
          basket_id: basket_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function decreaseLoginedBasket(user_id, basket_id) {
    console.log(user_id, basket_id);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/decrease-basket",
        data: {
          user_id: user_id,
          basket_id: basket_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItemBasket(user_id, basket_id) {
    console.log(user_id, basket_id);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/delete-basket",
        data: {
          user_id: user_id,
          basket_id: basket_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function changeColorItemBasket(user_id, basket_id, details_product_id) {
    console.log(user_id, basket_id);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/color-basket",
        data: {
          user_id: user_id,
          basket_id: basket_id,
          details_product_id: details_product_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const increaseBasket = (item) => {
    if (item && item.amount < item.product_storage) {
      if (!isLogined) {
        dispatch({
          type: "INCREASE_BASKET",
          payload: {
            details_product_id: item.details_product_id,
          },
        });
      } else {
        increaseLoginedBasket(item.user_id, item.basket_id);
      }
    } else {
      error("Vượt quá số lượng sản phẩm có sẵn !");
    }
  };

  const decreaseBasket = (item) => {
    if (!isLogined) {
      dispatch({
        type: "DECREASE_BASKET",
        payload: {
          details_product_id: item.details_product_id,
        },
      });
    } else {
      decreaseLoginedBasket(item.user_id, item.basket_id);
    }
  };

  const removeBasket = (item) => {
    if (!isLogined) {
      dispatch({
        type: "REMOVE_BASKET",
        payload: {
          details_product_id: item.details_product_id,
        },
      });
    } else {
      removeItemBasket(item.user_id, item.basket_id);
    }
  };

  const handleSelectColor = (e, id) => {
    window.onclick = (event) => {
      if (event.target != e.target) {
        setIsSelectColor(false);
      }
    };
    if (id !== idActiveDropDown) {
      setIsSelectColor(true);
      setIdActiveDropDow(id);
    } else {
      setIsSelectColor(!isSelectColor);
    }
  };

  const handleChangeColor = (item, newItem) => {
    if (!isLogined) {
      dispatch({
        type: "CHANGE_COLOR",
        payload: {
          details_product_id: item.details_product_id,
          newItem: newItem,
        },
      });
    } else {
      changeColorItemBasket(
        item.user_id,
        item.basket_id,
        newItem.details_product_id
      );
    }
  };

  const handleChangePayment = (index) => {
    if (index != 1) {
      setIsPayPal(false);
    }
    setActivePayment(index);
  };

  return (
    <div className="checkout_wrapper">
      <div className="checkout_product-list">
        <ul className="checkout_product-list-wrapper">
          {basket.map((item, index) => (
            <li className="checkout_product" key={index}>
              <div className="product_info-left">
                <img
                  className="product_info-img"
                  src={productImageUrl(item.product_image)}
                  alt=""
                />
                <p
                  className="product_info-delete"
                  onClick={() => removeBasket(item)}
                >
                  <HighlightOffIcon />
                  <span>Xóa</span>
                </p>
              </div>
              <div className="product_info-center">
                <h3>
                  Điện thoại {item?.product_name + " " + item?.rom_value + "GB"}
                </h3>
                {/* <ul className="product_info-code-list">
                  <li className="product_info-code-item">
                    Nhập mã DMX100 giảm 3% tối đa 100.000đ khi thanh toán quét
                    QRcode qua App của ngân hàng
                  </li>
                </ul> */}

                <div className="product_info-color">
                  <span
                    onClick={(e) =>
                      handleSelectColor(e, item.details_product_id)
                    }
                    className="product_info-color-heading"
                  >
                    {console.log(item)}
                    Màu: {item.color_value} <ArrowDropDownIcon />
                  </span>
                  <div
                    className={`${
                      isSelectColor &&
                      idActiveDropDown == item.details_product_id
                        ? "product_info-mini-wrapper active"
                        : "product_info-mini-wrapper"
                    }`}
                  >
                    <div className="arrow-up"></div>
                    <div
                      className={`${
                        isSelectColor &&
                        idActiveDropDown == item.details_product_id
                          ? "product_info-color-dropdown active"
                          : "product_info-color-dropdown"
                      }`}
                    >
                      <ul className="product_info-color-dropdown-list">
                        {getColorList(item.product_id, item.rom_id).map(
                          (singleMini, miniIndex) => (
                            <li
                              className="product_info-color-dropdown-item"
                              onClick={() =>
                                item.color_id != singleMini.color_id &&
                                handleChangeColor(item, singleMini, miniIndex)
                              }
                              key={miniIndex}
                            >
                              <img
                                src={productImageUrl(singleMini.product_image)}
                                alt=""
                                className="product_info-mini-img"
                              />
                              <span
                                className={`${
                                  singleMini.details_product_id ==
                                  item.details_product_id
                                    ? "product_info-mini-color active"
                                    : "product_info-mini-color"
                                }`}
                              >
                                {singleMini.color_value}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product_info-right">
                <div className="product_info-price-wrapper">
                  <div className="product_info-old-price">
                    <strike>{formatMoney(item?.product_price)}</strike>
                    <sup>đ</sup>
                  </div>
                  <p className="product_info-price">
                    {formatMoney(
                      item.product_price -
                        (item.product_price * item.product_discount) / 100
                    )}
                    <sup>đ</sup>{" "}
                  </p>
                </div>

                <div className="product_info-input-wrapper">
                  <div className="product_info-storage">
                    <span>{item.product_storage} sản phẩm có sẵn</span>
                  </div>
                  <div className="product_info-quantity">
                    <span
                      className={`${
                        item?.amount > 1
                          ? "product_info-quantity-minus active"
                          : "product_info-quantity-minus"
                      }`}
                      onClick={() =>
                        item.amount > 1 ? decreaseBasket(item) : null
                      }
                    >
                      -
                    </span>
                    <input type="number" min="1" value={item?.amount} />
                    <span
                      className="product_info-quantity-plus active"
                      onClick={() => increaseBasket(item)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="checkout_totalPrice">
          <span>Tạm tính ({basketLength} sản phẩm):</span>
          <p className="product_info-totalPrice">
            {formatMoney(totalPrice)}
            <sup>đ</sup>
          </p>
        </div>
      </div>
      <form className="checkout_form">
        <div className="checkout_profile">
          <h3>Thông tin khách hàng</h3>
          <div className="checkout_profile-input ">
            <div className="checkout_profile-gender">
              <input
                type="radio"
                value="Nam"
                name="gender"
                checked={values.gender == "Nam"}
                onChange={handleChange}
              ></input>
              <label htmlFor="gender" onClick={handleChange}>
                Nam
              </label>
              <input
                type="radio"
                value="Nữ"
                name="gender"
                checked={values.gender == "Nữ"}
                onChange={handleChange}
              ></input>
              <label htmlFor="gender" onClick={handleChange}>
                Nữ
              </label>
            </div>
            <div className="checkout_profile-infor d-flex">
              <div className="checkout_profile-name-wrapper">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="name"
                  className={
                    errors.name
                      ? "checkout_profile-fullName checkout_text-input error-input"
                      : "checkout_profile-fullName checkout_text-input"
                  }
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name ? <p className="error-text">{errors.name}</p> : ""}
              </div>
              <div className="checkout_profile-phoneNumber-wrapper">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  name="phone_number"
                  className={
                    errors.phone_number
                      ? "checkout_profile-phoneNumber checkout_text-input error-input"
                      : "checkout_profile-phoneNumber checkout_text-input"
                  }
                  value={values.phone_number}
                  onChange={handleChange}
                />
                {errors.phone_number ? (
                  <p className="error-text">{errors.phone_number}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="checkout_ship">
              <h3 className="checkout_ship-title">CHỌN CÁCH THỨC NHẬN HÀNG</h3>

              <AddressCheckout
                values={values}
                handleAddress={handleAddress}
                errors={errors}
                handleChange={handleChange}
              />
            </div>

            <div className="checkout_payment">
              <h3 className="checkout_payment-title">
                CHỌN CÁCH THỨC THANH TOÁN
              </h3>
              <ul className="checkout_payment-method-list">
                {paymentMethods.map((item, index) => (
                  <li
                    className="checkout_payment-method-item"
                    key={index}
                    onClick={() => handleChangePayment(index)}
                  >
                    <input
                      type="radio"
                      className="checkout_payment-input"
                      checked={activePayment == index}
                    />
                    {item.payment_img_logo != "" ? (
                      <img src={item.payment_img_logo} alt="" />
                    ) : (
                      ""
                    )}
                    <label htmlFor="momo">{item.payment_content}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="checkout_profile-total-wrapper d-flex">
              <span>Tổng tiền:</span>
              <span className="checkout_profile-total-money">
                {formatMoney(totalPrice)}
                <sup>đ</sup>
              </span>
            </div>
            <div className="checkout_profile-confirm-wrapper">
              {isPayPal ? (
                <PayPal insertBill={insertBill} amount={totalPrice} />
              ) : (
                <button className="checkout_confirm-btn" onClick={handleSubmit}>
                  Đặt hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
