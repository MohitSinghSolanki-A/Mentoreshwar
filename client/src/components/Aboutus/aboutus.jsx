import React from "react";

const AboutUs = () => {
    return (
        <div className="container">
            <div className="flex justify-center items-center py-16 px-4">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
                    <div className="relative w-full lg:w-1/2 flex justify-center">
                        <img
                            className="absolute top-0 left-0 w-16"
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw3.svg"
                            alt="Decoration"
                        />
                        <img
                            className="w-full max-w-md"
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw2.svg"
                            alt="Main Visual"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
                        <p className="text-gray-600">
                            Welcome to Mentoreshwar, your trusted partner in the journey of educational excellence and professional growth. We are dedicated to empowering CA students and professionals through a comprehensive suite of services that cater to their academic, personal, and career development needs.
                            At Mentoreshwar, we understand that the path to becoming a Chartered Accountant is challenging, which is why we offer high-quality Test Series designed to help students at all levels prepare effectively and excel in their exams. Our test series are crafted by experienced professionals, ensuring that you get the most relevant and accurate practice material.
                            But we don’t stop at just academics. We believe that true success comes from holistic development, which is why we also offer expert mentorship across various fields. Our mentors are seasoned professionals with years of industry experience, ready to guide you through your academic journey, personal development, and career decisions. Whether you need guidance on complex topics, or career advice, our mentors are here to support you every step of the way.
                            In addition to academic support and mentorship, Mentoreshwar offers a range of courses aimed at enhancing your professional development. These courses are designed to help you stay ahead in an ever-evolving industry, equipping you with the skills you need to thrive in the competitive world of finance and accounting.
                            To further enhance your learning experience, we also connect you with Articleship and Industrial Training opportunities, enabling you to gain real-world experience and build a strong foundation for your future career.
                            At Mentoreshwar, we are committed to helping you achieve your dreams, providing the resources and support you need to succeed at every stage of your journey. Join us today and take the next step toward a bright, successful future!

                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg">
                                    <img
                                        className="w-12 h-12"
                                        src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/id2.svg"
                                        alt="Icon"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Value</h3>
                                        <p className="text-gray-600 text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/" className="inline-block">
                            <button className="px-6 py-3 bg-[#44448E] text-white font-semibold rounded-lg shadow-md hover:bg-[#272757] transition">
                                Explore our Services
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;