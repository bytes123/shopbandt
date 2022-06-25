import React, { useState, useEffect } from "react";
import "./PassWordPage.scss";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function ResetPasswordPage() {
  const [values, setValues] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  let err = {};

  const { error, success } = Toast;

  const [{ loginedUser }, dispatch] = useStateValue();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errors, setErrors] = useState({});
  const axios = require("axios");

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

  const checkEmail = async (email) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/check-email",
        data: {
          email: email,
        },
      });
      if (!response.data) {
        err.email = "Email không tồn tại";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestResetPassword = async (email) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/request-reset",
        data: {
          email: email,
        },
      });
      if (response.data) {
        setIsDone(true);
        setLoading(false);
      } else {
        error("Lỗi");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    if (!values.email.trim()) {
      err.email = "Vui lòng nhập email";
    } else if (!validateEmail(values.email)) {
      err.email = "Vui lòng nhập email hợp lệ";
    } else {
      await checkEmail(values.email);
    }
    setErrors(err);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      requestResetPassword(values.email);
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
            <h2>Reset mật khẩu </h2>

            <form>
              <div className="email_reset">
                <label htmlFor="">Nhập email</label>
                <br />
                <input
                  type="text"
                  className={
                    errors.email
                      ? "email_reset-input error-input"
                      : "email_reset-input"
                  }
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? <p className="err">{errors.email}</p> : ""}
              </div>

              <div className="form_button">
                <button className="btn btn-danger" onClick={handleSubmit}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center display-5">
            Một đường link đổi mật khẩu đã được gửi tới mail bạn ! <br />
            Vui lòng check thư rác!
          </p>
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
