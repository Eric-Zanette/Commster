const pool = require("../../db");
const queries = require("./queries");
const validation = require("./validation");

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

  const { errors, isValid } = validation.register(
    username,
    email,
    password,
    password2
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }

  pool.query(queries.getUserByEmail, [email], (error, results) => {
    if (results.rows.length > 0) {
      if (error) throw error;
      return res.status(400).json({ email: "Email already registered" });
    }
    pool.query(
      queries.createUser,
      [username, email, password],
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

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
};
