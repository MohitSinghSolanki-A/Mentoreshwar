import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Logo from "../../../src/assets/logo-white.svg";
import { useEffect, useState } from 'react';

export default function Footer() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);
  }, []);
  return (
    <div className='bg-[#0e0e27]'>
      <div className="flex w-full max-w-[1440px] m-auto">
        <footer className="px-4 md:px-10 py-6 w-full">
          <div className="flex flex-wrap md:flex-nowrap w-full justify-between">
            {/* About Us Section */}
            <div className="p-5 space-y-3 w-full md:w-auto">
              <img src={Logo} alt="Mentoreshwar" width={210} />
              <p className='text-sm font-[mulish] text-white'>
                We are dedicated to providing the best services to our customers.
              </p>
            </div>

            {/* Quick Links */}
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Quick Links</h2>
              <div className='flex flex-col space-y-2'>
                <a href="/" className='text-sm font-[mulish] text-white hover:underline'>Home</a>
                <a href="/mentorship" className='text-sm font-[mulish] text-white hover:underline'>Mentorship</a>
                <a href="/aboutus" className='text-sm font-[mulish] text-white hover:underline'>About Us</a>
                <a href="/contact" className='text-sm font-[mulish] text-white hover:underline'>Contact Us</a>
                {isLoggedIn && <a href="/job" className='text-sm font-[mulish] text-white hover:underline'>Opportunities</a>}

              </div>

            </div>

            {/* Legal Section */}
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Legal</h2>
              <div className="flex flex-col space-y-2">
                <a href="/privacy" className='text-sm font-[mulish] text-white hover:underline'>Privacy Policy</a>
                <a href="/terms" className='text-sm font-[mulish] text-white hover:underline'>Terms of Use</a>
                <a href="/refund" className='text-sm font-[mulish] text-white hover:underline'>Refund & Cancellation Policy</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Contact Info</h2>
              <p className='text-sm font-[mulish] text-white'>Email: admin@mentoreshwar.com</p>
              <p className='text-sm font-[mulish] text-white'>Phone: (+91) 7738601618</p>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-gray-700/60 my-4'></div>

          {/* Footer Bottom Section */}
          <div className="p-5 flex flex-col md:flex-row items-center md:justify-between text-white font-[mulish] text-base">
            <p>&copy; 2024 Mentoreshwar. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="https://t.me/The_Mentoreshwar" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-white text-xl hover:text-blue-500 transition duration-300" />
              </a>
              <a href="https://www.youtube.com/@Mentoreshwar" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-white text-xl hover:text-red-400 transition duration-300" />
              </a>
              <a href="https://www.linkedin.com/company/mentoreshwar/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-white text-xl hover:text-blue-600 transition duration-300" />
              </a>
              <a href="https://www.instagram.com/mentoreshwar?igsh=MXh2NXI0Z2NpbHFnMQ==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white text-xl hover:text-pink-500 transition duration-300" />
              </a>
              <a href="https://www.whatsapp.com/channel/0029Vb3gcQjGzzKNLCZaOf0L" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-white text-xl hover:text-green-500 transition duration-300" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
