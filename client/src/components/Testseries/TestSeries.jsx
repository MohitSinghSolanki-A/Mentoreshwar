import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TestSeries({ userId }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState({});
    localStorage.getItem("userId", userId);
    console.log("User ID:", userId);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/payment/orders/${userId}`);
                const data = await response.json();
                console.log(response);

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

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const onDocumentLoadSuccess = (pdfUrl, { numPages }) => {
        setNumPages((prevPages) => ({ ...prevPages, [pdfUrl]: numPages }));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="test-series-container">
            <h2>Your Purchased Test Series</h2>

            {orders.length === 0 ? (
                <p>No test series purchased yet.</p>
            ) : (
                orders.map((order) =>
                    order.subjects.map((subject) => (
                        <div key={subject._id} className="pdf-container">
                            <h3>{subject.name}</h3>
                            <Document
                                file={subject.pdfUrl}
                                onLoadSuccess={(pdf) => onDocumentLoadSuccess(subject.pdfUrl, pdf)}
                            >
                                {Array.from(new Array(numPages[subject.pdfUrl] || 0), (_, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                ))}
                            </Document>
                        </div>
                    ))
                )
            )}
        </div>
    );
}
