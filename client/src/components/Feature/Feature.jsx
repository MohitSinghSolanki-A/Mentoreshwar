import React from "react";
import { FaStopwatch, FaCalendarDays, FaHeadset } from "react-icons/fa6";
import './Feature.css'

function Feature({ icon: Icon, title, description }) {
  return (
    <div className="content-box p-4">
      <span className="icon-box">
        <Icon className="text-2xl" /> {/* Dynamic Icon */}
      </span>
      <h3 className="font-[mulish] text-2xl mt-4 font-semibold">{title}</h3>
      <p className="font-[mulish] text-sm mt-4">{description}</p>
    </div>
  );
}

export default function FeatureSection() {
  return (

    <div className="feature-container">
      <h1 className="flex justify-center text-5xl font-bold font-[mulish]">Our Features</h1>
      <div className="feature-points flex justify-center gap-5 !mt-8">
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

  );
}
