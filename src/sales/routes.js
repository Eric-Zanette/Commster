const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getSales);

router.get("/:id", controller.getSaleById);

router.post("/", controller.addSale);

router.delete("/:id", controller.deleteSale);

module.exports = router;
