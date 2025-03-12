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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget purus
                            lectus viverra in semper nec pretium mus. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. Eget purus lectus viverra in
                            semper nec pretium mus.
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