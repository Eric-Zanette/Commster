import UsersContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesSlicer from "./SalesSlicer";

const RecentSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UsersContext);

  const navigate = useNavigate();

  useEffect(() => {
    getRecentSales(100);
  }, []);

  const getRecentSales = async (
    num,
    min_price = 0,
    max_price = 99999999,
    posted_on = "2000-08-22T15:40:10.186Z",
    min_quantity = 0,
    max_quantity = 999999,
    sorter = "posted_on"
  ) => {
    setLoading(true);
    const recentSales = await fetch("/api/sales/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        min_price,
        max_price,
        posted_on,
        min_quantity,
        max_quantity,
        sorter,
        num,
      }),
    });

    const recentJson = await recentSales.json();

    await setSales(Object.values(recentJson));
    setLoading(false);
  };

  console.log(getRecentSales);

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
      <div className="salesPage">
        <SalesSlicer getRecentSales={getRecentSales} />
        <div className="recentSalesContainer">
          {sales.map((sale) => {
            return (
              <div className="saleItemContainer">
                <p className="yourSaleHeader">
                  {sale.user_id == user.id ? "Your Listing" : null}
                </p>
                <div className="saleItem ">
                  <img
                    src={sale.img_url}
                    onClick={() => navigate(`/item/${sale.id}`)}
                    className={`${sale.user_id == user.id ? "yourSale" : null}`}
                  />
                  <p>{sale.product}</p>
                  <p>
                    ${(parseFloat(sale.price) || 0).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentSales;
