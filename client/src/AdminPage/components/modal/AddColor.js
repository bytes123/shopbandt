// 1. OPTIMIZE FETCH DATA

import React, { useState, useEffect } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useStateValue } from "../../../StateProvider";
import DropDown from "../dropdown/DropDown";
import "./modal.scss";
import Toast from "../../../toast/Toast";

function AddColor() {
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

  // ----------------------------------------------------------------

  // SEND DATA TO SERVER
  async function insertColorProduct(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/colors",
        data: data,
      });

      if (response.data) {
        getColors();
        getDetailsProduct();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SUBMIT FORM
  const handleSubmit = (event) => {
    event.preventDefault();
    function xoa_dau(str) {
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
      str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
      str = str.replace(/??|??|???|???|??/g, "i");
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
      str = str.replace(/???|??|???|???|???/g, "y");
      str = str.replace(/??/g, "d");
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
      str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
      str = str.replace(/??|??|???|???|??/g, "I");
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
      str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
      str = str.replace(/???|??|???|???|???/g, "Y");
      str = str.replace(/??/g, "D");
      return str;
    }
    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);
    }
    if (!selectedCategory && !selectedCategory.id) {
      return;
    }
    if (selectedTitle.trim().length == 0) {
      setErrors({ ...errors, title: "Vui l??ng nh???p m??u s???c" });
    } else if (containsSpecialChars(selectedTitle)) {
      setErrors({ ...errors, title: "Vui l??ng nh???p k?? t??? h???p l???" });
    } else {
      const data = {
        color_id:
          xoa_dau(selectedTitle.trim()).toLowerCase() +
          selectedCategory.id +
          Date.now(),
        color_value: selectedTitle,
        category_id: selectedCategory.id,
      };
      insertColorProduct(data);
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
        <p>TH??M RAM</p>
      </div>
      <form enctype="multipart/form-data" className="modal_product-add-form">
        <div className="product_category-add my-2">
          <label htmlFor="">Ch???n danh m???c</label>
          <br />
          <DropDown
            data={categoryList}
            selectedItem={selectedCategory}
            onSelectedItem={setSelectedCategory}
          />
        </div>

        <div className="product_name-add my-2">
          <label htmlFor="">T??n m??u s???c</label>
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

        <button className="btn btn-primary" onClick={handleSubmit}>
          Th??m
        </button>
      </form>
    </div>
  );
}

export default AddColor;
