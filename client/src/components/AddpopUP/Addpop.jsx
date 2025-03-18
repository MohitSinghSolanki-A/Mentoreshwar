import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function AddpopUp() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show popup with a delay for better UX
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 500); // Show after 500ms

        return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
                <section className="relative overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-white w-[90%] max-w-lg md:max-w-3xl animate-fade-in">
                    {/* Image Section */}
                    <img
                        alt="Promo"
                        src="https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg"
                        className="h-32 w-full object-cover md:h-full"
                    />

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                    >
                        <FaTimes size={20} />
                    </button>

                    {/* Content Section */}
                    <div className="p-5 text-center sm:p-6 md:col-span-2 lg:p-8 flex flex-col justify-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                            Enhance With those who have been there
                        </p>

                        <h2 className="mt-4 font-black uppercase">
                            <span className="text-4xl sm:text-3xl lg:text-4xl text-black">Fine Experience</span>
                            <span className="mt-2 block text-sm text-gray-500">Come and Join our experts</span>
                        </h2>

                        <a
                            className="mt-6 inline-block w-full bg-black py-3 text-sm font-bold uppercase tracking-widest text-white rounded-lg hover:bg-gray-800 transition"
                            href="#"
                        >
                            Register Now
                        </a>

                        <p className="mt-4 text-xs font-medium uppercase text-gray-400">
                            Limited Seats
                        </p>
                    </div>
                </section>
            </div>
        )
    );
}
