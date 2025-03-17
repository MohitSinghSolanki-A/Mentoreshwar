import mongoose from "mongoose";

const studentNewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

const StudentNewsletter = mongoose.model("StudentNewsletter", studentNewsletterSchema);
export default StudentNewsletter;