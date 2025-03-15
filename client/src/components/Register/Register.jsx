import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        agreeTerms: false,
    });

    const handleSignIn = () => {
        window.location.href = "/login";

    };

    const [errors, setErrors] = useState({});

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
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
                <div className="hidden lg:flex items-center justify-center bg-[#6868ac] flex-1">

                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">Mentoreshwar</h1>
                        <p className="text-white mt-1">The most popular peer to peer Guidance</p>
                    </div>


                </div>
            </div>
        </>
    );
}



