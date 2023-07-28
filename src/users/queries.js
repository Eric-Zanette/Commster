const createUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE ID = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const deleteUserById = "DELETE FROM users WHERE id = $1";

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
};
