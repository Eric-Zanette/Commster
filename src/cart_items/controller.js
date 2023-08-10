const pool = require("../../db");
const queries = require("./queries");
const jwt = require("jsonwebtoken");

/* Get cart items by user ID */
const getCartItemsById = (req, res) => {
  const { buyer_id } = req.body;

  pool.query(queries.getCartItemById, [buyer_id], (error, results) => {
    if (error) throw error;
    if (!results.rows.length) {
      return res.send("no item by that id");
    }
    return res.status(200).json(results.rows);
  });
};

/* Get all cart items */
const getCartItems = (req, res) => {
  pool.query(queries.getCartItems, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

/* Add a cart item */
const addCartItem = async (req, res) => {
  const sale_id = req.params.id;
  const { token, quantity } = req.body;

  buyer = jwt.decode(token);
  buyer_id = buyer.id;

  pool.query(
    queries.createCartItem,
    [buyer_id, sale_id, quantity],
    (error, results) => {
      if (error) throw error;
      return res.status(200).send("Cart Item Added Successfully!");
    }
  );
};

/* deletes a cart item */
const deleteCartItem = (req, res) => {
  const buyer_id = req.params.user_id;
  const sale_id = req.params.sale_id;

  pool.query(queries.getCartItemById, [buyer_id, sale_id], (error, results) => {
    if (!results.rows.length) {
      if (error) throw error;
      return res.send("No item by the id");
    }
    pool.query(
      queries.deleteCartItemById,
      [buyer_id, sale_id],
      (error, results) => {
        if (error) throw error;
        return res.send("cart item successfully deleted");
      }
    );
  });
};

const getCartById = (req, res) => {
  const { user_id } = req.params;

  pool.query(queries.getCartById, [user_id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  getCartItems,
  getCartItemsById,
  addCartItem,
  deleteCartItem,
  getCartById,
};
