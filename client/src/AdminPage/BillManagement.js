import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import DetailBill from "./components/modal/DetailBIll";
import Modal from "../Modal/Modal";

function ProductManagement() {
  const [{ details_product, products, rams, roms, colors }, dispatch] =
    useStateValue();
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState([]);
  const [detailBill, setDetailBill] = useState([]);
  const [isOpenDetailBill, setIsOpenDetailBill] = useState(false);
  const axios = require("axios");
  const { error, success } = Toast;

  async function getBills() {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-bills",
      });
      if (Array.isArray(response.data)) {
        setBills(response.data);
      }
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

  async function decreaseStorage(amount, details_product_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update-storage",
        data: {
          product_storage: amount,
          details_product_id: details_product_id,
        },
      });
      if (response.data) {
        getDetailsProduct();
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function getDetailBills(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-detailbill-user",
        data: {
          data: data,
        },
      });
      if (Array.isArray(response.data)) {
        setDetailBill(response.data);
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function updateStorage(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-detailbill-user",
        data: {
          data: data,
        },
      });
      if (Array.isArray(response.data)) {
        response.data.forEach((item) => {
          console.log(item);
          decreaseStorage(item.product_amount, item.details_product_id);
        });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  const searchBills = async (bill_id) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-bills",
        data: {
          bill_id: bill_id,
        },
      });
      if (Array.isArray(response.data)) {
        setBills(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBills = {
    onDestroyBill: async (bill_id) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/destroy-bill",
          data: {
            bill_id: bill_id,
          },
        });
        if (response.data) {
          getBills();
          success(response.data);
        } else {
          error("Lỗi");
        }
      } catch (error) {
        error("Lỗi");
      }
    },
    onConfirmBill: async (bill_id) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/confirm-bill",
          data: {
            bill_id: bill_id,
          },
        });
        if (response.data) {
          const data = {
            bill_id: bill_id,
          };
          getBills();
          updateStorage(data);
          success(response.data);
        } else {
          error("Lỗi");
        }
      } catch (error) {
        error("Lỗi");
      }
    },
    onDeleteBill: async (bill_id) => {
      if (window.confirm("Bạn có chắc muốn xóa bill này không?") == true) {
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/delete-bill",
            data: {
              bill_id: bill_id,
            },
          });
          if (response.data) {
            getBills();
            success(response.data);
          } else {
            error("Lỗi");
          }
        } catch (error) {
          error("Lỗi");
        }
      }
    },
    onOpenDetailBill: async (bill, bill_id) => {
      const data = {
        bill_id: bill_id,
      };
      document.body.style.overflow = "hidden";
      setBill(bill);
      getDetailBills(data);
      setIsOpenDetailBill(true);
    },
  };

  const handleChange = (e) => {
    searchBills(e.target.value);
  };

  useEffect(() => {
    getBills();
  }, []);

  const productCells = [
    "STT",
    "Mã hóa đơn",
    "Họ tên khách hàng",
    "Giới tính",
    "Số điện thoại",
    "Địa chỉ",
    "Ghi chú",
    "Ngày lập hóa đơn",
    "Hình thức thanh toán",
    "Xem chi  tiết",
    "Trạng thái",
    "Xóa",
  ];

  return (
    <div>
      <Home
        list={bills}
        isBillPage={true}
        cells={productCells}
        onChange={handleChange}
        handleClick={handleBills}
      />
      <Modal
        handleOpenModal={setIsOpenDetailBill}
        isOpenModal={isOpenDetailBill}
        ModalForm={() => <DetailBill bill={bill} detailBill={detailBill} />}
      />
    </div>
  );
}

export default ProductManagement;
