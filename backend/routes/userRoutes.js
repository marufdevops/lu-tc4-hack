const express = require("express");
const authController = require("../controllers/authController");
const sellerController = require("../controllers/sellerController");

const router = express.Router();

//Auth routes
router.post("/signup", authController.signUser);
router.post("/login", authController.login);

router.route("/sellers").get(sellerController.getAllSellers);
module.exports = router;
