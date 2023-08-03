const createSale =
  "INSERT INTO sales (product, price, description, img_url, quantity) VALUES ($1, $2, $3, $4, $5)";
const getSales = "SELECT * FROM sales";
const getSaleById = "SELECT * FROM sales WHERE ID = $1";

const deleteSaleById = "DELETE FROM sales WHERE id = $1";

const getRecentSales = "SELECT * FROM sales ORDER BY posted_on DESC LIMIT $1";

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSaleById,
  getRecentSales,
};
