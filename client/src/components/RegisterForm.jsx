import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
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
        <p>Username</p>
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={(e) => onChange(e)}
        />
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
        <p>Repeat Password</p>
        <input
          type="password2"
          value={formData.password2}
          name="password2"
          onChange={(e) => onChange(e)}
        />

        <div className="loginButtons">
          <button className="login">Register</button>
          <Link to="/register">
            <button className="login" type="button">
              Login
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
