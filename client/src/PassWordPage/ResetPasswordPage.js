import React, { useState, useEffect } from "react";
import "./PassWordPage.scss";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import NoMatch from "../NoMatch";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ResetPasswordPage() {
  const [values, setValues] = useState({
    email: "",
    new_password: "",
    new_password_confirm: "",
  });
  let err = {};

  const { error, success } = Toast;
  let params = useParams();

  const [{ loginedUser }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState();
  const axios = require("axios");
  let navigate = useNavigate();

  const clearErrors = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const newValues = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getMail = async (token) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-reset-mail",
        data: {
          token: token,
        },
      });
      if (response.data) {
        setEmail(response.data[0].email);
      } else {
        return navigate("/404");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/change-password-mail",
        data: {
          email: email,
          password: password,
        },
      });
      if (response.data) {
        setLoading(false);
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMail(params.token);
  }, [params.token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.new_password.trim()) {
      err.new_password = "Vui lòng nhập mật khẩu mới";
    } else if (values.new_password.trim().length < 6) {
      err.new_password = "Vui lòng nhập mật khẩu mới từ 6 ký tự trở lên";
    }

    if (!values.new_password_confirm.trim()) {
      err.new_password_confirm = "Vui lòng xác nhận mật khẩu mới";
    } else if (values.new_password_confirm != values.new_password) {
      err.new_password_confirm = "Xác nhận mật khẩu mới không khớp";
    }
    setErrors(err);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsDone(true);
      changePassword(email, values.new_password);
    }
  }, [errors]);

  const handleChange = (event) => {
    newValues(event.target.name, event.target.value);
    clearErrors(event.target.name);
  };

  return (
    <div className="config_password">
      <div className="container">
        {!isDone ? (
          <div className="container">
            <h2>Reset mật khẩu</h2>

            <form>
              <div className="new_password">
                <label htmlFor="">Nhập mật khẩu mới</label>
                <br />
                <input
                  type="password"
                  className={
                    errors.new_password
                      ? "new_password-input error-input"
                      : "new_password-input"
                  }
                  name="new_password"
                  value={values.new_password}
                  onChange={handleChange}
                />
                {errors.new_password ? (
                  <p className="err">{errors.new_password}</p>
                ) : (
                  ""
                )}
                <br />
                <label htmlFor="">Xác nhận mật khẩu mới</label>
                <br />
                <input
                  type="password"
                  className={
                    errors.new_password_confirm
                      ? "new_password-confirm-input error-input"
                      : "new_password-confirm-input"
                  }
                  name="new_password_confirm"
                  value={values.new_password_confirm}
                  onChange={handleChange}
                />
                {errors.new_password_confirm ? (
                  <p className="err">{errors.new_password_confirm}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form_button">
                <button className="btn btn-danger" onClick={handleSubmit}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center display-5">Cập nhật mật khẩu thành công!</p>
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

export default ResetPasswordPage;
