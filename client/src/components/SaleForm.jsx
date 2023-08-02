import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SaleForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    product: "",
    price: 0,
    description: "",
    quantity: 0,
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
        image_url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const fData = new FormData();

    // Append the files and fields to the FormData instance
    fData.append("image", formData.image);
    fData.append("product", formData.product);
    fData.append("price", formData.price);
    fData.append("description", formData.description);
    fData.append("quantity", formData.quantity);
    fData.append("image_url", formData.image_url);

    const response = await fetch("api/sales", {
      method: "POST",
      body: fData,
    });

    console.log(fData);

    const data = await response.json();
    if (response.status === 200) {
      return navigate("/market");
    }
    setErrors({ ...data });
  };

  return (
    <form className="saleForm" onSubmit={(e) => onSubmit(e)}>
      <div className="saleFlex">
        <div className="saleImageContainer">
          <p>Picture</p>
          {formData.image ? (
            <img src={formData.image_url} className={`salePreview`} />
          ) : (
            <div
              className={`imagePlaceholder ${errors.img_url ? "invalid" : ""}`}
            ></div>
          )}
          <input
            type="file"
            name="image"
            onChange={(e) => onChange(e)}
            className="imageInput"
          />
          <p
            className="invalidText"
            style={{ display: errors.img_url ? "block" : "none" }}
          >
            {errors.img_url}
          </p>
        </div>
        <div className="saleDataContainer">
          <div className="inputLine">
            <p>Product</p>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={(e) => onChange(e)}
              className={`textInput ${errors.product ? "invalid" : ""}`}
            />
            <p
              className="invalidText"
              style={{ display: errors.product ? "block" : "none" }}
            >
              {errors.product}
            </p>
          </div>

          <div className="inputLine">
            <p>Price ($)</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => onChange(e)}
              className={`numberInput ${errors.price ? "invalid" : ""}`}
            />
            <p
              className="invalidText"
              style={{ display: errors.price ? "block" : "none" }}
            >
              {errors.price}
            </p>
          </div>
          <div className="inputLine">
            <p>Quantity</p>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => onChange(e)}
              className={`numberInput ${errors.quantity ? "invalid" : ""}`}
            />
            <p
              className="invalidText"
              style={{ display: errors.quantity ? "block" : "none" }}
            >
              {errors.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="inputLine">
        <p>Item Description</p>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={(e) => onChange(e)}
          className={`description ${errors.description ? "invalid" : ""}`}
        />
        <p
          className="invalidText"
          style={{ display: errors.description ? "block" : "none" }}
        >
          {errors.description}
        </p>
      </div>
      <button>List!</button>
    </form>
  );
};

export default SaleForm;
