const isEmpty = require("./../isEmpty");
const Validator = require("validator");

const register = (username, email, password, password2) => {
  errors = {};

  username = isEmpty(username) ? "" : username;
  email = isEmpty(email) ? "" : email;
  password = isEmpty(password) ? "" : password;
  password2 = isEmpty(password2) ? "" : password2;

  if (!Validator.isLength(username.toString(), { min: 2, max: 15 })) {
    errors.username = "Username must be between 2 and 15 characters";
  }

  if (Validator.isEmpty(username)) {
    errors.username = "Must enter a username";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Not a valid Email!";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Must enter a email";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Must enter a password";
  }

  if (password != password2) {
    errors.password2 = "passwords must match!";
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = "Must repeat password";
  }

  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? false : true,
  };
};

module.exports = {
  register,
};
