

export default function Footer() {
  return (
    <div className='bg-[#0e0e27]'>
      <footer className="footer-container px-4 md:px-10 py-6">
        <div className="flex flex-wrap md:flex-nowrap gap-10 w-full justify-between">
          <div className="p-5 space-y-3 w-full md:w-auto">
            <h2 className='text-xl font-[mulish] text-white'>About Us</h2>
            <p className='text-sm font-[mulish] text-white'>We are dedicated to providing the best services to our customers.</p>
          </div>
          <div className="p-5 space-y-3 w-full md:w-auto">
            <h2 className='text-xl font-[mulish] text-white'>Quick Links</h2>
            <div className='flex flex-col space-y-3'>
              <a href="/" className='text-sm font-[mulish] text-white'>Home</a>
              <a href="/mentorship" className='text-sm font-[mulish] text-white'>Metorship</a>
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
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Follow us:</p>
        </div>
      </footer>
    </div>
  );
}
