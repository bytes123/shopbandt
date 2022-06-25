import React, { useState, useRef } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useRegister from "./useRegister";
import validateRegister from "./validateRegister";

export default function RegisterPage() {
  const [notice, setNotice] = useState();
  const axios = require("axios");
  const formRegister = useRef(null);

  let dateNow = new Date();

  const register = async () => {
    const data = new FormData(formRegister.current);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/register",
        data: {
          user_name: values.username,
          password: values.password,
          email: values.email,
        },
      });

      typeof response.data != "object" ? setNotice(response.data) : setNotice();
    } catch (error) {
      console.error(error);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useRegister(
    register,
    validateRegister,
    setNotice
  );

  return (
    <div className="user_page-wrapper">
      <div className="user_page-back">
        <ArrowBackIosIcon />
        <Link to="/">Quay về trang chủ</Link>
      </div>
      <div class="user_page">
        <div class="form">
          <form class="user-form" ref={formRegister}>
            <input
              name="username"
              type="text"
              placeholder="Tài khoản"
              onChange={(e) => handleChange(e)}
              value={values.username}
            />
            {errors.username ? <p className="err">{errors.username}</p> : ""}
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => handleChange(e)}
              value={values.password}
            />
            {errors.password ? <p className="err">{errors.password}</p> : ""}
            <input
              name="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              onChange={(e) => handleChange(e)}
              value={values.confirmPassword}
            />
            {errors.confirmPassword ? (
              <p className="err">{errors.confirmPassword}</p>
            ) : (
              ""
            )}
            <input
              name="email"
              type="text"
              placeholder="Địa chỉ Email"
              onChange={(e) => handleChange(e)}
              value={values.email}
            />
            {errors.email ? <p className="err">{errors.email}</p> : ""}
            {notice ? <p className="err">{notice}</p> : ""}
            <button onClick={(e) => handleSubmit(e)}>Tạo tài khoản</button>
            <p class="message">
              Đã có tài khoản?<Link to="/login">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
