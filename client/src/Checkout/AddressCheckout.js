import React, { useRef, useEffect, useState } from "react";
import useCheckout from "./useCheckout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import validateCheckout from "./validateCheckout";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

function AddressCheckout({ values, handleAddress, errors, handleChange }) {
  const [isSubCityList, setIsSubCityList] = useState(false);
  const [isSubDistrictList, setIsSubDistrictList] = useState(false);
  const [isSubWardList, setIsSubWardList] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [activeCity, setActiveCity] = useState({});
  const [activeDistrict, setActiveDistrict] = useState();
  const [activeWard, setActiveWard] = useState();
  const [keywordProvince, setKeywordProvince] = useState("");
  const [keywordDistrict, setKeywordDistrict] = useState("");
  const [keywordWard, setKeywordWard] = useState("");

  const axios = require("axios");

  const refCity = useRef(undefined);
  const refDistrict = useRef(undefined);
  const refWard = useRef(undefined);

  const handleOpenCityList = (e) => {
    setIsSubCityList(!isSubCityList);
    document.addEventListener("click", (ev) => {
      if (refCity.current && !refCity.current.contains(ev.target)) {
        setIsSubCityList(false);
      }
    });
  };

  const handleOpenDistrictList = (e) => {
    setIsSubDistrictList(!isSubDistrictList);
    document.addEventListener("click", (ev) => {
      if (refDistrict.current && !refDistrict.current.contains(ev.target)) {
        setIsSubDistrictList(false);
      }
    });
  };

  const handleOpenWardList = (e) => {
    if (values.district && values.district.wards) {
      setIsSubWardList(!isSubWardList);
      document.addEventListener("click", (ev) => {
        if (refWard.current && !refWard.current.contains(ev.target)) {
          setIsSubWardList(false);
        }
      });
    } else {
      setIsSubWardList(false);
    }
  };

  const handleActiveCity = (cityItem) => {
    handleAddress("province", cityItem);
    setIsSubCityList(false);
  };

  const handleActiveDistrict = (districtItem) => {
    handleAddress("district", districtItem);
    setIsSubDistrictList(false);
  };

  const handleActiveWard = (wardItem) => {
    handleAddress("ward", wardItem);
    setIsSubWardList(false);
  };

  useEffect(() => {
    handleAddress("district", "");
  }, [values.province]);

  useEffect(() => {
    handleAddress("ward", "");
  }, [values.district]);

  async function getCities() {
    try {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=3"
      );

      if (response.data.length > 0) {
        setCityList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function searchCities(value) {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/search/?q=${value}`
      );

      if (response.data) {
        if (response.data.length > 0) {
          setCityList(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function searchDistricts(value) {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/search/?q=${value}`
      );

      if (response.data) {
        if (response.data.length > 0) {
          setDistrictList(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function searchWards(value) {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/w/search/?q=${value}`
      );

      if (response.data) {
        if (response.data.length > 0) {
          setWardList(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (cityList && cityList[49]) {
      handleAddress("province", cityList[49]);
    }
  }, [cityList]);

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (values.province && values.province.districts) {
      setDistrictList(values.province.districts);
    }
  }, [values.province]);

  useEffect(() => {
    if (values.district && values.district.wards) {
      setWardList(values.district.wards);
    }
  }, [values.district]);

  useEffect(() => {
    if (activeDistrict && activeDistrict.wards) {
      setWardList(activeDistrict.wards);
    }
  }, [activeDistrict]);

  const handleSearchCity = (event) => {};

  return (
    <div className="checkout_profile-address-wrapper my-10  ">
      <div
        className="checkout_profile-province address-item col-6"
        ref={refCity}
      >
        <div
          className="checkout_province-selected address-selected"
          onClick={(e) => handleOpenCityList(e)}
        >
          <p>{values.province.name ? values.province.name : ""}</p>
          <ArrowDropDownIcon />
        </div>
        <div
          className={
            isSubCityList ? "checkout_ship-sub active" : "checkout_ship-sub"
          }
        >
          <div className="checkout_adrress-search ">
            <input
              type="text"
              className="checkout_address-search-input"
              placeholder="Nhập tỉnh,thành để tìm kiếm nhanh"
              onChange={handleSearchCity}
            />
            <div className="checkout_search-icon">
              <SearchIcon />
            </div>
          </div>
          <ul className="checkout_province-list address-subList ">
            {cityList.map((item, index) => (
              <li
                className="checkout_province-item"
                key={index}
                onClick={() => handleActiveCity(item)}
              >
                <p className="address-subItem">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="checkout_profile-district address-item col-6"
        ref={refDistrict}
      >
        <div
          className={
            errors.district
              ? "checkout_district-selected address-selected error-input"
              : "checkout_district-selected address-selected"
          }
          onClick={(e) => handleOpenDistrictList(e)}
        >
          <p>
            {values.district && values.district.name
              ? values.district.name
              : "Chọn Quận / huyện"}
          </p>
          <ArrowDropDownIcon />
        </div>
        {errors.district ? <p className="error-text">{errors.district}</p> : ""}
        <div
          className={
            isSubDistrictList ? "checkout_ship-sub active" : "checkout_ship-sub"
          }
        >
          <div className="checkout_adrress-search ">
            <input
              type="text"
              className="checkout_address-search-input"
              placeholder="Nhập quận,huyện để tìm kiếm nhanh"
            />
            <div className="checkout_search-icon">
              <SearchIcon />
            </div>
          </div>
          <ul className="checkout_province-list address-subList ">
            {districtList.map((item, index) => (
              <li
                className="checkout_province-item "
                key={index}
                onClick={() => handleActiveDistrict(item)}
              >
                <p className="address-subItem">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="checkout_profile-ward address-item col-6" ref={refWard}>
        <div
          className={
            errors.ward
              ? "checkout_ward-selected address-selected error-input"
              : "checkout_ward-selected address-selected"
          }
          onClick={(e) => handleOpenWardList(e)}
        >
          <p>
            {values.ward && values.ward.name
              ? values.ward.name
              : "Chọn Phường / Xã"}
          </p>
          <ArrowDropDownIcon />
        </div>
        {errors.ward ? <p className="error-text">{errors.ward}</p> : ""}
        <div
          className={
            isSubWardList ? "checkout_ship-sub active" : "checkout_ship-sub"
          }
        >
          <div className="checkout_adrress-search ">
            <input
              type="text"
              className="checkout_address-search-input"
              placeholder="Nhập phường,xã để tìm kiếm nhanh"
            />
            <div className="checkout_search-icon">
              <SearchIcon />
            </div>
          </div>
          <ul className="checkout_province-list address-subList row">
            {wardList.map((item, index) => (
              <li
                className="checkout_province-item"
                key={index}
                onClick={() => handleActiveWard(item)}
              >
                <p className="address-subItem">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="checkout_profile-myAdress address-item col-6">
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="address"
          className={
            errors.address
              ? "checkout_profile-address checkout_text-input w-100 error-input"
              : "checkout_profile-address checkout_text-input w-100"
          }
          value={values.address}
          onChange={handleChange}
        />
        {errors.address ? <p className="error-text">{errors.address}</p> : ""}
      </div>
    </div>
  );
}

export default AddressCheckout;
