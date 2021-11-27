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

router.patch(
  "/:id/update",
  productController.uploadProductPhoto,
  productController.updateProduct
);

router.route("/upvote/:id").put(productController.upvoteAProduct);
router.route("/downvote/:id").put(productController.downvoteAPost);

module.exports = router;
