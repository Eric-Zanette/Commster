import { Link } from "react-router-dom";
import UsersContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useContext, useState, useRef, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(UsersContext);
  const { cartSum } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const onClick = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const outsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  });

  return (
    <nav>
      <div className="navContainer">
        <Link to="/">
          <div className="logoContainer">
            <h1>Commster</h1>
          </div>
        </Link>
        {showMenu ? (
          <ul className="hamLinks" ref={menuRef}>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/projects">
              <li>Projects</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        ) : (
          <div
            className="hamburger"
            onClick={() => setShowMenu(!showMenu)}
            onClickCapture={(e) => onClick(e)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        )}
        <ul className="navList">
          <li>
            <Link to="/">Buy</Link>
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
