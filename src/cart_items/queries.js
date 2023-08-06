const createCartItem =
  "INSERT INTO carts (buyer_id, sale_id, quantity) VALUES ($1, $2, $3)";
const getCartItems = "SELECT * FROM carts";
const getCartItemById =
  "SELECT * FROM carts WHERE buyer_id = $1 AND sale_id = $2";

const deleteCartItemById =
  "DELETE FROM carts WHERE buyer_id = $1 AND sale_id = $2";

const getCartById =
  "SELECT sales.product, sales.price, carts.quantity \
                    FROM sales \
                    JOIN carts ON sales.id = carts.sale_id\
                    WHERE carts.buyer_id = $1";

module.exports = {
  createCartItem,
  getCartItems,
  getCartItemById,
  deleteCartItemById,
  getCartById,
};
