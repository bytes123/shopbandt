import React from "react";
import "./SuccessPayment.css";
import FireWork from "../FireWork";

function SuccessPayment({ billCode }) {
  return (
    <div className="card_checkout-wrapper pyro">
      <FireWork />
      <div className="card_checkout">
        <i className="checkmark">✓</i>
      </div>
      <h1>Thanh toán thành công</h1>
      <p>
        Cảm ơn bạn đã mua hàng
        <br /> Mã đơn hàng của bạn là #{billCode != "" ? billCode : ""}
      </p>
    </div>
  );
}

export default SuccessPayment;
