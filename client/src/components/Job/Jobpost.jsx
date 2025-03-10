import React, { useState, useEffect } from "react";
import axios from "axios";

const JobCard = ({ job, onClick }) => {
    return (
        <div className="bg-white shadow-md p-6 rounded-lg cursor-pointer" onClick={() => onClick(job)}>
            <h2 className="text-xl font-bold">{job.companyName}</h2>
            <p className="text-blue-500 flex items-center">📍 {job.location}</p>
            {job.stipend && <p className="text-green-500 flex items-center">💰 ₹{job.stipend}</p>}
            <p className="text-gray-500">📅 Posted today</p>
        </div>
    );
};

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    // Handle Apply Now button
    const handleApply = () => {
        if (job.applyLink.includes("@")) {
            window.location.href = `mailto:${job.applyLink}`;
        } else {
            window.open(job.applyLink, "_blank");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-blue-800">{job.companyName}</h2>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-blue-500">📍 {job.location}</p>
                {job.stipend && <p className="text-green-500">💰 ₹{job.stipend}</p>}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                    onClick={handleApply}
                >
                    Apply Now
                </button>
                <button className="text-red-500 mt-2 w-full" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [category, setCategory] = useState("All");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/job")
            .then((response) => {
                setJobs(response.data);
                setLoading(false);

                // Extract unique categories
                const uniqueCategories = [...new Set(response.data.map(job => job.category))];
                setCategories(uniqueCategories);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setError("Failed to load jobs.");
                setLoading(false);
            });
    }, []);

    const filteredJobs = category === "All" ? jobs : jobs.filter(job => job.category === category);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Filters */}
            <div className="w-1/4 bg-white p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Category</h3>
                <select
                    className="w-full p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Job Listings */}
            <div className="w-3/4 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
                {loading && <p className="text-center text-gray-600">Loading jobs...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="space-y-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job._id} job={job} onClick={setSelectedJob} />
                    ))}
                </div>
            </div>

            {/* Job Modal */}
            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
};

export default JobList;
