const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/login", controller.login);

router.get("/", controller.getUsers);

router.get("/get/:id", controller.getUserById);

router.post("/token", controller.getUserByToken);

router.post("/", controller.addUser);

router.delete("/:id", controller.deleteUser);

module.exports = router;
