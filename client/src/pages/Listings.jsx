import { useState, useContext, useEffect } from "react";
import UsersContext from "../context/UserContext";

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

  if (!user) {
    return (
      <div className="container">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Listings</h1>
      <div className="listingsGrid">
        {listings.map((listing) => {
          return (
            <div className="listing">
              <img src={listing.img_url} alt="" />
              <div className="listingInfo">
                {" "}
                <p>{listing.product}</p>
                <p>${listing.price}</p>
                <p>{listing.posted_on.split("T")[0]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
