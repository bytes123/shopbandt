import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import DetailBill from "./components/modal/DetailBIll";
import Modal from "../Modal/Modal";

function AccountManagement() {
  const [{ details_product, products, rams, roms, colors }, dispatch] =
    useStateValue();
  const [accounts, setAccounts] = useState([]);
  const axios = require("axios");
  const { error, success } = Toast;

  const accountCells = [
    "STT",
    "Tài khoản",
    "Email",
    "Ngày tạo",
    "Cấp quyền",
    "",
  ];

  async function getAccounts() {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/user",
      });
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setAccounts(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function getAccountByName(user_name) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/user-byname",
        data: {
          user_name: user_name,
        },
      });
      if (Array.isArray(response.data)) {
        setAccounts(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function updateRole(data) {
    console.log(data);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update-role",
        data: data,
      });
      if (response.data) {
        getAccounts();
        success(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function deleteUser(user_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/delete-user",
        data: {
          user_id: user_id,
        },
      });
      if (response.data) {
        getAccounts();
        success(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  const handleAccounts = {
    onChangeIsAdmin: (user) => {
      if (user.isAdmin == 0) {
        const data = {
          isAdmin: 1,
          user_id: user.user_id,
        };
        updateRole(data);
      } else {
        const data = {
          isAdmin: 0,
          user_id: user.user_id,
        };
        updateRole(data);
      }
    },
    onDeleteAccount: (user_id) => {
      if (window.confirm("Bạn có chắc muốn xóa tài khoản này không?") == true) {
        deleteUser(user_id);
      }
    },
  };

  const handleSearchAccount = (event) => {
    getAccountByName(event.target.value);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <Home
        list={accounts}
        handleChange={handleAccounts.onChangeIsAdmin}
        isAccountPage={true}
        cells={accountCells}
        onChange={handleSearchAccount}
        handleClick={handleAccounts.onDeleteAccount}
      />
    </div>
  );
}

export default AccountManagement;
