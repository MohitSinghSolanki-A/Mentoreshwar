import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TestSeries() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadedPdf, setUploadedPdf] = useState(null);

    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
            const data = await response.json();

            console.log(response, data);
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

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const handlePdfUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const pdfUrl = URL.createObjectURL(file);
            setUploadedPdf(pdfUrl);
        } else {
            toast.error("Please upload a valid PDF file.");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Your Purchased Test Series
            </h2>

            {/* PDF Upload Section */}
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Own Test Series</h3>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="w-full border p-2 rounded-lg"
                />
            </div>

            {/* Uploaded PDF Preview */}
            {uploadedPdf && (
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Uploaded PDF Preview</h3>
                    <iframe
                        src={uploadedPdf}
                        width="100%"
                        height="500px"
                        className="border rounded-lg"
                    />
                </div>
            )}

            {/* Purchased PDFs */}
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No test series purchased yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {orders.map((order) =>
                        order.subjects.map((subject) => (
                            <div key={subject._id} className="bg-white shadow-lg rounded-lg p-4">
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">{subject.name}</h3>
                                <div className="border p-2 rounded-lg">
                                    <iframe
                                        src={subject.pdfUrl}
                                        width="100%"
                                        height="500px"
                                        className="border rounded-lg"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
