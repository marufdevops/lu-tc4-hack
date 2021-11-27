const express = require("express");
const authmiddlewares = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Product Routes
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createAProduct);

module.exports = router;
