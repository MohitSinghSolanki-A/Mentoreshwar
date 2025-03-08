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
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

                <div className="flex justify-center mb-4">
                    <div className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-white rounded-full animate-ping absolute"></div>
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800">Thank You!</h1>
                <p className="text-gray-600">Your purchase was successful.</p>

                <div className="mt-4 space-y-4">
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-sm text-gray-600">{course.description}</p>
                                <ul className="mt-2 text-gray-700 text-sm">
                                    {course.subjects.map((subject, i) => (
                                        <li key={i} className="flex justify-between border-b py-1">
                                            <span>{subject.name}</span>
                                            <span className="font-semibold">₹{subject.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="mt-2 text-lg font-bold text-gray-800">Total: ₹{course.totalAmount}</h4>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-sm">
                            An email with your order details has been sent to your registered email address.
                        </p>
                    )}
                </div>

                <p className="mt-6 text-gray-500 text-sm">You will be redirected to the home page in a few seconds...</p>

                <div className="mt-6 flex flex-col gap-2">
                    <button
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate("/")}
                    >
                        Return to Home
                    </button>
                    <button
                        className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
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
