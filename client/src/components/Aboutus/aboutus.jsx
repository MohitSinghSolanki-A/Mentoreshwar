import React from "react";
import videoSrc from "../../assets/aboutusvido.mp4"; // Replace with your actual video path

const AboutUs = () => {
    return (

        <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#44448E] text-center">
                About Us
            </h1>
            <div className="w-full flex flex-col md:flex-row items-center gap-10">

                <div className="md:w-1/2 text-center md:text-left">
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
                        But we don’t stop at just academics. We believe that true success comes from holistic development,
                        which is why we also offer expert mentorship across various fields. Our mentors are seasoned professionals with years of industry experience,
                        ready to guide you through your academic journey, personal development, and career decisions. Whether you need guidance on complex topics,
                        or career advice, our mentors are here to support you every step of the way
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed text-lg">
                        In addition to academic support and mentorship, Mentoreshwar offers a range of courses aimed at enhancing your professional development.
                        These courses are designed to help you stay ahead in an ever-evolving industry,
                        equipping you with the skills you need to thrive in the competitive world of finance and accounting.
                    </p>

                </div>

                {/* Right Side - Video & Stats */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <video
                        className="w-full max-w-lg md:max-w-xl h-auto object-cover"
                        src={videoSrc}
                        autoPlay
                        muted
                        playsInline
                        poster="../../assets/video-poster.jpg"
                    >
                        Your browser does not support the video tag.
                    </video>



                </div>
            </div>
        </div>
    );
};

export default AboutUs;
