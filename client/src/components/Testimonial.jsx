import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonial() {
  const testimonials = [
    { id: 1, name: "John Doe", text: "Amazing service! Highly recommended!", role: "CEO, Tech Corp" },
    { id: 2, name: "Jane Smith", text: "Best decision we ever made for our business.", role: "Founder, StartUp" },
    { id: 3, name: "Michael Johnson", text: "Exceptional quality and support. Will use again.", role: "Manager, CompanyX" },
    { id: 4, name: "Sarah Williams", text: "Their expertise helped us scale quickly!", role: "Director, Innovate Inc." },
    { id: 4, name: "Sarah Williams", text: "Their expertise helped us scale quickly!", role: "Director, Innovate Inc." },
    { id: 4, name: "Sarah Williams", text: "Their expertise helped us scale quickly!", role: "Director, Innovate Inc." },
  ];

  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 2);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <div className="bg-[#e0e0ef] lg:py-20 md:py-16 py-10 lg:mt-20 md:mt-16 mt-10">
      <section className="mx-auto px-6 md:px-10 lg:px-20 max-w-[1440px]">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[mulish] text-center text-[#44448E] mb-10">
          What Our Students Say
        </h1>

        <div className="relative overflow-hidden">

          {/* Testimonial Slider */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 50}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full md:w-1/2 px-4 py-6 min-w-[50%]">
                <div className="bg-white rounded-xl px-6 py-6 space-y-3 shadow-lg border-l-4 border-[#44448E]">
                  <p className="text-sm md:text-base font-medium font-[mulish] text-gray-800">
                    "{testimonial.text}"
                  </p>
                  <h3 className="text-lg md:text-xl font-bold font-[mulish] text-[#44448E]">{testimonial.name}</h3>
                  <span className="text-gray-600">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#44448E] text-white p-3 rounded-full shadow-lg transition duration-300 hover:bg-[#36367a]"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#44448E] text-white p-3 rounded-full shadow-lg transition duration-300 hover:bg-[#36367a]"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
