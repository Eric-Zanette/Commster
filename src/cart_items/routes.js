const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getCartItems);

router.get("/user/:userId", controller.getCartById);

router.post("/:id", controller.addCartItem);

router.delete("/user/:userId/sale/:saleId", controller.deleteCartItem);

module.exports = router;
