import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md md:max-w-lg transform transition-all">
                <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-[#44448E] mb-4">{job.companyName}</h2>
                <p className="text-gray-600 my-2">{job.description}</p>
                <p className="text-blue-500 flex items-center">📍 {job.location}</p>

                {job.applyLink.includes("@") ? (
                    <p className="text-blue-600 font-semibold mt-4 flex items-center">
                        ✉️ <a href={`mailto:${job.applyLink}`} className="ml-1 underline">{job.applyLink}</a>
                    </p>
                ) : (
                    <button className="bg-[#44448E] text-white px-4 py-2 rounded mt-4 w-full hover:bg-[#2c2c6e] transition" onClick={handleApply}>
                        Apply Now
                    </button>
                )}
            </div>
        </div>
    );
};

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/job`);
                setJobs(response.data);
            } catch (err) {
                setError("Failed to load jobs. Please try again.", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };

    const categories = ["All", ...new Set(jobs.map((job) => job.category))];

    const filteredJobs = selectedCategory === "All" ? jobs : jobs.filter((job) => job.category === selectedCategory);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-[#44448E] text-white py-4 px-6 text-center text-2xl font-bold">
                Job Board
            </header>

            {/* Category Filters */}
            <div className="bg-white shadow-md py-3 px-6 flex flex-wrap justify-center gap-3 border-b">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 border rounded-md transition ${selectedCategory === category ? "bg-[#44448E] text-white" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Job Listings */}
            <div className="flex-1 overflow-auto p-6">
                {loading ? (
                    <p className="text-center text-gray-600">Loading jobs...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 md:grid-cols-4 bg-gray-200 text-gray-600 font-semibold p-4">
                            <p>Posted On</p>
                            <p className="hidden md:block">Logo</p>
                            <p>Company Name</p>
                            <p>Details</p>
                        </div>

                        {/* Job Rows */}
                        <div className="divide-y divide-gray-200">
                            {filteredJobs.map((job, index) => (
                                <div key={index} className="grid grid-cols-3 md:grid-cols-4 items-center p-4 hover:bg-gray-50 transition">
                                    <p className="text-gray-600">{formatDate(job.createdAt)}</p>
                                    <img src={job.logo} alt="Logo" className="hidden md:block w-12 h-12 object-contain" />
                                    <p className="text-gray-700 font-semibold">{job.companyName}</p>
                                    <button className="bg-[#44448E] text-white px-4 py-2 rounded hover:bg-[#2c2c6e] transition" onClick={() => setSelectedJob(job)}>
                                        More
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
};

export default JobList;
