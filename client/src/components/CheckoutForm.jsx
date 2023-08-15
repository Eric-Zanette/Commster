import React from "react";

const CheckoutForm = () => {
  return (
    <div className="checkout">
      <h2 className="checkoutFormHeader">Insert Payment Details</h2>
      <form className="paymentForm">
        <p>Credit Card Number</p>
        <input type="text" />
        <div className="flexH">
          <div>
            {" "}
            <p>Exp</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>ccv</p>
            <input type="text" />
          </div>
        </div>
        <p>Name on Card</p>
        <input type="text" />
        <button className="pay">Pay</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
