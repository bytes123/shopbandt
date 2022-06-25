import { useEffect } from "react";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";
import Home from "./HomePage/Home";
import Checkout from "./Checkout/Checkout";
import Brands from "./Brands";
import Banner from "./Partials/Banner";
import ProductCategory from "./ProductCategory";
import ScrollToTop from "./scrollToTop";
import MainCategoryPage from "./CategoryPage/MainCategoryPage";
import MainProductPage from "./ProductPage/MainProductPage";
import MainBrandPage from "./MainBrandPage";
import AdminPage from "./AdminPage/AdminPage";
import ProductManagement from "./AdminPage/ProductManagement";
import BillManagement from "./AdminPage/BillManagement";
import CommentManagement from "./AdminPage/CommentManagement";
import AccountManagement from "./AdminPage/AccountManagement";
import BrandManagement from "./AdminPage/BrandManagement";
import LoginPage from "./UserPage/LoginPage";
import RegisterPage from "./UserPage/RegisterPage";
import BillHistory from "./BillHistory/BillHistory";
import SearchPage from "./SearchPage/SearchPage";
import NoMatch from "./NoMatch";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import ChangePassWordPage from "./PassWordPage/ChangePassWordPage";
import ResetPasswordPage from "./PassWordPage/ResetPasswordPage";
import MailResetPage from "./PassWordPage/MailResetPage";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./App.css";

function App() {
  const axios = require("axios");
  const [
    {
      user,
      accessToken,
      brands,
      loginedBasket,
      comments,
      isLogined,
      loginedUser,
    },
    dispatch,
  ] = useStateValue();

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:5000/products");

      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

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

  async function getRams() {
    try {
      const response = await axios.get("http://localhost:5000/rams");

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_RAMS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getRoms() {
    try {
      const response = await axios.get("http://localhost:5000/roms");

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_ROMS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getColors() {
    try {
      const response = await axios.get("http://localhost:5000/colors");

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_COLORS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getProductCategory() {
    try {
      const response = await axios.get("http://localhost:5000/category");
      dispatch({
        type: "GET_PRODUCT_CATEGORY",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getBrands() {
    try {
      const response = await axios.get("http://localhost:5000/brands");
      dispatch({
        type: "GET_BRANDS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getPriceFilter() {
    try {
      const response = await axios.get("http://localhost:5000/filter/price");
      dispatch({
        type: "GET_PRICE_FILTER",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

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

  const setIsLogined = () => {
    if (Cookies.get("accessToken") && Cookies.get("user")) {
      dispatch({
        type: "SET_LOGINED",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_LOGINED",
        payload: false,
      });
    }
  };

  const setLoginedUser = (user) => {
    dispatch({
      type: "SET_LOGINED_USER",
      payload: user,
    });
  };

  useEffect(() => {
    getProducts();
    getDetailsProduct();
    getProductCategory();
    getBrands();
    getPriceFilter();
    setIsLogined();
    getRams();
    getRoms();
    getColors();
    if (Cookies.get("accessToken") && Cookies.get("user")) {
      let user = JSON.parse(Cookies.get("user"));
      getBasket(user.user_id);
      setLoginedUser(user);
    }
  }, []);

  useEffect(() => {
    getDetailsProduct();
  }, [comments]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <ProductCategory />
                <Banner />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/bill-history"
            element={
              <>
                <Header />
                <ProductCategory />
                <Banner />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <BillHistory />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <ProductCategory />
                <Banner />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route />
          {/* <Route
            path="/:brand_name"
            element={
              <>
                <Header />
                <ProductCategory />
                <Banner />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "phone") ?? []
                  }
                />
                <MainBrandPage />
                <Footer />
              </>
            }
          /> */}
          <Route
            path="/products/:product_name"
            element={
              <>
                <Header />
                <ProductCategory />
                <Banner />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <SearchPage />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/category/:category_id"
            element={
              <>
                <Header />
                <ProductCategory />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <MainCategoryPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/category/:category_id/:brand_id"
            element={
              <>
                <Header />
                <ProductCategory />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <MainCategoryPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/:category_name/:product_id/:detail_id"
            element={
              <>
                <Header />
                <ProductCategory />
                <Brands
                  brandsList={
                    brands.filter((item) => item.category_id == "laptop") ?? []
                  }
                />
                <MainProductPage />
                <Footer />
              </>
            }
          />
          <Route />

          {loginedUser && loginedUser.isAdmin == 1 && (
            <>
              <Route
                path="/admin"
                element={
                  <>
                    <AdminPage />
                  </>
                }
              />
              <Route />

              <Route
                path="/admin/accounts"
                element={
                  <>
                    <AccountManagement />
                  </>
                }
              />
              <Route />

              <Route
                path="/admin/brands"
                element={
                  <>
                    <BrandManagement />
                  </>
                }
              />
              <Route />

              <Route
                path="/admin/products"
                element={
                  <>
                    <ProductManagement />
                  </>
                }
              />
              <Route />

              <Route
                path="/admin/bills"
                element={
                  <>
                    <BillManagement />
                  </>
                }
              />
              <Route />

              <Route
                path="/admin/comments"
                element={
                  <>
                    <CommentManagement />
                  </>
                }
              />
              <Route />
            </>
          )}

          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          <Route />

          {isLogined && loginedUser && (
            <>
              <Route
                path="/change-password"
                element={
                  <>
                    <Header />
                    <ChangePassWordPage />
                    <Footer />
                  </>
                }
              />
              <Route />
            </>
          )}

          <Route
            path="/reset-password"
            element={
              <>
                <Header />
                <MailResetPage />
                <Footer />
              </>
            }
          />
          <Route />

          <Route
            path="/reset-password/:token"
            element={
              <>
                <Header />
                <ResetPasswordPage />
                <Footer />
              </>
            }
          />
          <Route />

          <Route
            path="/register"
            element={
              <>
                <RegisterPage />
              </>
            }
          />
          <Route />

          <Route
            path="*"
            element={
              <>
                {" "}
                <Header />
                <NoMatch />
                <Footer />
              </>
            }
          />
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
