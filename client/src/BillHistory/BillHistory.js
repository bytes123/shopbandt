import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import DetailBill from "./components/DetailBill";
import "./billhistory.scss";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../toast/Toast";

function BillHistory() {
  const axios = require("axios");
  const [{ isLogined, loginedUser }, dispatch] = useStateValue();
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState();
  const [loading, setLoading] = useState(false);
  const { success } = Toast;
  const [isDetailBill, setIsDetailBill] = useState(false);

  const getBillsUser = async (user_id) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-bills-user",
        data: {
          user_id: user_id,
        },
      });
      if (Array.isArray(response.data)) {
        setBills(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBills = async (bill_id, toast) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-bills",
      });
      if (Array.isArray(response.data)) {
        await timeout(2000);
        setBill(...response.data.filter((item) => item.bill_id == bill_id));
        setLoading(false);
        success(toast);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(bill);
  }, [bill]);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getBillUser = async (user_id, bill_id, toast) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-bills-user",
        data: {
          user_id: user_id,
        },
      });

      if (Array.isArray(response.data)) {
        await timeout(2000);
        setBill(...response.data.filter((item) => item.bill_id == bill_id));
        setLoading(false);
        success(toast);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchBillsUser = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-bills-user",
        data: {
          data: data,
        },
      });
      if (Array.isArray(response.data)) {
        setBills(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        console.log(response.data);
        setBills(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchBills = (e) => {
    const data = {
      bill_id: e.target.value,
      user_id: loginedUser.user_id,
    };
    if (isLogined) {
      searchBillsUser(data);
    } else {
      console.log(1);
      searchBills(data.bill_id);
    }
  };

  const handleGetDetailBill = (bill) => {
    setBill(bill);
    setIsDetailBill(true);
  };

  const handleClose = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (loginedUser && loginedUser.user_id) {
      getBillsUser(loginedUser.user_id);
    }
  }, [isLogined]);

  return (
    <div className="bill_history-wrapper">
      <div className="container">
        {!isDetailBill && (
          <div className="bill_history py-5">
            <div className="bill_history-search logined">
              <input
                type="text"
                placeholder="Nhập mã đơn hàng để tìm kiếm đơn hàng"
                onChange={(e) => handleSearchBills(e)}
              />
            </div>
            <table className="bill_history-table table table-light">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">SĐT</th>
                  <th scope="col">Ngày mua</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {bills && bills.length > 0 ? (
                  bills.map((item) => (
                    <tr>
                      <th scope="row">1</th>
                      <td>{item.bill_id}</td>
                      <td>{item.bill_address}</td>
                      <td>{item.phone_number}</td>
                      <td>
                        {moment(item.create_date).format("DD/MM/YYYY HH:mm:ss")}
                      </td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleGetDetailBill(item)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className=" my-5">
                    <td className="empty-basket">Không có đơn hàng nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* {!isLogined && !isDetailBill && (
          <div className="bill_history py-5">
            <div className="bill_history-search logined">
              <input
                type="text"
                placeholder="Nhập mã đơn hàng hoặc số điện thoại để tìm kiếm đơn hàng"
              />
            </div>
            <table class="bill_history-table table table-light">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">SĐT</th>
                  <th scope="col">Ngày mua</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>#3</td>
                  <td>34/2</td>
                  <td>0705008419</td>
                  <td>27/12/2001</td>
                  <td>
                    <button className="btn btn-dark">Xem chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}

        {isDetailBill && (
          <DetailBill
            getBills={getBills}
            getBillUser={getBillUser}
            bill={bill}
            onIsDetailBill={setIsDetailBill}
            loginedUser={loginedUser}
          />
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BillHistory;
