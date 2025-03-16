import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: "",
        agreeTerms: false,
    });

    const handleSignIn = () => {
        window.location.href = "/login";

    };

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms";
        if (!formData.otp) newErrors.otp = "OTP is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    // Send OTP function
    const sendOtp = async () => {
        if (!formData.email) {
            toast.error("Enter a valid email to receive OTP!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/call/sendotp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("📩 OTP sent successfully! Check your email.");
                setOtpSent(true);
            } else {
                toast.error(`❌ ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to send OTP");
        }
    };

    // Verify OTP function
    const verifyOtp = async () => {
        if (!formData.otp) {
            toast.error("Enter OTP to verify!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/call/verifyotp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp: formData.otp }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("✅ OTP verified successfully!");
                setOtpVerified(true);
            } else {
                toast.error(`❌ ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ OTP verification failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || !otpVerified) {
            toast.error("Please verify OTP before registration.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {

                toast.success("🎉 Registration successful! Please login.");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(`❌ ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Something went wrong. Try again!");
        }
    };



    return (
        <>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="m-auto w-full max-w-[540px] grid grid-cols-1 h-full md:py-20 py-10 px-5">

                    <div className="flex justify-center lg:justify-start">
                        <div className="cursor-pointer flex items-center">
                            <svg className="w-10  stroke-current text-[#44448e]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225">
                                <g transform="matrix( 1, 0, 0, 1, 0,0)">
                                    <g>
                                        <path fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeMiterlimit="3"
                                            d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4 M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                    </g>
                                </g>
                            </svg>
                            <div className="text-2xl text-[#272757] tracking-wide ml-2 font-semibold">Welcome Learner</div>
                        </div>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="mt-10 lg:mt-16 xl:max-w-2xl">
                            <h2 className="text-center text-4xl text-[#272757] font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Register Now!</h2>
                        </div>
                        <div className="items-center py-2 mb-2 mt-5">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">User Name</label>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={handleChange} />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div className="items-center py-2 mb-2">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Email Address</label>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="items-center py-2 mb-2">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Enter Password</label>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <label className="ml-2 text-sm text-gray-700">I agree to the terms & conditions</label>
                        </div>
                        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

                        <div className="mt-10">
                            <button type="submit" className="bg-[#44448e] text-gray-100 p-4 w-full rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-[#272757]
                shadow-lg">
                                Register
                            </button>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Have an account?
                                <span
                                    onClick={handleSignIn}
                                    className="ml-1 text-[#6868ac] hover:text-indigo-800 transition duration-200 cursor-pointer"
                                >
                                    Sign In
                                </span>
                            </div>
                        </div>
                    </form>

                </div>
<
                <div className="hidden lg:flex items-center justify-center bg-[#6868ac] flex-1">

                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">Mentoreshwar</h1>
                        <p className="text-white mt-1">The most popular peer to peer Guidance</p>
                    </div>


                </div>
=======
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <form className="bg-white" onSubmit={handleSubmit}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello There!</h1>
                    <p className="text-sm font-bold text-gray-600 mb-7">Welcome!</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Username" />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        {!otpSent ? (
                            <button type="button" onClick={sendOtp} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
                                Send OTP
                            </button>
                        ) : otpVerified ? (
                            <FaCheck className="ml-2 text-green-500" size={20} />
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter OTP"
                                    className="ml-2 border px-2 py-1 rounded"
                                />
                                <button type="button" onClick={verifyOtp} className="bg-green-500 text-white px-3 py-1 rounded">
                                    Verify OTP
                                </button>
                            </div>
                        )}

                    </div>




                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>


                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                        />
                        <label className="ml-2 text-sm text-gray-700">I agree to the terms & conditions</label>
                    </div>
                    {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

                    <button type="submit"
                        className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Register</button>

                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Have an account?
                        <span
                            onClick={handleSignIn}
                            className="ml-1 text-indigo-600 hover:text-indigo-800 transition duration-200 cursor-pointer"
                        >
                            Sign In
                        </span>
                    </div>
                </form>

            </div>
        </>
    );
}



