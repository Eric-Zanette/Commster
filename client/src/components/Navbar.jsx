import { Link } from "react-router-dom";
import UsersContext from "../context/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(UsersContext);

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
            <Link to="/sell">Sell</Link>
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

          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
