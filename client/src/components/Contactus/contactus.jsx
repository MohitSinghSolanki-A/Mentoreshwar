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
        <div className="home">
            <div className="contact-container">
                <div className="lg:grid grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-5xl font-bold">Request a Callback</h2>
                        <p className="!mt-4">Our experts are here to assist you. Fill in your details, and we’ll get in touch shortly!</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={man} alt="Contact Us" className="contact-image h-auto w-[350px]" />
                    </div>
                </div>
                <div className="!px-10 !py-10 !items-center bg-[#272757] rounded-2xl">
                    <div className="grid grid-cols-4 items-center">
                        <div className="flex flex-col">
                            <label className="text-sm flex gap-2 items-center font-bold text-white">
                                <FaUser className="text-xl" />
                                NAME
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="!px-4 !py-2.5 border border-[#6868ac] !mt-2.5 w-[92%] rounded-md text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm flex gap-2 items-center font-bold text-white">
                                <FaEnvelope className="text-xl" />
                                EMAIL
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="!px-4 !py-2.5 border-1 border-[#6868ac] !mt-2.5 w-[92%] rounded-md text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm flex gap-2 items-center font-bold text-white">
                                <FaPhone className="text-xl" />
                                PHONE
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="!px-4 !py-2.5 border-1 border-[#6868ac] !mt-2.5 w-[92%] rounded-md text-white"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="!bg-[#e0e0ef] !px-10 !py-2.5 w-[240px] !text-[#0e0e27] hover:!bg-[#8f8fc4] !text-xl !rounded-2xl" onClick={handleSubmit}>Request A Callback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
