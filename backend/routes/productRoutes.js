const express = require("express");
const authmiddlewares = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");
const customerController = require("../controllers/customerController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Product Routes
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createAProduct);

router
  .route("/:id")
  .get(productController.getAProduct)
  .post(customerController.bidAProduct);

module.exports = router;
