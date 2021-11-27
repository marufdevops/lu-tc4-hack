const express = require("express");
const authmiddlewares = require("../middlewares/authMiddleware");
const approvalController = require("../controllers/approvalController");
const emailController = require("../controllers/emailController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Seller approval routes
router.route("/sellers").get(approvalController.pendingSellerApprovals);
//router.route("/sellers/:id").get(approvalController.approveASeller);

//Customer approval routes
router.route("/customers").get(approvalController.pendingCustomerApprovals);

router.route("/email").post(emailController.sendEmail);

module.exports = router;
