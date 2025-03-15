import React, { useState } from "react";
import axios from "axios";
import './contactus.css'
import man from "../../assets/man-2.png"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

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
            const response = await axios.post("http://localhost:3001/api/call/email", formData);
            setMessage(response.data.message);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            console.log("error", error)
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="m-auto w-full max-w-[1440px] px-5 lg:py-20 md:py-16 py-10">
                <div className="md:grid grid-cols-2 w-full md:gap-5 space-y-5 ">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-5xl font-bold">Request a Callback</h2>
                        <p className="mt-4">Our experts are here to assist you. Fill in your details, and we’ll get in touch shortly</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={man} alt="Contact Us" className="contact-image h-auto lg:w-[350px] w-3xs" />
                    </div>
                </div>

                <div className="md:px-10 md:py-10 px-5 py-10 items-center bg-[#272757] rounded-2xl">
                    <div className="lg:grid grid-cols-4 items-center lg:space-x-0 space-y-5">
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
                                className="py-2.5 border-b border-[#6868ac] mt-2.5 lg:w-[92%] w-full text-white focus:outline-none focus:border-[#b7b7d9]"
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
                                className="py-2.5 border-b border-[#6868ac] mt-2.5 lg:w-[92%] w-full text-white focus:outline-none focus:border-[#b7b7d9]"
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
                                className="py-2.5 border-b border-[#6868ac] mt-2.5 lg:w-[92%] w-full text-white focus:outline-none focus:border-[#b7b7d9]"
                                required
                            />
                        </div>
                        <div className="flex justify-center ">
                            <button className="bg-[#e0e0ef] px-10 py-2.5 lg:w-[240px] w-full text-[#0e0e27] hover:bg-[#8f8fc4] text-xl rounded-full" onClick={handleSubmit}>Request A Callback</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Contact;
