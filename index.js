/* Packages */
const express = require("express");
const userRoutes = require("./src/users/routes");
const saleRoutes = require("./src/sales/routes");
const cartRoutes = require("./src/cart_items/routes");
const cors = require("cors");
const config = require("./config");
require("dotenv").config();

/* Set-up */

const app = express();
const port = config.port;

/* middleware */
app.use(express.json());
app.use(cors());

/* routes */
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/carts", cartRoutes);

app.use(express.static(__dirname + "/public/saleImages"));
console.log(__dirname + "/public/saleImages");

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(port, "0.0.0.0", () => console.log(`app listening on port ${port}`));
