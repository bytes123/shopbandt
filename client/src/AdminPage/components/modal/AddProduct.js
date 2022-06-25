// 1. OPTIMIZE FETCH DATA

import React, { useState, useEffect } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useStateValue } from "../../../StateProvider";
import DropDown from "../dropdown/DropDown";
import "./modal.scss";
import Toast from "../../../toast/Toast";

function AddProductForm() {
  const [{ details_product, product_category, brands }, dispatch] =
    useStateValue();
  const [categoryList, setCategoryList] = useState();
  const [brandList, setBrandList] = useState();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [errors, setErrors] = useState();
  const axios = require("axios");
  const { success } = Toast;

  // SET DEFAULT CATEGORY LIST AND SELECTED CATEOGRY FOR ADD FORM
  useEffect(() => {
    if (product_category) {
      const data = product_category.map((item, index) => {
        return {
          id: item.category_id,
          label: item.category_name,
        };
      });

      setSelectedCategory(data[0]);

      setCategoryList(data);
    }
  }, [product_category]);

  // SET DEFAULT BRAND LIST AND SELECTED BRAND FOR ADD FORM
  useEffect(() => {
    if (selectedCategory && brands.length > 0) {
      const data = brands
        .filter((item) => item.category_id == selectedCategory.id)
        .map((item, index) => {
          return {
            id: item.brand_id,
            label: item.brand_name,
          };
        });

      setBrandList(data);
    }
  }, [brands, selectedCategory]);

  // SET DEFAULT SELECTED BRAND
  useEffect(() => {
    if (brandList && brandList.length > 0) {
      setSelectedBrand(brandList[0]);
    }
  }, [brandList]);

  // 1. -> NEED OPTIMIZE----------------------------------------------
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

  // ----------------------------------------------------------------

  // SEND DATA TO SERVER
  async function insertProduct(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/products",
        data: data,
      });

      if (response) {
        getProducts();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SUBMIT FORM
  const handleSubmit = (event) => {
    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);
    }
    event.preventDefault();
    if (!selectedCategory && !selectedCategory.id) {
      return;
    }
    if (selectedTitle.trim().length == 0) {
      setErrors({ ...errors, title: "Vui lòng nhập tên sản phẩm" });
    } else if (containsSpecialChars(selectedTitle)) {
      setErrors({ ...errors, title: "Vui lòng nhập ký tự hợp lệ" });
    } else {
      const data = {
        product_id: selectedTitle.replace(" ", "-") + "-" + Date.now(),
        product_name: selectedTitle,
        category_id: selectedCategory.id,
        brand_id: selectedBrand.id,
      };
      insertProduct(data);
    }
  };

  // CHANGE SELECTED TITLE

  const handleChangeTitle = (event) => {
    setErrors({});
    setSelectedTitle(event.target.value);
  };

  return (
    <div className="modal_product-add modal_form" style={{ overflow: "auto" }}>
      <div className="title">
        <AddBusinessIcon className="mb-2 cl-red" />
        <p>THÊM LOẠI SẢN PHẨM</p>
      </div>
      <form enctype="multipart/form-data" className="modal_product-add-form">
        <div className="product_name-add my-2">
          <label htmlFor="">Tên sản phẩm</label>
          <br />
          <input
            type="text"
            name="product_name"
            className={
              errors && errors.title
                ? "product_name-input error-input"
                : "product_name-input"
            }
            onChange={handleChangeTitle}
          />
        </div>
        {errors && errors.title && <p className="error-text">{errors.title}</p>}
        <div className="product_category-add my-2">
          <label htmlFor="">Chọn danh mục</label>
          <br />
          <DropDown
            data={categoryList}
            selectedItem={selectedCategory}
            onSelectedItem={setSelectedCategory}
          />
        </div>
        <div className="product_brand-add my-2">
          <label htmlFor="">Chọn hãng</label>
          <br />
          <DropDown
            data={brandList}
            selectedItem={selectedBrand}
            onSelectedItem={setSelectedBrand}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
