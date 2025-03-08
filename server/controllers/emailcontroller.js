const Contact = require("../models/emailmodel");
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
    const { email, name, phone } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email to the user
    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Callback Request Received",
        text: `Hello ${name},\n\nWe have received your callback request. Our team will contact you soon.\n\nPhone: ${phone}\n\nBest Regards,\nYour Company`
    };

    // Email to your company
    const companyMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL, // Ensure this is defined in your .env
        subject: "New Callback Request",
        text: `New callback request received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nPlease follow up accordingly.`
    };

    try {
        // Send email to user
        await transporter.sendMail(userMailOptions);

        // Send email to your company
        await transporter.sendMail(companyMailOptions);

        res.json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending emails" });
    }
};
