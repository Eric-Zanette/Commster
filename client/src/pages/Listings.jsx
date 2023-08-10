import { useState, useContext, useEffect } from "react";
import UsersContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`/api/sales/user/${user.id}`);
      const data = await res.json();
      console.log(data);
      setListings(data);
    };
    user && getListings();
  }, [user]);

  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="listingContainer">
        <h1>Your Listings</h1>
        <div className="listingsGrid">
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
