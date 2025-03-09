import React from 'react'
import './Mentor.css'

export default function Mentor() {
  return (
    <div className="mentor-container">
      <div className='grid grid-cols-2 items-center gap-5'>
        <div className='space-y-5 px-10'>
          <h1 className='font-[mulish] text-5xl font-bold'>About Mentor</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
          <button className="!bg-[#44448e] !text-white font-[mulish] !text-xl !rounded-full px-5">More About Us</button>
        </div>
        <div className='mx-auto bg-amber-200'>
          <img src='' alt='' className="image-dummy-box" />
        </div>
      </div>
    </div>
  );
}
