const isEmpty = require("./../isEmpty");
const Validator = require("validator");

const list = (product, price, description, img_url, quantity) => {
  errors = {};

  product = isEmpty(product) ? "" : product;
  price = isEmpty(price) ? "" : price;
  price = price == 0 ? "" : price;
  description = isEmpty(description) ? "" : description;
  img_url = isEmpty(img_url) ? "" : img_url;
  quantity = isEmpty(quantity) ? "" : quantity;
  quantity = quantity == 0 ? "" : quantity;

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

  if (Validator.isEmpty(quantity)) {
    errors.quantity = "Must enter a quantity";
  }

  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? false : true,
  };
};

module.exports = {
  list,
};
