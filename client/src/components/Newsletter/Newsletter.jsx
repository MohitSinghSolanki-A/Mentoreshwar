import React, { useState } from 'react'
import { FaEnvelope } from "react-icons/fa6";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/call/subscribe", { email });
      alert(response.data.message);
    } catch (error) {
      console.error("Subscription Error:", error);
      alert(error.response?.data?.message || "Subscription failed.");
    }
  };

  return (
    <div className='px-5'>
      <div className='m-auto flex max-w-[1440px] bg-[#272757] rounded-3xl'>
        <div className='grid lg:grid-cols-2 grid-cols-1 items-center gap-5 w-full xl:px-20 xl:py-10 md:p-10 p-5'>

          {/* Left Section */}
          <div className='space-y-2.5 flex flex-col items-center lg:items-start'>
            <h1 className='flex gap-5 xl:text-4xl md:text-3xl text-2xl font-bold font-[mulish] items-center text-white'>
              <span className='item-align animated-icon text-white'>
                <FaEnvelope style={{ transform: "rotate(25deg)" }} />
              </span>
              Subscribe for Newsletter
            </h1>
            <p className='text-white md:text-base text-sm font-[mulish] text-center lg:text-left'>
              Let's grow your score
            </p>
          </div>

          {/* Right Section */}
          <div className='space-y-2.5 flex flex-col'>
            <p className='md:text-base text-sm text-white text-center md:text-left'>
              Stay updated with our latest news and offers!
            </p>

            <div className="flex gap-3 items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#6868ac] md:p-5 p-3.5 text-white rounded-full bg-transparent placeholder-white outline-none focus:border-white"
              />
              <button
                onClick={handleSubscribe}
                className="bg-[#44448e] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
