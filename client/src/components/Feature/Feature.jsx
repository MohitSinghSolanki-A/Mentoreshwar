import React from "react";
import { FaBrain, FaCalendar, FaUsers, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";

function Feature({ icon, title, description }) {
  return (
    <div className="content-box p-6 border rounded-xl py-10  text-center shadow-lg transition-transform transform hover:scale-105 bg-[#474773] text-white">
      <span className="flex justify-center animate-bounce">
        {React.createElement(icon, { className: "text-5xl text-white" })}
      </span>
      <h3 className="font-[mulish] text-2xl mt-4 font-semibold drop-shadow-md">
        {title}
      </h3>
      <p className="font-[mulish] text-sm mt-4 drop-shadow-md">
        {description}
      </p>
    </div>
  );
}

export default function FeatureSection() {
  return (
    <div className="w-full bg-[#f8f9fa] py-20">
      <div className="m-auto w-full max-w-[1440px] px-5">
        <div className="flex justify-center lg:text-5xl md:text-4xl text-3xl font-[mulish] font-bold text-[#050505] mb-10 animate-fade-in">
          Our Features
        </div>
        <div className="feature-points flex md:flex-row flex-col justify-center gap-8 flex-wrap animate-fade-up">
          <Feature
            icon={FaBrain}
            title="Smart Mentor-Mentee Matching"
            description="AI-driven pairing based on skills, goals & availability."
          />
          <Feature
            icon={FaCalendar}
            title="One-Click Session Booking"
            description="Seamless scheduling with calendar sync & reminders."
          />
          <Feature
            icon={FaUsers}
            title="Interactive Q&A & Discussion Forums"
            description="Real-time engagement with mentors & peers."
          />
          <Feature
            icon={FaChalkboardTeacher}
            title="Webinars & Knowledge Hub"
            description="Recorded sessions, blogs & career resources in one place."
          />
          <Feature
            icon={FaBriefcase}
            title="Articleship & Job Board"
            description="Exclusive openings for CA students & professionals."
          />
        </div>
      </div>
    </div>
  );
}