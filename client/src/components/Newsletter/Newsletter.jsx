import React from 'react'
import { FaEnvelope } from "react-icons/fa6";
import './Newsletter.css'

export default function Newsletter() {
  return (
    <div className='px-5'>
      <div className='m-auto flex max-w-[1440px] bg-[#272757] rounded-3xl'>
        <div className='grid lg:grid-cols-2 grid-cols-1 items-center gap-5 w-full xl:px-20 xl:py-10 md:p-10 p-5'>
          <div className='space-y-2.5 flex flex-col items-center lg:items-start'>
            <h1 className='flex gap-5 xl:text-4xl md:text-3xl text-2xl font-bold !font-[mulish] items-center text-white'><span className='item-align animated-icon !text-white'><FaEnvelope style={{ transform: "rotate(25deg)" }} /></span>Subscribe for Newsletter</h1>
            <p className='text-white md:text-base text-sm font-[mulish] text-center'>Grow Your Business with Our SEO Agency</p></div>
          <div className='space-y-2.5 flex flex-col'>
            <p className='md:text-base text-sm text-white text-center md:text-left'>Stay updated with our latest news and offers!</p>
            <form class="w-full md:relative">
              <input type="email" placeholder="Enter your email" class="!w-full border border-[#6868ac] md:p-5 p-3.5 text-white rounded-full" />
              <a href="" className="md:absolute lg:top-2.5 md:top-[12px] lg:right-2.5 md:right-4 bg-[#44448e] text-white font-[mulish] lg:text-xl text-base rounded-full px-4 py-2 w-full md:w-fit text-center flex md:mt-0 mt-3.5 justify-center">Subscribe Now!</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
