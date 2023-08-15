import { useEffect, useState, createContext, useContext } from "react";
import UsersContext from "../context/UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
  return (
    <CartContext.Provider
      value={{ cartItems, total, getCart, cartTotal, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
