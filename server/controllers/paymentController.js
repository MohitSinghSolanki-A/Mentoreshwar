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

// ✅ Create an Order
exports.createOrder = async (req, res) => {
    try {
        const { productIds, userId, subjects } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ success: false, message: "No products selected" });
        }

        //adding subjects prices
        let totalAmount = 0;
        for (let i = 0; i < subjects.length; i++) {
            totalAmount += subjects[i].price;
        }


        // 🔹 Create Razorpay order (DO NOT save in DB)
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: "order_receipt_" + new Date().getTime(),
            notes: { userId, productIds: JSON.stringify(productIds) },
        });

        res.json({
            success: true,
            message: "Order created successfully",
            orderId: razorpayOrder.id,
            amount: totalAmount * 100,
            currency: "INR",
        });
    } catch (error) {
        console.error("❌ Order creation error:", error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
};


// ✅ Verify Payment & Store Data in DB
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, productIds, subjects } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !productIds || !subjects) {
            return res.status(400).json({ success: false, message: "Missing payment details" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(403).json({ success: false, message: "Invalid payment signature" });
        }

        let totalAmount = 0;
        for (let i = 0; i < subjects.length; i++) {
            totalAmount += subjects[i].price;
        }
        console.log(totalAmount);

        console.log("subjecs", req.body.subjects);

        const newOrder = new Order({
            userId,
            productIds,
            subjects: req.body.subjects,
            amount: totalAmount,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "paid",
        });

        await newOrder.save();

        res.json({
            success: true,
            message: "Payment verified & order saved",
            subjects: req.body.subjects,
            verified: true
        });
    } catch (error) {
        console.error("❌ Payment verification error:", error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from URL params

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // 🔹 Fetch orders where userId matches the logged-in user
        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error("❌ Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};



