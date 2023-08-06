const pool = require("../../db");
const queries = require("./queries");
const validation = require("./validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Get a user by ID */
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    if (!results.rows.length) {
      return res.send("no user by that id");
    }
    return res.status(200).json(results.rows);
  });
};

/* Get all users */
const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

/* Add a user */
const addUser = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  const { errors, isValid } = validation.register(
    username,
    email,
    password,
    password2
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }

  checkEmail = await pool.query(queries.getUserByEmail, [email]);
  if (checkEmail.rows.length > 0) {
    errors.email = "Email already registered";
  }

  checkEmail = await pool.query(queries.getUserByEmail, [email]);
  if (checkEmail.rows.length > 0) {
    errors.username = "Username taken";
    return res.status(400).json(errors);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  await pool.query(queries.createUser, [username, email, hashedPass]);
  return res.status(200).json({ msg: "User Created!" });
};

/* deletes a user */
const deleteUser = (req, res) => {
  id = req.params.id;

  pool.query(queries.getUserById, [id], (error, results) => {
    if (!results.rows.length) {
      if (error) throw error;
      return res.send("No user by the id");
    }
    pool.query(queries.deleteUserById, [id], (error, results) => {
      if (error) throw error;
      return res.send("user successfully deleted");
    });
  });
};

/* Gets Token (login) */
const login = async (req, res) => {
  const { email, password } = req.body;

  const { isValid, errors } = validation.login(email, password);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  user = await pool.query(queries.getUserByEmail, [email]);

  console.log(user.rows);

  if (user.rows.length === 0) {
    return res.status(404).json({ email: "email is not registered" });
  }

  const username = user.rows[0].username;
  const id = user.rows[0].id;
  const hashedPass = user.rows[0].password;

  const comp = await bcrypt.compare(password, hashedPass);

  if (!comp) {
    return res.status(400).json({ password: "wrong password" });
  }

  const token = await jwt.sign({ username, id }, process.env.SECRET_KEY, {
    algorithm: "HS256",
  });

  return res.status(200).json({ token: token });
};

const getUserByToken = async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.decode(token);
    res.status(200).json({ username: decoded.username, id: decoded.id });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  login,
  getUserByToken,
};
