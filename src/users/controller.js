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
const addUser = (req, res) => {
  const { username, email, password, password2 } = req.body;

  /* Input validation */
  const { errors, isValid } = validation.register(
    username,
    email,
    password,
    password2
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }
  /* Check if email is already registered */
  pool.query(queries.getUserByEmail, [email], async (error, results) => {
    if (results.rows.length > 0) {
      if (error) throw error;
      return res.status(400).json({ email: "Email already registered" });
    }

    /* Hash Password */

    const salt = await bcrypt.genSalt(10);
    console.log(password);
    const hashedPass = await bcrypt.hash(password, salt);
    console.log(hashedPass);
    /* Create the user */
    pool.query(
      queries.createUser,
      [username, email, hashedPass],
      (error, results) => {
        if (error) throw error;
        return res.status(200).send("User Created Successfully!");
      }
    );
  });
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
  const hashedPass = user.rows[0].password;

  const comp = await bcrypt.compare(password, hashedPass);
  console.log(comp);

  if (!comp) {
    return res.status(400).json({ password: "wrong password" });
  }

  const token = await jwt.sign({ username }, process.env.SECRET_KEY, {
    algorithm: "HS256",
  });

  return res.status(200).json({ token: token });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  login,
};
