import { useState, useContext, useEffect } from "react";
import UsersContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UsersContext);

  const getListings = async () => {
    setLoading(true);
    const res = await fetch(`/api/sales/user/${user.id}`);
    const data = await res.json();
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    user && getListings();
  }, [user]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const deleteListing = async (e, listing) => {
    e.stopPropagation();

    const res = await fetch(`/api/sales/${listing.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    getListings();
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <h1>Login to See Your Listing</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="listingContainer">
        <h1>Your Listings</h1>
        <div
          className="listingsGrid"
          style={Object.keys(listings).length == 0 ? { display: "none" } : {}}
        >
          {listings.map((listing) => {
            return (
              <div
                className="listing"
                onClick={() => navigate(`/item/${listing.id}`)}
              >
                <img src={listing.img_url} alt="" />
                <div className="listingInfo">
                  {" "}
                  <p>{listing.product}</p>
                  <p>
                    ${(parseFloat(listing.price) || 0).toLocaleString("en-US")}
                  </p>
                  <p>{listing.posted_on.split("T")[0]}</p>
                </div>
                <FaTimes
                  className="cartDelete"
                  onClick={(e) => deleteListing(e, listing)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate("/sell")}>
          <p>Create a New Listing</p>
        </button>
      </div>
    </div>
  );
};

export default Listings;
