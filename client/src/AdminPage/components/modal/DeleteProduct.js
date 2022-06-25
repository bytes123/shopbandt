import React from "react";
import Toast from "../../../toast/Toast";
import { useStateValue } from "../../../StateProvider";

const DeleteProductCall = async (product) => {
  const { success } = Toast;
  const axios = require("axios");
  const [{}, dispatch] = useStateValue();

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

  // SEND DATA TO SERVER
  async function deleteProduct(product_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/delete-product",
        data: product_id,
      });

      if (response) {
        getDetailsProduct();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (window.confirm("Bạn có chắc muốn xóa sản phẩm không?") == true) {
    deleteProduct(product.product_id);
  } else {
    console.log("No");
  }
};

export default { DeleteProductCall };
