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
      cartTotal();
    };
    user && getCart();
  }, [user]);

  const cartTotal = () => {
    var subTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subTotal +=
        parseInt(cartItems[i].price) * parseInt(cartItems[i].quantity);
      console.log(cartItems[i].price);
    }
    setTotal(subTotal);
  };

  if (!user) {
    return (
      <div className="cartContainer">
        <h1>Loading...</h1>
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
        Cart Total = ${total}
      </div>
    </div>
  );
};

export default Cart;
