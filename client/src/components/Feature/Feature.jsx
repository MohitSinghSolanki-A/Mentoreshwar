import React from "react";
import { FaStopwatch, FaCalendarDays, FaHeadset } from "react-icons/fa6";
import './Feature.css';

function Feature({ icon, title, description }) {
  return (
    <div className="content-box p-4 border rounded-xl py-10 border-[#b7b7d9] text-center">
      <span className="flex justify-center">
        {React.createElement(icon, { className: "text-4xl text-[#44448e]" })}
      </span>
      <h3 className="font-[mulish] text-2xl mt-4 font-semibold">{title}</h3>
      <p className="font-[mulish] text-sm mt-4">{description}</p>
    </div>
  );
}

export default function FeatureSection() {
  return (
    <div className="w-full">
      <div className="m-auto w-full max-w-[1440px] px-5 lg:py-20 md:py-16 py-10">
        <div className="flex justify-center lg:text-5xl md:text-4xl text-3xl font-[mulish] font-bold">
          Our Features
        </div>
        <div className="feature-points flex md:flex-row flex-col justify-center gap-5 mt-8">
          <Feature
            icon={FaStopwatch}
            title="Fast Response"
            description="Get quick and efficient service with minimal wait time."
          />
          <Feature
            icon={FaCalendarDays}
            title="Scheduled Assistance"
            description="Book appointments and manage your time effectively."
          />
          <Feature
            icon={FaHeadset}
            title="24/7 Support"
            description="Our team is available round the clock to assist you."
          />
        </div>
      </div>
    </div>
  );
}
