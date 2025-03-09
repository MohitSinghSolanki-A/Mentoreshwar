import React from 'react'
import { FaEnvelope } from "react-icons/fa6";
import './Newsletter.css'

export default function Newsletter() {
  return (
    <div className='container'>
      <div className='bg-[#272757] px-5 py-5 grid grid-cols-2 rounded-3xl items-center gap-5'>
        <div className='px-20 py-5 space-y-2.5'>
          <h1 className='flex gap-5 text-4xl font-bold !font-[mulish] items-center text-white'><span className='item-align animated-icon !text-white'><FaEnvelope style={{ transform: "rotate(25deg)" }} /></span>Subscribe for Newsletter</h1>
          <p className='text-white text-base font-[mulish]'>Grow Your Business with Our SEO Agency</p>
        </div>
        <div className='px-20 py-5 space-y-2.5'>
          <p className='text-base text-white'>Stay updated with our latest news and offers!</p>
          <form class="w-full relative">
            <input type="email" placeholder="Enter your email" class="!w-full border border-[#6868ac] px-5 py-5 text-white rounded-xl" />
            <button type="submit" class="subscribe-button !bg-[#44448e] !text-white font-[mulish] !text-xl !rounded-full px-5">Subscribe Now!</button>
          </form>
        </div>
      </div>
    </div>
  )
}
