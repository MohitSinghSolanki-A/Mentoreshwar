/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaRocket, FaGlobe, FaUsers } from "react-icons/fa";

const mentorshipData = [
    {
        icon: <FaUserGraduate className="w-8 h-8 text-[#44448E]" />,
        title: "1 ON 1 Sessions",
        description: "Get personal guidance to unlock your full potential.",
        points: ["Personalized", "Focused Learning", "Expert Advice"],
    },
    {
        icon: <FaRocket className="w-8 h-8 text-[#44448E]" />,
        title: "Career Growth",
        description: "Boost your career with expert mentorship and advice.",
        points: ["Resume Review", "Interview Prep", "Skill Development"],
    },
    {
        icon: <FaGlobe className="w-8 h-8 text-[#44448E]" />,
        title: "Global Networking",
        description: "Connect with industry leaders and like-minded individuals.",
        points: ["LinkedIn Optimization", "Networking Events", "Opportunities"],
    },
    {
        icon: <FaUsers className="w-8 h-8 text-[#44448E]" />,
        title: "Community Support",
        description: "Learn and grow with a supportive peer group.",
        points: ["Q&A Forums", "Group Discussions", "Exclusive Resources"],
    },
];

const MentorshipServices = () => {
    return (
        <div className="container m-auto max-w-[1440px]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto px-5 lg:py-20 md:py-16 py-10 md:px-8 lg:px-16"
            >
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Elevate Your Journey with Expert Guidance 🚀
                    </h2>
                    <p className="text-gray-700 mt-4 text-base md:text-lg max-w-2xl mx-auto">
                        Join a community of learners and professionals who are shaping their futures
                        through personalized mentorship, career insights, and real-world guidance.
                    </p>
                </motion.div>


                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mentorshipData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative flex flex-col items-center bg-white shadow-md rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg"
                        >

                            {/* Icon */}
                            <div className="relative flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h6 className="mb-2 text-lg font-semibold">{item.title}</h6>

                            {/* Description */}
                            <p className="mb-4 text-sm text-gray-600">{item.description}</p>

                            {/* Points */}
                            <ul className="mb-4 space-y-2 text-gray-700">
                                {item.points.map((point, idx) => (
                                    <li key={idx} className="flex items-center justify-center">
                                        <span className="mr-2 text-[#44448E]">✔</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <button className="px-4 py-2 text-sm font-medium text-white bg-[#44448E] rounded-full transition hover:bg-[#44448E]">
                                Learn More
                            </button>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default MentorshipServices;
