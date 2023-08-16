import { useEffect, useState, createContext, useContext } from "react";
import UsersContext from "../context/UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState();
  const [cartSum, setCartSum] = useState();
  const { user } = useContext(UsersContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (cartItems) {
      quantitySum();
    }
  }, [cartItems]);

  useEffect(() => {
    user ? getCart() : setCartItems([]);
  }, [user]);

  const getCart = async () => {
    const res = await fetch(`/api/carts/user/${user.id}`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setCartItems(data);
    cartTotal(data);
  };

  const cartTotal = (items) => {
    var subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += parseInt(items[i].price) * parseInt(items[i].quantity);
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
          Authorization: token,
        },
      }
    );
    getCart();
  };

  const quantitySum = () => {
    let sum = 0;
    Object.keys(cartItems).forEach(
      (key) => (sum += parseInt(cartItems[key].quantity))
    );
    setCartSum(sum);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        getCart,
        cartTotal,
        deleteCartItem,
        quantitySum,
        cartSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
