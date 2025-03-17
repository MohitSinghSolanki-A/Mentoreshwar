import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const checkoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));

    const productId = checkoutDetails?.productId;
    const selectedSubjects = checkoutDetails?.subjects || [];
    const discountedPrice = parseFloat(checkoutDetails?.discountedPrice || 0);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSubjectsData, setSelectedSubjectsData] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ address: "", phone: "", attempt: "", username: "" });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId);
        }
    }, [productId]);

    useEffect(() => {
        setIsFormValid(
            formData.address.trim().length > 5 &&
            formData.phone.length === 10 &&
            formData.attempt !== ""
        );
    }, [formData]);

    const fetchProductDetails = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);

            // Filter subjects based on selected subjects from localStorage
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

    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            alert("⚠️ Authentication required. Please log in.");
            return;
        }

        try {
            const amountInPaise = Math.round(discountedPrice * 100);

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
                    amount: amountInPaise,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.orderId) {
                handleRazorpay(data.orderId, amountInPaise, token);
            } else {
                toast.error("⚠️ Payment initiation failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("❌ Error processing payment. Please try again.");
        }
    };


    const handleRazorpay = (orderId, amount, token) => {
        if (!window.Razorpay) {
            toast.error("⚠️ Razorpay SDK failed to load. Please refresh and try again.");
            return;
        }

        setLoading(true);
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
                            amount: amount,
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

                        const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
                        purchasedCourses.push({
                            productId: product._id,
                            title: product.title,
                            description: product.description,
                            subjects: selectedSubjectsData,
                            totalAmount: discountedPrice.toFixed(2),
                        });
                        localStorage.setItem("purchasedCourses", JSON.stringify(purchasedCourses));
                        await axios.post(
                            `${API_BASE_URL}/api/call/purchasemail`,
                            {
                                userId: localStorage.getItem("userId"),
                                email: localStorage.getItem("email"),
                                orderId: orderId,
                                productName: product.title,
                                subjects: selectedSubjectsData,
                                totalAmount: discountedPrice.toFixed(2),
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        await axios.post(
                            `${API_BASE_URL}/api/auth/userUpdate`,
                            {
                                userId: localStorage.getItem("userId"),
                                address: formData.address,
                                phoneNumber: formData.phone,
                                attempt: formData.attempt,
                                username: formData.username || "",
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );


                        toast.success("✅ Payment successful! Confirmation email sent.");
                        navigate("/thankyou");
                        localStorage.removeItem("checkoutDetails");
                    } else {
                        toast("⚠️ Payment verification failed. Please contact support.");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    toast("❌ Error verifying payment. Please try again.");
                } finally {
                    setLoading(false);
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">

            <div className="w-full lg:w-2/3 h-auto lg:h-screen bg-white shadow-lg p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">📌 Enter Your Details</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium text-gray-700">Username (Optional)</label>
                    <input
                        type="text" name="username" value={formData.username} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username (optional)"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Address</label>
                    <input
                        type="text" name="address" value={formData.address} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your address"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Phone Number</label>
                    <input
                        type="number" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter 10-digit phone number"
                        maxLength={10} />
                    {formData.phone.length > 0 && formData.phone.length !== 10 && (
                        <p className="text-red-500 text-sm">⚠️ Phone number must be exactly 10 digits.</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Select Attempt</label>
                    <select
                        name="attempt" value={formData.attempt} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Select Attempt --</option>
                        <option value="May 2023">May 2023</option>
                        <option value="March 2024">March 2024</option>
                    </select>
                </div>
            </div>


            <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">🛒 Checkout</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Loading product details...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">❌ {error}</p>
                ) : product ? (
                    <>
                        <h3 className="text-xl font-semibold">{product.title}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <h4 className="font-semibold text-gray-800">📚 Selected Subjects:</h4>
                        <ul className="mt-2">
                            {selectedSubjectsData.map(subject => (
                                <li key={subject._id} className="flex justify-between bg-gray-100 p-2 rounded-md mt-2">
                                    <span>{subject.name}</span>
                                    <span className="font-medium">₹{subject.price}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="mt-4 text-lg font-bold">💰 Total: ₹{discountedPrice.toFixed(2)}</h3>
                        <button
                            className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold text-white shadow-md transition-all ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!isFormValid} onClick={handlePayment}
                        >
                            🚀 Buy Now
                        </button>
                    </>
                ) : (
                    <p className="text-red-500 text-center">❌ Product not found.</p>
                )}
            </div>

        </div>

    );
};


export default Checkout;
