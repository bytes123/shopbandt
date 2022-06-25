import React, { useState, useEffect, useRef } from "react";
import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import CheckoutForm from "./CheckoutForm";
import SuccessPayment from "./SuccessPayment";

import EmptyBasket from "./EmptyBasket";

function Checkout() {
  const [{ basket, loginedBasket, isLogined }, dispatch] = useStateValue();

  const [billCode, setBillCode] = useState("");

  const [isSuccessPayment, setIsSuccessPayment] = useState(false);

  useEffect(() => {
    console.log(isSuccessPayment);
  }, [isSuccessPayment]);
  return (
    <div className="checkout">
      {!isSuccessPayment ? (
        !isLogined && basket.length > 0 ? (
          <CheckoutForm
            basket={basket}
            setBillCode={setBillCode}
            setIsSuccessPayment={setIsSuccessPayment}
            isSuccessPayment={isSuccessPayment}
          />
        ) : isLogined && loginedBasket.length > 0 ? (
          <CheckoutForm
            basket={loginedBasket}
            setBillCode={setBillCode}
            setIsSuccessPayment={setIsSuccessPayment}
            isSuccessPayment={isSuccessPayment}
          />
        ) : (
          <EmptyBasket />
        )
      ) : (
        <SuccessPayment billCode={billCode} />
      )}
    </div>
  );
}

export default Checkout;
