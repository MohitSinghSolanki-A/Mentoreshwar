import axios from "axios";
import { useEffect, useState } from "react";

const FreeResources = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResources();
    }, []);

    function fetchResources() {
        axios
            .get("http://localhost:3001/api/resource")
            .then((res) => {
                const data = res.data.data || [];
                setResources(data);
                setFilteredResources(data);

                // Extract unique categories and add "All" at the beginning
                const uniqueCategories = ["All", ...new Set(data.map((item) => item.Category))];
                setCategories(uniqueCategories);

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching resources:", err);
                setError("Failed to load resources.");
                setLoading(false);
            });
    }

    // Filter resources based on selected category
    const handleFilterChange = (category) => {
        setActiveFilter(category);
        if (category === "All") {
            setFilteredResources(resources);
        } else {
            setFilteredResources(resources.filter((resource) => resource.Category === category));
        }
    };

    return (
        <div className="pt-24 px-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Free Resources</h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    {/* Filter Buttons */}
                    <div className="flex space-x-4 mb-4">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-md transition ${activeFilter === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                onClick={() => handleFilterChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr className="text-left">
                                    <th className="p-3 border">Category</th>
                                    <th className="p-3 border">Resource Name</th>
                                    <th className="p-3 border">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.length > 0 ? (
                                    filteredResources.map((resource) => (
                                        <tr key={resource.id} className="border-b">
                                            <td className="p-3 border">{resource.Category || "N/A"}</td>
                                            <td className="p-3 border">{resource.name}</td>
                                            <td className="p-3 border">
                                                <a
                                                    href={resource.downloadUrl}
                                                    download
                                                    target="_blank"
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                                >
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4 text-gray-500">
                                            No resources available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default FreeResources;
