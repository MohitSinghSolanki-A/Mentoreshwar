const express = require("express");
const { submitContactForm, sendPurchaseConfirmation, sendOTP, verifyOTP } = require("../controllers/emailcontroller");

const router = express.Router();

// POST route for contact form submission
router.post("/email", submitContactForm);
router.post("/purchasemail", sendPurchaseConfirmation)
router.post("/sendotp", sendOTP)
router.post("/verifyotp", verifyOTP)

module.exports = router;
