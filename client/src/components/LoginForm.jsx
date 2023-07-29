import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form className="loginForm">
        <p>Email</p>
        <input
          type="text"
          value={formData.email}
          name="email"
          onChange={(e) => onChange(e)}
        />
        <p>Password</p>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={(e) => onChange(e)}
        />
        <div className="loginButtons">
          <button className="login">Login</button>
          <Link to="/register">
            <button className="login" type="button">
              Register
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
