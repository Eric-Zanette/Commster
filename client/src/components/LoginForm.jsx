import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersContext from "../context/UserContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login_user } = useContext(UsersContext);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login_user({ ...formData });
    res === true ? navigate("/listings") : setErrors({ ...res });
  };

  return (
    <>
      <form className="loginForm" onSubmit={(e) => onSubmit(e)}>
        <p>Email</p>
        <input
          type="text"
          value={formData.email}
          name="email"
          className={`${errors.email && "invalid"}`}
          onChange={(e) => onChange(e)}
        />
        <p
          className="invalidText"
          style={{ display: errors.email ? "block" : "none" }}
        >
          {errors.email}
        </p>
        <p>Password</p>
        <input
          type="password"
          value={formData.password}
          name="password"
          className={`${errors.password && "invalid"}`}
          onChange={(e) => onChange(e)}
        />
        <p
          className="invalidText"
          style={{ display: errors.password ? "block" : "none" }}
        >
          {errors.password}
        </p>
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
