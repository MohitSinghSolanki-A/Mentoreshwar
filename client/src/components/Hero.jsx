import React from "react";
import logo from "../assets/homelogo3.png"

export default function Hero() {
  return (
    <>
      <div className="bg-[#0e0e27] w-full">
        <div className="m-auto flex justify-between w-full max-w-[1440px]">
          <div className="lg:grid lg:grid-cols-2 gap-5 items-center lg:p-20 md:p-10 px-4 py-10 lg:space-y-0 space-y-10">
            <div className="space-y-5">
              <h1 className="font-![Mulish] text-white font-bold xl:text-5xl text-3xl text-center lg:text-left">
                Excel in Your CA Journey with Expert Guidance
              </h1>
              <p className="font-![Mulish] md:text-base text-sm text-white text-center lg:text-left">
                Get personalized mentorship, top-tier study materials, and real-world guidance
                from industry professionals to crack your CA exams with confidence.
              </p>
              <div className="mt-5 flex justify-center lg:justify-start">
                <a href="/contact" className="bg-[#44448e] text-white font-![Mulish] lg:text-xl text-base rounded-full px-8 py-4 w-fit">
                  Get Mentorship <span>→</span>
                </a>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <div className="w-full max-w-[700px]">
                <img
                  src={logo}
                  alt="Headphones"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
