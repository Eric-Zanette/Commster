import { useNavigate } from "react-router-dom";
import UsersContext from "../context/UserContext";
import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { user } = useContext(UsersContext);

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/sell");
  });

  return (
    <>
      <div className="container">
        <h1>Log Into Your Account</h1>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
