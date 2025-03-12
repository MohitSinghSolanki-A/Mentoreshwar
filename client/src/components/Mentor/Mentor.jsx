import React from 'react'

export default function Mentor() {
  return (
    <div className='w-full'>
      <div className='m-auto flex w-full max-w-[1440px] px-5 lg:py-20 md:py-16 py-10 '>
        <div className='lg:grid lg:grid-cols-2 gap-5 items-center lg:space-y-0 space-y-10'>
          <div className='space-y-5 flex flex-col lg:items-start items-center'>
            <h1 className='font-[mulish] lg:text-5xl md:text-4xl text-3xl font-bold'>About Mentor</h1>
            <p className='font-[mulish] md:text-base text-sm text-center lg:text-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
            <div className="flex justify-center lg:justify-start">
              <a href="" className="bg-[#44448e] text-white font-[mulish] lg:text-xl text-base rounded-full px-8 py-4 w-fit">More About Us</a>
            </div>
          </div>
          <div>
            <img src='' className='bg-yellow-100 w-full h-96 border-0' />
          </div>
        </div>
      </div>
    </div>
  );
}
