import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/buy">Buy</Link>
          </li>

          <li>
            <Link to="/sell">Sell</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
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
