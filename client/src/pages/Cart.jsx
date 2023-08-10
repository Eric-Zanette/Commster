import { useEffect, useState, useContext } from "react";
import UsersContext from "../context/UserContext";
import { FaTimes } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState();
  const { user } = useContext(UsersContext);

  useEffect(() => {
    user && getCart();
  }, [user]);

  const getCart = async () => {
    const res = await fetch(`/api/carts/user/${user.id}`);
    const data = await res.json();
    setCartItems(data);
    cartTotal(data);
  };

  const cartTotal = (items) => {
    var subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += parseInt(items[i].price) * parseInt(items[i].quantity);
      console.log(items[i].price);
    }
    setTotal(subTotal);
  };

  const deleteCartItem = async (cartItem) => {
    console.log(cartItem);
    const res = await fetch(
      `/api/carts/user/${user.id}/sale/${cartItem.sale_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getCart();
  };

  if (!user) {
    return (
      <div className="cartContainer">
        <h1>Login to See Cart</h1>
      </div>
    );
  }

  if (!cartItems) {
    return (
      <div className="cartContainer">
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
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
