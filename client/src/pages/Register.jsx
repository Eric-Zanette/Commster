import RegisterForm from "../components/RegisterForm";
import UsersContext from "../context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useContext(UsersContext);

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/sell");
  });

  return (
    <>
      <div className="container">
        <h1>Register for a Commster Account</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
