import { useState } from "react";
import axios from "axios";

export default function Resources() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("Name", title);
        formData.append("Category", category);
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:3001/api/resource/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage(res.data.message);
            setDownloadUrl(res.data.downloadUrl); // Store download link if returned
        } catch (error) {
            setMessage("Upload failed. Please try again.");
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="pt-24 px-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-bold mb-4">Upload Resource</h2>

            {message && <p className="text-green-500">{message}</p>}

            <form onSubmit={handleUpload} className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    className="border p-2 w-full rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="file"
                    className="border p-2 w-full rounded"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Upload
                </button>
            </form>

            {/* Show Download Link if Available */}
            {downloadUrl && (
                <div className="mt-4">
                    <p className="text-gray-700">Your file is uploaded successfully.</p>
                    <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Download Resource
                    </a>
                </div>
            )}
        </div>
    );
}
