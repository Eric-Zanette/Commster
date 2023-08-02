import SaleForm from "../components/SaleForm";
import UsersContext from "../context/UserContext";
import { useContext } from "react";

const Post = () => {
  const { user } = useContext(UsersContext);

  if (!user) {
    return (
      <div className="container">
        <h1>Login in to List an Item!</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Post an Item for Sale</h1>
      <SaleForm />
    </div>
  );
};

export default Post;
