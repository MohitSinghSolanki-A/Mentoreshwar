import React, { useState, useEffect } from "react";
import axios from "axios";

const JobCard = ({ job, onClick }) => {
    return (
        <div className="bg-white shadow-md p-6  cursor-pointer" onClick={() => onClick(job)}>
            <img src={job.logo} alt="Company Logo" className="w-16 h-16 object-contain mb-2" />
            <h2 className="text-xl font-bold">{job.companyName}</h2>
            <p className="text-blue-500 flex items-center">📍 {job.location}</p>
            {job.stipend && <p className="text-green-500 flex items-center">💰 ₹{job.stipend}</p>}
        </div>
    );
};

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    const handleApply = () => {
        if (job.applyLink.startsWith("http") || job.applyLink.startsWith("www")) {
            const url = job.applyLink.startsWith("www") ? `https://${job.applyLink}` : job.applyLink;
            window.open(url, "_blank");
        } else if (job.applyLink.includes("@")) {
            window.open(`mailto:${job.applyLink}`, "_self");
        } else {
            alert("Invalid apply link!");
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-[#44448E]">{job.companyName}</h2>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-blue-500 flex items-center">📍 {job.location}</p>

                {job.applyLink.includes("@") ? (
                    <p className="text-blue-600 font-semibold mt-4 flex items-center">
                        ✉️ <a href={`mailto:${job.applyLink}`} className="ml-1 underline">{job.applyLink}</a>
                    </p>
                ) : (
                    <button
                        className="bg-[#44448E] text-white px-4 py-2 rounded mt-4 w-full"
                        onClick={handleApply}
                    >
                        Apply Now
                    </button>
                )}

                <button className="text-red-500 mt-2 w-full" onClick={onClose}>
                    Close
                </button>
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
        <div className="container mx-auto p-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Sidebar Filters */}
                <div>
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

                {/* Job Listings - Spans remaining 3 columns */}
                <div className="md:col-span-3">
                    <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
                    {loading && <p className="text-center text-gray-600">Loading jobs...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.map((job, index) => (
                            <div
                                key={job._id}
                                className={`${index % 2 === 0 ? "md:col-span-2" : "md:col-span-1"}`}
                            >
                                <JobCard job={job} onClick={setSelectedJob} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Job Modal */}
            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
};


export default JobList;
