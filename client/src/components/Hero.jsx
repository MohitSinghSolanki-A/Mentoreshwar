import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Hero.css"; // Import styles

export default function Hero() {
  return (
    <>
      <div className="bg-[#0e0e27] w-full">
        <div className="m-auto flex justify-between w-full max-w-[1440px]">
          <div className="lg:grid lg:grid-cols-2 gap-5 items-center lg:p-20 md:p-10 px-4 py-10 lg:space-y-0 space-y-10">
            <div className="space-y-5">
              <h1 className="font-[mulish] text-white font-bold xl:text-5xl text-3xl text-center lg:text-left">Experience Media Like Never Before</h1>
              <p className="font-[mulish] md:text-base text-sm text-white text-center lg:text-left">
                Enjoy award-winning stereo beats with wireless listening freedom and sleek,
                streamlined with premium padded and delivering first-rate playback.
              </p>
              <div className="mt-5 flex justify-center lg:justify-start">
                <a href="" className="bg-[#44448e] text-white font-[mulish] lg:text-xl text-base rounded-full px-8 py-4 w-fit">Our Products <span>→</span></a>
              </div>
            </div>

            <div className="flex justify-center">
              <img src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="Headphones" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
