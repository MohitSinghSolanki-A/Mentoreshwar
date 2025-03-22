import React, { useState } from "react";
import axios from "axios";
import './contactus.css'
import man from "../../assets/man-2.png"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
        try {
            const response = await axios.post(`${API_BASE_URL}/api/call/email`, formData);
            setMessage(response.data.message);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            console.log("error", error)
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="m-auto w-full max-w-[1440px] px-5 lg:pt-20 md:pt-16 pt-10">
                <div className="lg:grid grid-cols-2 w-full md:gap-5 space-y-5 ">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-5xl font-bold">Request a Callback</h2>
                        <p className="mt-4">Our experts are here to assist you. Fill in your details, and we'll get in touch shortly</p>
                        <div className="md:px-10 md:py-10 px-5 py-10 items-center bg-[#272757] rounded-2xl mt-10 mb-20">
                            <div className="lg:grid grid-cols-1 items-center lg:space-x-0 space-y-5">
                                <div className="flex flex-col">
                                    <label className="text-sm flex gap-2 items-center font-bold text-[#b7b7d9]">
                                        <FaUser className="text-xl" />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="py-2.5 border-b border-[#6868ac] mt-2.5 w-full text-white focus:outline-none focus:border-[#b7b7d9]"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm flex gap-2 items-center font-bold text-[#b7b7d9]">
                                        <FaEnvelope className="text-xl" />
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="py-2.5 border-b border-[#6868ac] mt-2.5 w-full text-white focus:outline-none focus:border-[#b7b7d9]"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm flex gap-2 items-center font-bold text-[#b7b7d9]">
                                        <FaPhone className="text-xl" />
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="py-2.5 border-b border-[#6868ac] mt-2.5 w-full text-white focus:outline-none focus:border-[#b7b7d9]"
                                        required
                                    />
                                </div>
                                <div className="flex justify-center ">
                                    <button className="bg-[#e0e0ef] px-10 py-2.5 w-full text-[#0e0e27] hover:bg-[#8f8fc4] text-xl rounded-full" onClick={handleSubmit}>Request A Callback</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-end">
                        <img src={man} alt="Contact Us" className="contact-image h-auto lg:w-[400px] w-96" />
                    </div>
                </div>


            </div>

        </>
    );
};

export default Contact;
