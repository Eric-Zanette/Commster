const isEmpty = require("./../isEmpty");
const Validator = require("validator");

const register = (product, price, description, img_url) => {
  errors = {};

  product = isEmpty(product) ? "" : product;
  price = isEmpty(price) ? "" : price;
  description = isEmpty(description) ? "" : description;
  img_url = isEmpty(img_url) ? "" : img_url;

  if (!Validator.isLength(product.toString(), { min: 2, max: 15 })) {
    errors.product = "Product name must be between 2 and 15 characters";
  }

  if (Validator.isEmpty(product)) {
    errors.product = "Must enter a product name";
  }

  if (Validator.isEmpty(price)) {
    errors.price = "Must enter a price";
  }

  if (Validator.isEmpty(description)) {
    errors.description = "Must enter a description";
  }

  if (Validator.isEmpty(img_url)) {
    errors.img_url = "Must attach an image";
  }

  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? false : true,
  };
};

module.exports = {
  register,
};
