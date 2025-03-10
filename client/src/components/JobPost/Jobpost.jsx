import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
    const [jobData, setJobData] = useState({
        logo: "",
        companyName: "",
        category: "",
        description: "",
        applyLink: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/job", jobData);
            setMessage("Job posted successfully!");
            setJobData({ logo: "", companyName: "", category: "", description: "", applyLink: "" });
            console.log(response)
        } catch (error) {
            console.error("Error posting job:", error);
            setMessage("Failed to post job. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Post a Job</h2>
                {message && <p className="text-center text-green-600">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="logo"
                        placeholder="Company Logo URL"
                        value={jobData.logo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={jobData.companyName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category (e.g., Tech, Finance)"
                        value={jobData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={jobData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="applyLink"
                        placeholder="Application Link or Email"
                        value={jobData.applyLink}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
