import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/popupaddd.png";

export default function AddpopUp() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                <section className="relative flex flex-col items-center bg-white/90 rounded-lg shadow-2xl w-[90%] max-w-md md:max-w-lg">

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                    >
                        <FaTimes size={20} />
                    </button>

                    {/* Image Section */}
                    <div className="w-full flex justify-center">
                        <img
                            alt="Promo"
                            src={logo}
                            className="w-full h-auto object-cover rounded-t-lg"
                        />
                    </div>

                    {/* Button Section */}
                    <div className="w-full flex justify-center p-4">
                        <a
                            className="bg-black text-white font-bold py-3 px-6 text-center rounded-lg hover:bg-gray-800 transition w-[80%] md:w-2/3"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdZsy5d5DNt0IdGOx0F7Hd2PKWGJOKb264xAEP8xcDI_laf7g/viewform?usp=preview"
                        >
                            Register Now
                        </a>
                    </div>
                </section>
            </div>
        )
    );
}
