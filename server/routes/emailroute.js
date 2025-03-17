const express = require("express");
const { submitContactForm, sendPurchaseConfirmation, sendOTP, verifyOTP, SubscribeNewsletter } = require("../controllers/emailcontroller");

const router = express.Router();

// POST route for contact form submission
router.post("/email", submitContactForm);
router.post("/purchasemail", sendPurchaseConfirmation)
router.post("/sendotp", sendOTP)
router.post("/verifyotp", verifyOTP)
router.post("/subscribe", SubscribeNewsletter)

module.exports = router;
