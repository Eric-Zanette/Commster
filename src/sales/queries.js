const createSale =
  "INSERT INTO sales (product, price, description, img_url, quantity, user_id) VALUES ($1, $2, $3, $4, $5, $6)";
const getSales = "SELECT * FROM sales";
const getSaleById = "SELECT * FROM sales WHERE ID = $1";

const deleteSaleById = "DELETE FROM sales WHERE id = $1";

const getRecentSales =
  "SELECT * FROM sales WHERE price BETWEEN $1 and $2 AND posted_on > $3 AND quantity BETWEEN $4 and $5 ORDER BY $6 DESC LIMIT $7";

const getSaleByUserId = "SELECT * FROM sales WHERE user_id = $1";

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSaleById,
  getRecentSales,
  getSaleByUserId,
};
