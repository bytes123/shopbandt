import React, { useState, useEffect } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useStateValue } from "../../../StateProvider";
import DropDown from "../dropdown/DropDown";
import Add from "../editor/Add";
import "./modal.scss";
import Toast from "../../../toast/Toast";

function UpdateBrand({ getBrands, brand }) {
  const [{ cleanString, product_category, brandImageUrl }, dispatch] =
    useStateValue();

  const { error, success } = Toast;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [categoryList, setCategoryList] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState("");

  const [errors, setErrors] = useState();
  const axios = require("axios");

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    // I've kept this example simple by using the first image instead of multiple
    if (!validImageTypes.includes(e.target.files[0].type)) {
      setErrors({ ...errors, image: "Vui lòng chọn hình ảnh hợp lệ" });
    } else {
      setErrors({});
      setSelectedFile(e.target.files[0]);
    }
  };

  // SET DEFAULT CATEGORY LIST AND SELECTED CATEOGRY FOR ADD FORM
  useEffect(() => {
    if (product_category) {
      const data = product_category.map((item, index) => {
        return {
          id: item.category_id,
          label: item.category_name,
        };
      });

      if (brand) {
        const updateCategory = data.filter(
          (item) => item.id == brand.category_id && item
        )[0];

        setSelectedCategory(updateCategory);
        setSelectedBrand(brand.brand_name);
      }

      setCategoryList(data);
    }
  }, [product_category]);

  // SEND DATA TO SERVER
  async function updateBrand(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update-brand",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        getBrands();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SUBMIT FORM
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      error("Vui lòng chọn đầy đủ trước khi thêm");
      return;
    }

    if (selectedBrand.trim().length == 0) {
      setErrors({ ...errors, brand: "Vui lòng nhập tên hãng" });
    } else {
      const data = {
        brand_id: brand.brand_id,
        brand_name: selectedBrand,
        category_id: selectedCategory.id,
      };
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("data", JSON.stringify(data));
      updateBrand(formData);
    }
  };

  // CHANGE TITLE BRAND
  const handleChangeTitleBrand = (event) => {
    setErrors({});
    setSelectedBrand(event.target.value);
  };

  return (
    <div className="modal_product-add modal_form">
      <div className="title">
        <AddBusinessIcon className="mb-2 cl-red" />
        <p>THÊM HÃNG</p>
      </div>
      <form
        action="
      "
        className="modal_product-add-form"
      >
        <div className="product_image-add my-2">
          <label htmlFor="">Hình hãng</label>
          {selectedFile ? (
            <>
              <br />
              <img src={preview} alt="" className="preview_image" />
            </>
          ) : (
            <>
              <br />
              <img
                src={
                  brand && brand.brand_image
                    ? brandImageUrl(brand.brand_image)
                    : ""
                }
                alt=""
                className="preview_image"
              />
            </>
          )}

          <br />
          <label className="product_image-add-main mt-3">
            <FileUploadIcon className="product_image-add-btn" />
            <input type="file" onChange={onSelectFile} />
          </label>
        </div>
        {errors && errors.image && <p className="error-text">{errors.image}</p>}
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
          <input
            type="text"
            value={selectedBrand}
            className={
              errors && errors.brand
                ? "product_brand-name-input error-input"
                : "product_brand-name-input"
            }
            onChange={handleChangeTitleBrand}
          />
        </div>
        {errors && errors.brand && <p className="error-text">{errors.brand}</p>}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default UpdateBrand;
