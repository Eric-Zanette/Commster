import UsersContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";

const RecentSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecentSales(5);
  }, []);

  const getRecentSales = async (num) => {
    setLoading(true);
    const recentSales = await fetch("/api/sales/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({ num: num }),
    });

    const recentJson = await recentSales.json();

    await setSales(Object.values(recentJson));
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
      <div className="recentSalesContainer">
        {sales.map((sale) => {
          return <img src={sale.img_url}></img>;
        })}
      </div>
    </>
  );
};

export default RecentSales;
