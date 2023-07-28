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
  const { product, price, description, img_url, quantity } = req.body;

  const { errors, isValid } = validation.register(
    product,
    price,
    description,
    img_url
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }
  pool.query(
    queries.createSale,
    [product, price, description, img_url, quantity],
    (error, results) => {
      if (error) throw error;
      return res.status(200).send("Sale Created Successfully!");
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

module.exports = {
  getSales,
  getSaleById,
  addSale,
  deleteSale,
};
