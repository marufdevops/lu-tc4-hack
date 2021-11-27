const express = require("express");
const authController = require("../controllers/authController");
const sellerController = require("../controllers/sellerController");
const customerController = require("../controllers/customerController");

const router = express.Router();

//Auth routes
router.post("/signup", authController.signUser);
router.post("/login", authController.login);

router.route("/sellers").get(sellerController.getAllSellers);
//All routes after this middleware are protected

router.patch(
  "/updateProfileInfo/consumer",
  customerController.updateProfileInfo
);

module.exports = router;
