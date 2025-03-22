import React from "react";
const AboutUs = () => {
    return (
        <div className="w-full max-w-[1440px] m-auto">
            <div className="grid lg:grid-cols-2 px-5 py-10 lg:py-20 md:py-16 xl:gap-x-10 lg:gap-x-5 gap-y-10">
                <div className="text-center md:text-left ">
                    <h2 className="text-xl font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        How It Started
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-[#44448E] leading-tight">
                        Our Dream is <span className="text-gray-900">Global Learning</span>
                    </h3>
                    <p className="text-gray-700 mt-4 leading-relaxed text-lg">
                        Welcome to <span className="font-bold text-[#44448E]">Mentoreshwar</span>, your trusted partner in educational excellence and professional growth.
                        We empower CA students through high-quality test series, expert mentorship, and career development.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed text-lg">
                        At Mentoreshwar, we understand that the path to becoming a Chartered Accountant is challenging, which is why we offer high-quality
                        Test Series designed to help students at all levels prepare effectively and excel in their exams.
                        Our test series are crafted by experienced professionals, ensuring that you get the most relevant and accurate practice material.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed text-lg">
                        In addition to academic support and mentorship, Mentoreshwar offers a range of courses aimed at enhancing your professional development.
                        These courses are designed to help you stay ahead in an ever-evolving industry,
                        equipping you with the skills you need to thrive in the competitive world of finance and accounting.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed text-lg">
                        To further enhance your learning experience, we also connect you with Articleship and Industrial Training opportunities,
                        enabling you to gain real-world experience and build a strong foundation for your future career.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed text-lg">
                        At Mentoreshwar, we are committed to helping you achieve your dreams, providing the resources and support you need to succeed at every stage of your journey.
                        Join us today and take the next step toward a bright, successful future!
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-xl object-cover"
                        src="https://image"
                        alt="About Us"
                    />
                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 w-full">
                        {[
                            { value: "3.5+", label: "Experience" },
                            { value: "23", label: "Challenges" },
                            { value: "830+", label: "Positive Reviews" },
                            { value: "100K+", label: "Trusted Students" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-[#44448E] text-white p-6 rounded-lg text-center shadow-lg transform transition duration-300 hover:scale-105"
                            >
                                <h4 className="text-3xl font-bold">{stat.value}</h4>
                                <p className="text-sm opacity-90">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;
