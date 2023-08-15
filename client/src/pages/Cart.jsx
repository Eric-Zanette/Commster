import { useEffect, useState, useContext } from "react";
import UsersContext from "../context/UserContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { user } = useContext(UsersContext);
  const { cartItems, total, getCart, deleteCartItem } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    user && getCart();
  }, [user]);

  if (!user) {
    return (
      <div className="cartContainer">
        <h1>Login to See Cart</h1>
      </div>
    );
  }

  if (Object.keys(cartItems).length == 0) {
    return (
      <div className="container">
        <h1>No Items in Cart</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cartContainer">
        <h1>{user.username}'s Cart</h1>
        <div className="cartList">
          <div className="cartHeader">
            <p className="cartItem">Product</p>
            <p className="cartItem">Price</p>
            <p className="cartItem">Quantity</p>
            <p className="cartItem">Total</p>
          </div>
          {cartItems.map((item) => {
            return (
              <div className="itemListLine">
                <p className="cartItem">{item.product}</p>{" "}
                <p className="cartItem">
                  ${(parseFloat(item.price) || 0).toLocaleString("en-US")}
                </p>
                <p className="cartItem">{item.quantity}</p>
                <p className="cartItem">
                  ${(item.price * item.quantity).toLocaleString("en-US")}
                </p>
                <FaTimes
                  className="cartDelete"
                  onClick={() => deleteCartItem(item)}
                />
              </div>
            );
          })}
        </div>
        <h2>Cart Total = ${total.toLocaleString("en-US")}</h2>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
