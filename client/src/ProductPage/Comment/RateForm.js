import React from "react";

function RateForm({ values, errors, handleChange }) {
  return (
    <div className="rate_main-form w-100">
      <div className="rate_main-top">
        <input
          type="text"
          placeholder="Mời bạn chia sẽ một số cảm nhận về sản phẩm"
          className="w-100 bd-r-1 pb-5 bd-blur-1"
          name="description"
          defaultValue={values.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="rate_main-bottom my-3">
        <div className="rate_main-item">
          <input
            type="text"
            className={`${
              errors.fullname
                ? "rate_main-bottom-item bd-r-1 bd-blur-1 error-input"
                : "rate_main-bottom-item bd-r-1 bd-blur-1"
            }`}
            placeholder="Họ và tên (bắt buộc)"
            name="fullname"
            defaultValue={values.fullname}
            onChange={(e) => handleChange(e)}
          />
          {errors.fullname ? (
            <p className="error-text mt-1">{errors.fullname}</p>
          ) : (
            ""
          )}
        </div>
        <div className="rate_main-item mx-4">
          <input
            type="text"
            className={`${
              errors.phoneNumber
                ? "rate_main-bottom-item  bd-r-1 bd-blur-1 error-input"
                : "rate_main-bottom-item  bd-r-1 bd-blur-1"
            } `}
            placeholder="Số điện thoại (bắt buộc)"
            name="phoneNumber"
            defaultValue={values.phoneNumber}
            onChange={(e) => handleChange(e)}
          />
          {errors.phoneNumber ? (
            <p className="error-text mt-1">{errors.phoneNumber}</p>
          ) : (
            ""
          )}
        </div>
        <div className="rate_main-item">
          <input
            type="text"
            className="rate_main-bottom-item bd-r-1 bd-blur-1"
            placeholder="Email (không bắt buộc)"
            name="email"
            defaultValue={values.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default RateForm;
