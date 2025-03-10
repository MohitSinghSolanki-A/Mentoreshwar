import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const productId = queryParameters.get("productId");
    const selectedSubjects = queryParameters.get("subjects")?.split(",").map(s => s.trim()) || [];

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSubjectsData, setSelectedSubjectsData] = useState([]);
    const [error, setError] = useState(null);

    const API_BASE_URL = "http://localhost:3001";

    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);
            const filteredSubjects = data.subjects.filter(subject => selectedSubjects.includes(subject.name));
            setProduct(data);
            setSelectedSubjectsData(filteredSubjects);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = () => selectedSubjectsData.reduce((total, subject) => total + subject.price, 0);

    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
            alert("⚠️ Authentication required. Please log in.");
            return;
        }
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/payment/create-order`,
                {
                    userId,
                    productIds: [productId],
                    subjects: selectedSubjectsData.map(subject => ({
                        subjectId: subject._id,
                        name: subject.name,
                        price: subject.price,
                        pdfUrl: subject.pdfUrl
                    })),
                    amount: calculateTotalPrice(),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.orderId) {
                localStorage.setItem("purchasedCourses", JSON.stringify([...JSON.parse(localStorage.getItem("purchasedCourses")) || [], {
                    productId: product._id,
                    title: product.title,
                    description: product.description,
                    subjects: selectedSubjectsData,
                    totalAmount: calculateTotalPrice(),
                }]));
                handleRazorpay(data.orderId, data.amount, token);
            } else {
                alert("⚠️ Payment initiation failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("❌ Error processing payment. Please try again.");
        }
    };

    const handleRazorpay = (orderId, amount, token) => {
        if (!window.Razorpay) {
            alert("⚠️ Razorpay SDK failed to load. Please refresh and try again.");
            return;
        }
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: amount,
            currency: "INR",
            order_id: orderId,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        `${API_BASE_URL}/api/payment/verify-payment`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: localStorage.getItem("userId"),
                            productIds: [productId],
                            subjects: selectedSubjectsData.map(subject => ({
                                subjectId: subject._id,
                                name: subject.name,
                                price: subject.price,
                                pdfUrl: subject.pdfUrl
                            })),
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (data.success) {
                        toast("✅ Payment successful! Thank you for your purchase.");
                        navigate("/thankyou");
                        localStorage.removeItem("purchasedCourses");
                    } else {
                        toast("⚠️ Payment verification failed. Please contact support.");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    toast("❌ Error verifying payment. Please try again.");
                }
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 transition-all hover:shadow-3xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🛒 Course Checkout</h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading product details...</p>
                ) : error ? (
                    <p className="text-red-500 text-center font-semibold">❌ {error}</p>
                ) : product ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-700">{product.title}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>

                        <h4 className="mt-4 font-semibold text-gray-800 border-b pb-2">📚 Selected Subjects:</h4>
                        <ul className="list-none mt-2">
                            {selectedSubjectsData.length > 0 ? (
                                selectedSubjectsData.map(subject => (
                                    <li key={subject._id} className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm mt-2">
                                        <span className="text-gray-700">{subject.name}</span>
                                        <span className="font-medium text-gray-900">₹{subject.price}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-yellow-500 font-medium text-center">⚠️ No subjects selected.</p>
                            )}
                        </ul>

                        <h3 className="mt-6 text-lg font-bold text-gray-900">💰 Total: ₹{calculateTotalPrice()}</h3>

                        <button
                            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                            onClick={handlePayment}
                            disabled={!product || loading || selectedSubjectsData.length === 0}
                        >
                            🚀 Buy Now
                        </button>
                    </>
                ) : (
                    <p className="text-red-500 text-center font-semibold">❌ Product not found.</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;