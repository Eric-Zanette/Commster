import { Link } from "react-router-dom";
import UsersContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(UsersContext);
  const { cartSum } = useContext(CartContext);

  return (
    <nav>
      <div className="navContainer">
        <Link to="/">
          <div className="logoContainer">
            <h1>Commster</h1>
          </div>
        </Link>
        <ul className="navList">
          <li>
            <Link to="/market">Buy</Link>
          </li>

          <li>
            <Link to="/listings">Sell</Link>
          </li>

          <li className="navCart">
            <Link to="/cart">Cart</Link>
            {cartSum != 0 && <div className="cartSum">{cartSum}</div>}
          </li>

          <li>
            {user ? (
              <div className="logout" onClick={() => logout()}>
                <Link to="/login">Logout</Link>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
