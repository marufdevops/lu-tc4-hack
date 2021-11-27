const express = require("express");
const authController = require("../controllers/authController");
const sellerController = require("../controllers/sellerController");
const customerController = require("../controllers/customerController");
const authmiddlewares = require("../middlewares/authMiddleware");

const router = express.Router();

//Auth routes
router.post("/signup", authController.signUser);
router.post("/login", authController.login);
router.post("/loginPhone", authController.loginPhone);
//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Seller Routes
router.route("/sellers").get(sellerController.getAllSellers);
router.route("/sellers/:id").get(sellerController.getASeller);
router.patch("/sellers/updateProfileInfo", sellerController.updateProfileInfo);

//Customer Routes
router.route("/customers").get(customerController.getAllCustomer);
router.route("/customer").get(customerController.getACustomer);
router.patch(
  "/customers/updateProfileInfo",
  customerController.updateProfileInfo
);

module.exports = router;
