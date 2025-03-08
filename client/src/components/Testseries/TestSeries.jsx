import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "react-toastify/dist/ReactToastify.css";
pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export default function TestSeries() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) fetchOrders();
    }, [userId]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders);
            } else {
                toast.error(data.message || "Failed to fetch orders.");
            }
        } catch (error) {
            toast.error("Error fetching orders.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", userId);

        setUploading(true);

        try {
            const response = await fetch("http://localhost:3001/api/uploads", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("PDF uploaded successfully!");
                setSelectedFile(null);
            } else {
                toast.error(data.message || "Upload failed.");
            }
        } catch (error) {
            toast.error("Error uploading file.");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Your Purchased Test Series 📚
            </h2>

            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Your Own Test Series
                </h3>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <span className="text-gray-500">Drag & Drop or Click to Upload</span>
                </label>

                {selectedFile && (
                    <p className="mt-2 text-sm text-gray-700">Selected: {selectedFile.name}</p>
                )}

                <button
                    onClick={handleUpload}
                    className={`mt-4 px-4 py-2 rounded-lg text-white ${uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select a Subject</h3>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-300 h-12 rounded-lg"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {orders.length > 0 ? (
                            orders.map((order) =>
                                order.subjects.map((subject) => (
                                    <button
                                        key={subject._id}
                                        onClick={() => setSelectedPdf(subject.pdfUrl)}
                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
                                    >
                                        {subject.name}
                                    </button>
                                ))
                            )
                        ) : (
                            <p className="text-gray-500 col-span-3 text-center">
                                No subjects available.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {selectedPdf && (
                <div className="flex justify-center">
                    <embed
                        src={`${selectedPdf}#toolbar=0&navpanes=0&scrollbar=0`}
                        type="application/pdf"
                        className="w-full max-w-4xl h-[600px] border-2 rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}
