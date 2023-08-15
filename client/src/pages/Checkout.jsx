import React from "react";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <CheckoutForm />
      <div className="paymentOptions">
        <img src="/img/visa.png" alt="" />
        <img src="/img/card.png" alt="" />
        <img src="/img/paypal-logo.png" alt="" />
        <img src="/img/american-express.png" alt="" />
      </div>
    </div>
  );
};

export default Checkout;
