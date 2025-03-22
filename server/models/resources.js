const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    Category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
