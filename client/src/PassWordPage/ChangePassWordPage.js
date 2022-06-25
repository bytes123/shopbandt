import React, { useState, useEffect } from "react";
import "./PassWordPage.scss";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";

function ChangePassWordPage() {
  const [isDone, setIsDone] = useState(false);
  const [values, setValues] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  let err = {};

  const { error, success } = Toast;

  const [{ loginedUser }, dispatch] = useStateValue();

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const checkPassword = async (user_name, password) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/check-password",
        data: {
          user_name: user_name,
          user_password: password,
        },
      });
      if (!response.data) {
        err.old_password = "Mật khẩu cũ sai";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (user_name, password) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/change-password",
        data: {
          user_name: user_name,
          user_password: password,
        },
      });
      if (response.data) {
        success("thay đổi thành công");
        setIsDone(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.old_password.trim()) {
      err.old_password = "Vui lòng mật khẩu cũ";
    } else {
      await checkPassword(loginedUser.user_name, values.old_password);
    }

    if (!values.new_password.trim()) {
      err.new_password = "Vui lòng mật khẩu mới";
    } else if (values.new_password.trim().length < 6) {
      err.new_password = "Vui lòng mật khẩu mới từ 6 ký tự trở lên";
    } else if (values.new_password == values.old_password) {
      err.new_password = "Vui lòng mật khẩu mới khác mật khẩu cũ";
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
      changePassword(loginedUser.user_name, values.new_password);
    }
  }, [errors]);

  const handleChange = (event) => {
    newValues(event.target.name, event.target.value);
    clearErrors(event.target.name);
  };

  return (
    <div className="config_password">
      <div className="container">
        {isDone ? (
          <h2>Thay đổi mật khẩu thành công</h2>
        ) : (
          <>
            <h2>Đổi mật khẩu</h2>

            <form>
              <div className="old_password">
                <label htmlFor="">Nhập mật khẩu cũ</label>
                <br />
                <input
                  type="password"
                  className={
                    errors.old_password
                      ? "old_password-input error-input"
                      : "old_password-input"
                  }
                  name="old_password"
                  value={values.old_password}
                  onChange={handleChange}
                />
                {errors.old_password ? (
                  <p className="err">{errors.old_password}</p>
                ) : (
                  ""
                )}
              </div>

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
                  Thay đổi
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassWordPage;
