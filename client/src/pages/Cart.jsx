import { useEffect, useState, useContext } from "react";
import UsersContext from "../context/UserContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const getCart = async () => {
      const res = await fetch(`/api/carts/user/${user.id}`);
      const data = await res.json();
      setCartItems(data);
      cartTotal(data);
    };
    user && getCart();
  }, [user]);

  const cartTotal = (items) => {
    var subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += parseInt(items[i].price) * parseInt(items[i].quantity);
      console.log(items[i].price);
    }
    setTotal(subTotal);
  };

  if (!user) {
    return (
      <div className="cartContainer">
        <h1>Login to See Cart</h1>
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
                <p className="cartItem">${item.price}</p>
                <p className="cartItem">{item.quantity}</p>
                <p className="cartItem">${item.price * item.quantity}</p>
              </div>
            );
          })}
        </div>
        <h2>Cart Total = ${total}</h2>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
