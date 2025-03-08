import React from "react";

const services = [
    { id: 1, title: "Guidance", description: "Personalized career guidance from experts.", image: "/images/guidance.png" },
    { id: 2, title: "1-on-1 Sessions", description: "Book a private session with mentors.", image: "/images/session.png" },
    { id: 3, title: "Test Series", description: "Prepare with curated test series.", image: "/images/test-series.png" },
    { id: 4, title: "Mock Interviews", description: "Ace interviews with mock sessions.", image: "/images/mock-interview.png" }
];

const MentorshipServices = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Mentorship Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {services.map((service) => (
                    <div key={service.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                        <img src={service.image} alt={service.title} className="w-24 h-24 object-cover mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorshipServices;
