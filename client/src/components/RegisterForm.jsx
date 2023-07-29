import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersContext from "../context/UserContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { register_user } = useContext(UsersContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await register_user({ ...formData });
    res === true ? navigate("/sell") : setErrors({ ...res });
  };

  return (
    <>
      <form className="loginForm" onSubmit={(e) => onSubmit(e)}>
        <p>Username</p>
        <input
          type="text"
          className={`${errors.username && "invalid"}`}
          value={formData.username}
          name="username"
          onChange={(e) => onChange(e)}
        />
        <p
          className="invalidText"
          style={{ display: errors.username ? "block" : "none" }}
        >
          {errors.username}
        </p>

        <p>Email</p>
        <input
          type="text"
          className={`${errors.email && "invalid"}`}
          value={formData.email}
          name="email"
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
          className={`${errors.password && "invalid"}`}
          value={formData.password}
          name="password"
          onChange={(e) => onChange(e)}
        />
        <p
          className="invalidText"
          style={{ display: errors.password ? "block" : "none" }}
        >
          {errors.password}
        </p>

        <p>Repeat Password</p>
        <input
          type="password2"
          className={`${errors.password2 && "invalid"}`}
          value={formData.password2}
          name="password2"
          onChange={(e) => onChange(e)}
        />
        <p
          className="invalidText"
          style={{ display: errors.password2 ? "block" : "none" }}
        >
          {errors.password2}
        </p>

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

export default RegisterForm;
