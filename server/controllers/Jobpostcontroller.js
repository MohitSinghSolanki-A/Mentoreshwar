const Job = require('../models/Jobpostmodel');

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createJob = async (req, res) => {
    const { logo, companyName, category, description, applyLink } = req.body;
    try {
        const newJob = new Job({ logo, companyName, category, description, applyLink });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
