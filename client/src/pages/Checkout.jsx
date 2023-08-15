import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import CartContext from "../context/CartContext";
import { useContext } from "react";

const Checkout = () => {
  const { total } = useContext(CartContext);

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
      <h2 className="payTotal">Total Payment: ${total}</h2>
    </div>
  );
};

export default Checkout;
