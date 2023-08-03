const pool = require("../../db");
const queries = require("./queries");
const validation = require("./validation");

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
const addSale = (req, res) => {
  const { product, price, description, image_url, quantity } = req.body;

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

  const url = "/saleImages/" + req.file.filename;

  pool.query(
    queries.createSale,
    [product, price, description, url, quantity],
    (error, results) => {
      if (error) throw error;
      console.log("saled!");
      return res.status(200);
    }
  );
};

/* deletes a sale */
const deleteSale = (req, res) => {
  id = req.params.id;

  pool.query(queries.getSaleById, [id], (error, results) => {
    if (!results.rows.length) {
      if (error) throw error;
      return res.send("No sale by the id");
    }
    pool.query(queries.deletesaleById, [id], (error, results) => {
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

module.exports = {
  getSales,
  getSaleById,
  addSale,
  deleteSale,
  getRecentSales,
};
