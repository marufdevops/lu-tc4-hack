const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

//Auth routes
router.post("/signup", authController.signUser);
router.post("/login", authController.login);

module.exports = router;
