const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    companyName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    applyLink: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
