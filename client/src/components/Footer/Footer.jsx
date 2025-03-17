import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='bg-[#0e0e27]'>
      <div className="flex w-full max-w-[1440px] m-auto">
        <footer className="footer-container px-4 md:px-10 py-6 w-full">
          <div className="flex flex-wrap md:flex-nowrap w-full justify-between">
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h1 className="text-white font-bold text-4xl">Mentoreshwar</h1>
              <h2 className='text-xl font-[mulish] text-white'>About Us</h2>
              <p className='text-sm font-[mulish] text-white'>We are dedicated to providing the best services to our customers.</p>
            </div>
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Quick Links</h2>
              <div className='flex flex-col space-y-3'>
                <a href="/" className='text-sm font-[mulish] text-white'>Home</a>
                <a href="/mentorship" className='text-sm font-[mulish] text-white'>Mentorship</a>
                <a href="/aboutus" className='text-sm font-[mulish] text-white'>About Us</a>
                <a href="/contact" className='text-sm font-[mulish] text-white'>Contact Us</a>
                <a href="/job" className='text-sm font-[mulish] text-white'>Opportunities</a>
              </div>
            </div>
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Legal</h2>
              <p className='text-sm font-[mulish] text-white'>Privacy Policy</p>
              <p className='text-sm font-[mulish] text-white'>Terms of use</p>
              <p className='text-sm font-[mulish] text-white'>Refund & Cancellation Policy</p>
            </div>
            <div className="p-5 space-y-3 w-full md:w-auto">
              <h2 className='text-xl font-[mulish] text-white'>Contact Info</h2>
              <p className='text-sm font-[mulish] text-white'>Email: admin@mentoreshwar.com</p>
              <p className='text-sm font-[mulish] text-white'>Phone: (+91) 7738601618</p>
            </div>
          </div>
          <div className='h-px w-full bg-gray-700/60 my-4'></div>
          <div className="p-5 flex flex-col md:flex-row items-center md:justify-between text-white font-[mulish] text-base">
            <p>&copy; 2024 Mentoreshwar. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-white text-xl hover:text-blue-500 transition duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white text-xl hover:text-blue-400 transition duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-white text-xl hover:text-blue-600 transition duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white text-xl hover:text-pink-500 transition duration-300" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
