const pool = require("../../db");
const queries = require("./queries");
const validation = require("./validation");
const jwt = require("jsonwebtoken");
const config = require("../../config");

/* Get a sale by ID */
const getSaleById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getSaleById, [id], (error, results) => {
    if (error) throw error;
    if (!results.rows.length) {
      return res.send("no sale by that id");
    }
    return res.status(200).json(results.rows);
  });
};

/* Get all sales */
const getSales = (req, res) => {
  pool.query(queries.getSales, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

/* Add a sale */
const addSale = async (req, res) => {
  console.log(req.body);

  const { product, price, description, image_url, quantity, user_id } =
    req.body;

  const token = await req.get("Authorization");
  decoded = await jwt.decode(token);

  if (decoded.id != user_id) {
    return res.status(400).json({ error: "not authenticated" });
  }

  const { errors, isValid } = validation.list(
    product,
    price,
    description,
    image_url,
    quantity
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const url = `http://127.0.0.1:${config.port}/` + req.file.filename;

  pool.query(
    queries.createSale,
    [product, price, description, url, quantity, user_id],
    (error, results) => {
      if (error) throw error;
      console.log("saled!");
      return res.status(200).json({ sale: "Created!" });
    }
  );
};

/* deletes a sale */
const deleteSale = (req, res) => {
  id = req.params.id;
  token = req.get("Authorization");
  console.log(id);

  pool.query(queries.getSaleById, [id], (error, results) => {
    if (!results.rows.length) {
      if (error) throw error;
      return res.send("No sale by the id");
    }
    pool.query(queries.deleteSaleById, [id], (error, results) => {
      if (error) throw error;
      return res.send("sale successfully deleted");
    });
  });
};

const getRecentSales = async (req, res) => {
  const { num } = req.body;

  const recentSales = await pool.query(queries.getRecentSales, [num]);

  res.status(200).json(recentSales.rows);
};

const getSalesByUserId = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const userSales = await pool.query(queries.getSaleByUserId, [id]);
    res.status(200).json(userSales.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getSales,
  getSaleById,
  addSale,
  deleteSale,
  getRecentSales,
  getSalesByUserId,
};
