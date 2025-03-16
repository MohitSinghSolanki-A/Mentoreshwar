const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");
const crypto = require("crypto");
require("dotenv").config();

// ✅ Initialize Razorpay

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("❌ Missing Razorpay API keys in environment variables");
}


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.createOrder = async (req, res) => {
    try {
        const { productIds, userId, amount } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ success: false, message: "No products selected" });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }



        const razorpayOrder = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "order_receipt_" + new Date().getTime(),
            notes: { userId, productIds: JSON.stringify(productIds) },
        });

        res.json({
            success: true,
            message: "Order created successfully",
            orderId: razorpayOrder.id,
            amount: amount,
            currency: "INR",
        });
    } catch (error) {
        console.error("❌ Order creation error:", error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
};



exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, productIds, subjects, amount } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !productIds || !subjects || !amount) {
            return res.status(400).json({ success: false, message: "Missing payment details" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(403).json({ success: false, message: "Invalid payment signature" });
        }

        console.log(amount)
        if (amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }


        const newOrder = new Order({
            userId,
            productIds,
            subjects,
            amount: amount,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "paid",
        });

        await newOrder.save();

        res.json({
            success: true,
            message: "Payment verified & order saved",
            subjects,
            verified: true
        });
    } catch (error) {
        console.error("❌ Payment verification error:", error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};



exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        orders = orders.map(order => ({
            ...order.toObject(),
            amount: order.amount / 100,
        }));


        res.json({ success: true, orders });
    } catch (error) {
        console.error("❌ Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};



