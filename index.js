/* Packages */
const express = require("express");
const userRoutes = require("./src/users/routes");
const saleRoutes = require("./src/sales/routes");
const cartRoutes = require("./src/cart_items/routes");
const cors = require("cors");
require("dotenv").config();

/* Set-up */
const app = express();
const port = 5000;

/* middleware */
app.use(express.json());
app.use(cors());

/* routes */
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/carts", cartRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
