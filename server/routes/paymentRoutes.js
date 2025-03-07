const express = require("express");
const { createOrder, verifyPayment, getOrdersByUser } = require("../controllers/paymentController");
const authenticateToken = require("../middleware/auth"); // Ensure user is logged in

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/orders/:userId", getOrdersByUser);

module.exports = router;
