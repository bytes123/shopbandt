import React, { useState, useRef } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useLogin from "./useLogin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";

export default function LoginPage() {
  const axios = require("axios");
  const formLogin = useRef(null);
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const [{ accessToken }, dispatch] = useStateValue();

  const { values, handleChange, handleSubmit, errors } = useLogin(login);

  const addAccessToken = (accessToken) => {
    dispatch({
      type: "ADD_ACCESS_TOKEN",
      payload: accessToken,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  async function login(values) {
    const data = new FormData(formLogin.current);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: {
          user_name: values.username,
          password: values.password,
        },
      });

      typeof response.data != "object" ? setErr(response.data) : setErr();
      const user = response.data.user;
      const accessToken = response.data.accessToken;

      if (user && accessToken) {
        Cookies.set("accessToken", accessToken);
        Cookies.set("user", JSON.stringify(user));
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user_page-wrapper">
      <div className="user_page-back">
        <ArrowBackIosIcon />
        <Link to="/">Quay về trang chủ</Link>
      </div>
      <div className="user_page">
        <div className="form">
          {/* <form class="register-form">
          <input type="text" placeholder="Tài khoản" />
          <input type="password" placeholder="Mật khẩu" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p class="message">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form> */}
          <form className="user-form" ref={formLogin}>
            <input
              name="username"
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Tài khoản"
              value={values.username}
            />
            <input
              name="password"
              onChange={(e) => handleChange(e)}
              type="password"
              placeholder="Mật khẩu"
              value={values.password}
            />
            {err ? <p className="err">{err}</p> : ""}
            <button onClick={(e) => handleSubmit(e)}>Đăng nhập</button>
            <p className="message">
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
              <Link to="/reset-password">Quên mật khẩu</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
