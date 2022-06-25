import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useStateValue } from "../StateProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
  const axios = require("axios");
  const [{ basket, loginedBasket, loginedUser, productImageUrl }, dispatch] =
    useStateValue();
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState();
  const [basketLength, setBasketLength] = useState(0);
  const [products, setProducts] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const searchBarRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setAccessToken(Cookies.get("accessToken"));
    }

    if (Cookies.get("user")) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, [Cookies.get("user") || Cookies.get("accessToken")]);

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setBasketLength(loginedBasket.length);
    } else {
      setBasketLength(basket.length);
    }
  }, [basket, loginedBasket]);

  const logOut = async (e) => {
    e.stopPropagation();

    try {
      console.log(accessToken);
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/logout",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      Cookies.remove("accessToken");
      Cookies.remove("user");

      window.location.assign("/");
    } catch (error) {
      console.error(error);
    }
  };

  async function searchProduct(product_name) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-products",
        data: {
          product_name: product_name,
        },
      });
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleOpenSearch = () => {
    setIsSearch(true);
  };

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  const handleSearch = (event) => {
    handleOpenSearch();
    const handleOutSide = (event) => {
      if (
        event.target != searchBarRef.current &&
        event.target != searchInputRef.current
      ) {
        handleCloseSearch();
      }
    };
    document.addEventListener("click", handleOutSide);
    setKeyword(event.target.value);
  };

  const searchEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`/products/${event.target.value}`);
    }
  };

  useEffect(() => {
    if (keyword == "") {
      handleCloseSearch();
      setProducts([]);
    } else {
      searchProduct(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    setKeyword("");
  }, [pathname]);

  return (
    <div className="header">
      <Link to="/">
        <img
          src={require("../images/logo-web.png")}
          alt=""
          className="header_logo "
        />
      </Link>

      <div className="header_search" ref={searchBarRef}>
        <input
          type="text"
          className="header_searchInput"
          ref={searchInputRef}
          value={keyword}
          onClick={handleSearch}
          onChange={handleSearch}
          onKeyDown={searchEnter}
        />
        <div className="header_search-icon-wrapper">
          <Link to={`/products/${keyword}`}>
            <SearchIcon className="header_searchIcon" />
          </Link>
        </div>
        {isSearch && (
          <div className="search_bar">
            <ul className="search-bar-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <li className="search-bar-item">
                    <Link
                      to={`/products/${product.product_id}/${product.details_product_id}`}
                      className="search-bar-link"
                    >
                      <img
                        src={productImageUrl(product.product_image)}
                        alt=""
                      />
                      <h4>{product.product_name}</h4>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="search-bar-item">
                  <p className="empty">Không có sản phẩm nào...</p>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="header_nav">
        {!user ? (
          <>
            <div className="header_option">
              <div className="header_option-item">
                <Link to="/register" className="header_login-link">
                  <AccountCircleIcon />
                  Đăng ký
                </Link>
              </div>
            </div>
            <div className="header_option">
              <div className="header_option-item">
                <Link to="/login" className="header_login-link">
                  <AccountCircleIcon />
                  Đăng nhập
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="header_option header_option-user">
            <div className="header_option-item">
              <Link to="" className="header_login-link">
                <AccountCircleIcon />
                {user.user_name ?? ""}
              </Link>
            </div>
            <div className="header_option-sub">
              <div className="header_option-arrow">
                <div className="arrow-up"></div>
              </div>
              <div className="sub_menu">
                <Link to="/change-password">
                  <p>Đổi mật khẩu</p>
                </Link>
              </div>
              <div className="sub_menu" onClick={logOut}>
                <p>Đăng xuất</p>
              </div>
            </div>
          </div>
        )}
        <div className="header_option">
          <div className="header_option-item">
            <Link to="/bill-history" className="header_login-link">
              <DescriptionIcon />
              Lịch sử đơn hàng
            </Link>
          </div>
        </div>
        {loginedUser && loginedUser.isAdmin == 1 && (
          <div className="header_option">
            <div className="header_option-item">
              <Link to="/admin" className="header_login-link">
                <AdminPanelSettingsIcon />
                Quản lý trang
              </Link>
            </div>
          </div>
        )}
        <div className="header_option">
          <div className="header_option-item">
            <Link to="/checkout" className="header_login-link">
              <div className="header_option-cart">
                <div className="header_optionBasket">
                  <ShoppingBasketIcon className="header_optionBasketIcon" />
                  <span className="header_optionLineTwo header_basketCount">
                    {basketLength}
                  </span>
                </div>
              </div>
              Giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
