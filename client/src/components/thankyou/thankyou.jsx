import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedCourses = localStorage.getItem("purchasedCourses");
            if (storedCourses) {
                setCourses(JSON.parse(storedCourses));
            }
        } catch (error) {
            console.error("Error parsing purchasedCourses from localStorage:", error);
        }

        const timer = setTimeout(() => {
            window.location.href = "/";
            localStorage.removeItem("purchasedCourses")
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center border border-gray-200">

                <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-12 h-12 border-4 border-white rounded-full animate-ping absolute"></div>
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-800">Thank You!</h1>
                <p className="text-gray-600 text-lg">Your purchase was successful.</p>

                <div className="mt-6 space-y-4">
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div key={index} className="border rounded-xl p-5 bg-gray-50 shadow-sm text-left">
                                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                <p className="text-sm text-gray-600">{course.description}</p>
                                <ul className="mt-2 text-gray-700 text-sm">
                                    {course.subjects.map((subject, i) => (
                                        <li key={i} className="flex justify-between border-b py-1 text-gray-800">
                                            <span>{subject.name}</span>
                                            <span className="font-semibold">₹{subject.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="mt-3 text-lg font-bold text-gray-800">Total: ₹{course.totalAmount}</h4>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-sm">
                            An email with your order details has been sent to your registered email address.
                        </p>
                    )}
                </div>

                <p className="mt-6 text-gray-500 text-sm">You will be redirected to the home page in a few seconds...</p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                        onClick={() => navigate("/")}
                    >
                        Return to Home
                    </button>
                    <button
                        className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold text-lg"
                        onClick={() => navigate("/products")}
                    >
                        Buy More Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;