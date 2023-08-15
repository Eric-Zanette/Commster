import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../context/UserContext";

const Item = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [quantity, setQuantity] = useState();
  const [flash, setFlash] = useState(false);
  const token = localStorage.getItem("token");

  const { user } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSale = async () => {
      const response = await fetch(`/api/sales/${id}`);
      const data = await response.json();
      setSale(...data);
      console.log(sale);
    };

    fetchSale();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const salePing = await fetch(`/api/carts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({ token: token, quantity: quantity }),
    });

    if (salePing.status === 200) {
      setFlash(true);
      const timer = setTimeout(() => {
        navigate("/market");
      }, 1000);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  if (!sale) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (flash) {
    return (
      <div className="container">
        <h1>Purchase Successful</h1>
      </div>
    );
  }

  return (
    <div className="itemContainer">
      <h1>{sale.product}</h1>
      <img src={sale.img_url} alt={sale.product} className="itemImage" />
      <div className="itemFlex">
        <p>Listed on: {sale.posted_on.split("T")[0]}</p>
        <p>{sale.quantity} left in stock</p>
      </div>
      <p className="itemDescription">{sale.description}</p>
      <form className="itemForm" onSubmit={(e) => onSubmit(e)}>
        <div className="itemFlex">
          <div className="quantity">
            {user.id != sale.user_id ? (
              <>
                <h2>
                  ${(parseFloat(sale.price) || 0).toLocaleString("en-US")} x{" "}
                </h2>
                <input
                  type="number"
                  className="quantityInput"
                  value={quantity}
                  onChange={(e) => onChange(e)}
                />
              </>
            ) : (
              <h2>${(parseFloat(sale.price) || 0).toLocaleString("en-US")}</h2>
            )}
          </div>
          {user.id != sale.user_id ? (
            <button>BUY!</button>
          ) : (
            <h2>Your Listing</h2>
          )}
        </div>
      </form>
    </div>
  );
};

export default Item;
