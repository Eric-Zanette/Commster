import { useState } from "react";

const SalesSlicer = ({ getRecentSales }) => {
  const [formData, setFormData] = useState({
    num: 100,
    min_price: undefined,
    max_price: undefined,
    posted_on: "2000-08-22T15:40:10.186Z",
    min_quantity: undefined,
    max_quantity: undefined,
    sorter: "posted_on",
  });

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      num,
      min_price,
      max_price,
      posted_on,
      min_quantity,
      max_quantity,
      sorter,
    } = formData;
    getRecentSales(
      num,
      min_price,
      max_price,
      posted_on,
      min_quantity,
      max_quantity,
      sorter
    );
  };

  console.log(getRecentSales);

  return (
    <form className="salesSlicer" onSubmit={onSubmit}>
      <div className="sortBy">
        <p>Sort by</p>
        <select
          id="cars"
          name="sorter"
          value={formData.sorter}
          onChange={(e) => {
            onChange(e);
          }}
        >
          <option value="volvo">Posted Date</option>
          <option value="saab">Price</option>
          <option value="opel">Quantity</option>
        </select>
      </div>
      <div className="priceRange">
        <p>Price Range</p>
        <input
          type="number"
          name="min_price"
          value={formData.min_price}
          onChange={(e) => {
            onChange(e);
          }}
        />
        -
        <input
          type="number"
          name="max_price"
          value={formData.max_price}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <div className="minQuantity">
        <p>Minimum Quantity</p>
        <input
          type="number"
          name="min_quantity"
          value={formData.min_quantity}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <button type="submit">Apply</button>
    </form>
  );
};

export default SalesSlicer;
