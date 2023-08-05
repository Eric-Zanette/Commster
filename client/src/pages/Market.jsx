import RecentSales from "../components/RecentSales";
import UsersContext from "../context/UserContext";
import { useContext } from "react";

const Market = () => {
  const { user } = useContext(UsersContext);

  if (!user) {
    return (
      <div className="container">
        <h1>Login in to Browse Sales</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="marketContainer">
        <h1 className="marketHeader">Commster Marketplace</h1>
        <RecentSales />
      </div>
    </div>
  );
};

export default Market;
