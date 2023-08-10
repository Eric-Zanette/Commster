const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getCartItems);

router.get("/user/:user_id", controller.getCartById);

router.post("/:id", controller.addCartItem);

router.delete("/user/:user_id/sale/:sale_id", controller.deleteCartItem);

module.exports = router;
