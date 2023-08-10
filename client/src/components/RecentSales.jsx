import UsersContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UsersContext);

  const navigate = useNavigate();

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
          return (
            <div className="saleItemContainer">
              <p className="yourSaleHeader">
                {sale.user_id == user.id ? "Your Listing" : null}
              </p>
              <div
                className={`saleItem ${
                  sale.user_id == user.id ? "yourSale" : null
                }`}
              >
                <img
                  src={sale.img_url}
                  onClick={() => navigate(`/item/${sale.id}`)}
                />
                <p>{sale.product}</p>
                <p>${(parseFloat(sale.price) || 0).toLocaleString("en-US")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentSales;
