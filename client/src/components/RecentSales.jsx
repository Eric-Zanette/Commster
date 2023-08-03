import UsersContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";

const RecentSales = () => {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecentSales(5);
  }, []);

  const getRecentSales = async (num) => {
    setLoading(true);
    const recentSales = await fetch("/api/sales/recent", {
      method: "POST",
      header: {
        "Content-Type": "application-json",
      },
      body: { num: num },
    });
    await setSales({ ...recentSales });
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <h2>Recent Sales</h2>
      <div className="recentSalesContainer"></div>
    </>
  );
};

export default RecentSales;
