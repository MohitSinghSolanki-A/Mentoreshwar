const Contact = require("../models/emailmodel");
const transporter = require("../middleware/nodemailer")
const crypto = require('crypto');
const otpStore = {};

exports.submitContactForm = async (req, res) => {
    const { email, name, phone } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Callback Request Received",
        text: `Hello ${name},\n\nWe have received your callback request. Our team will contact you soon.\n\nPhone: ${phone}\n\nBest Regards,\nTeam Mentoreshwar`
    };

    const companyMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL,
        subject: "New Callback Request",
        text: `New callback request received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nPlease follow up accordingly.`
    };

    try {
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(companyMailOptions);

        res.json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending emails" });
    }
};



// Purchase email
exports.sendPurchaseConfirmation = async (req, res) => {
    const { email, orderId, productName, totalAmount, subjects } = req.body;

    if (!email || !orderId) {
        return res.status(400).json({ message: "Required purchase details missing!" });
    }

    const subjectsList = subjects.map(subject => `- ${subject.name} (₹${subject.price})`).join("\n");


    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Purchase Confirmation - Your Order is Successful!",
        text: `Hello,\n\nThank you for your purchase!\n\nHere are your order details:\n\n
        📌 Order ID: ${orderId}
        🏷️ Product: ${productName}
        📚 Subjects Purchased:\n${subjectsList}
        💰 Total Amount Paid: ₹${totalAmount}
        
        You can now access your purchased courses in your account.\n\nBest Regards,\nTeam Mentoreshwar`
    };


    const companyMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL,
        subject: "New Purchase Alert - Order Received",
        text: `A new purchase has been made:\n\n
        🏷️ BuyerEmail: (${email})
        📌 Order ID: ${orderId}
        🏷️ Product: ${productName}
        📚 Subjects Purchased:\n${subjectsList}
        💰 Total Amount: ₹${totalAmount}
        
        Please verify and process accordingly.`
    };

    try {
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(companyMailOptions);

        res.json({ message: "Purchase confirmation emails sent successfully!" });
    } catch (error) {
        console.error("Email Sending Error:", error);
        res.status(500).json({ message: "Error sending purchase emails" });
    }
};


exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Registration",
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

exports.verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    if (otpStore[email] === otp) {
        delete otpStore[email];
        res.json({ message: "OTP verified! Proceed with registration." });
    } else {
        res.status(400).json({ error: "Invalid or expired OTP" });
    }
};
