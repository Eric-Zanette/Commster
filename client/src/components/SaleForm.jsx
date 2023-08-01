import { useEffect, useContext, useState } from "react";

const SaleForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    product: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return (
    <form className="saleForm">
      <div className="saleFlex">
        <div className="saleImageContainer">
          <p>Picture</p>
          {formData.image ? (
            <img src={formData.image} className="salePreview" />
          ) : (
            <div className="imagePlaceholder"></div>
          )}

          <input
            type="file"
            name="image"
            onChange={(e) => onChange(e)}
            className="imageInput"
          />
        </div>
        <div className="saleDataContainer">
          <div className="inputLine">
            <p>Product</p>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={(e) => onChange(e)}
              className="textInput"
            />
          </div>
          <div className="inputLine">
            <p>Price ($)</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => onChange(e)}
              className="numberInput"
            />
          </div>
          <div className="inputLine">
            <p>Quantity</p>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => onChange(e)}
              className="numberInput"
            />
          </div>
        </div>
      </div>
      <div className="inputLine">
        <p>Item Description</p>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={(e) => onChange(e)}
          className="description"
        />
      </div>
      <button>List!</button>
    </form>
  );
};

export default SaleForm;
