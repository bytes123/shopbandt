import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import DetailBill from "./components/modal/DetailBIll";
import AddBrand from "./components/modal/AddBrand";
import UpdateBrand from "./components/modal/UpdateBrand";
import Modal from "../Modal/Modal";

function BrandManagement() {
  const [{ details_product, products, rams, roms, colors, brands }, dispatch] =
    useStateValue();
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState([]);
  const [isOpenAddBrand, setIsOpenAddBrand] = useState(false);
  const [isOpenUpdateBrand, setIsOpenUpdateBrand] = useState(false);
  const axios = require("axios");
  const { error, success } = Toast;

  const brandCells = [
    "STT",
    "Logo",
    "Tên hãng",
    "Danh mục",
    "Ngày tạo",
    "",
    "",
  ];

  async function getBrands() {
    try {
      const response = await axios.get("http://localhost:5000/brands");
      dispatch({
        type: "GET_BRANDS",
        payload: response.data,
      });
      setIsOpenUpdateBrand(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setBrandList(brands);
  }, [brands]);

  async function getBrandByname(brand_name) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-brands",
        data: {
          brand_name: brand_name,
        },
      });
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setBrandList(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function deleteBrand(brand_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/delete-brand",
        data: {
          brand_id: brand_id,
        },
      });
      if (response.data) {
        getBrands();
        success(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  const handleBrands = {
    handleOpenAddBrand: () => {
      setIsOpenAddBrand(true);
    },
    handleOpenUpdateBrand: (brand) => {
      setBrand(brand);
      setIsOpenUpdateBrand(true);
    },
    onDeleteBrand: (brand_id) => {
      if (window.confirm("Bạn có chắc muốn xóa hãng này không?") == true) {
        deleteBrand(brand_id);
      }
    },
  };

  const handleSearchBrand = (event) => {
    getBrandByname(event.target.value);
  };

  return (
    <div>
      <Home
        list={brands}
        isBrandPage={true}
        onChange={handleSearchBrand}
        cells={brandCells}
        handleClick={handleBrands}
      />
      <Modal
        handleOpenModal={setIsOpenAddBrand}
        isOpenModal={isOpenAddBrand}
        ModalForm={() => <AddBrand getBrands={getBrands} />}
      />
      <Modal
        handleOpenModal={setIsOpenUpdateBrand}
        isOpenModal={isOpenUpdateBrand}
        ModalForm={() => <UpdateBrand getBrands={getBrands} brand={brand} />}
      />
    </div>
  );
}

export default BrandManagement;
