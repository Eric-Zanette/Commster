const { Router } = require("express");
const controller = require("./controller");

/* Multer set-up */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/saleImages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", controller.getSales);

router.get("/:id", controller.getSaleById);

router.post("/", upload.single("image"), controller.addSale);

router.post("/recent", upload.single("image"), controller.getRecentSales);

router.delete("/:id", controller.deleteSale);

module.exports = router;
