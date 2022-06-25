import React, { useRef, useEffect } from "react";
import { useStateValue } from "../StateProvider";

export default function PayPal({ insertBill, amount }) {
  const paypal = useRef();
  const [
    { loginedBasket, basket, profileCustomer, isLogined, loginedUser },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Test",
                amount: {
                  currency_code: "USD",
                  value: (amount / 22000).toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions, err) => {
          const order = await actions.order.capture();
          if (order && !isLogined) {
            const newBasket = basket.map((item) => {
              return {
                details_product_id: item.details_product_id,
                product_amount: item.amount,
              };
            });

            const data = {
              basket: JSON.stringify(newBasket),
              profile: profileCustomer,
            };

            data.profile = { ...data.profile, bill_ship: 1 };
            data.profile.bill_price = amount;
            insertBill(data);
          } else if (order && isLogined) {
            const newBasket = loginedBasket.map((item) => {
              return {
                details_product_id: item.details_product_id,
                product_amount: item.amount,
              };
            });

            const data = {
              basket: JSON.stringify(newBasket),
              profile: profileCustomer,
            };

            data.profile = { ...data.profile, bill_ship: 1 };
            data.profile.user_id = loginedUser.user_id;
            data.profile.bill_price = amount;
            // console.log(data);

            insertBill(data);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
