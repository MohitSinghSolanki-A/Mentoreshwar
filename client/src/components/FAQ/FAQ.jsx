import './FAQ.css';
import { useState } from "react";
import { FaCircleChevronUp, FaCircleChevronDown, FaQ } from "react-icons/fa6";

const faqs = [
  { question: "Why is the moon sometimes out during the day?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Why is the sky blue?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Will we ever discover aliens?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "How much does the Earth weigh?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "How do airplanes stay up?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="m-auto flex flex-col justify-center w-full max-w-[1440px] lg:p-20 md:px-10 md:py-16 px-5 py-10">
      <h2 className="font-[mulish] xl:text-5xl lg:text-4xl text-3xl text-center font-bold">Frequently Asked Questions</h2>
      <div className='mt-10 flex flex-col items-center'>
        {faqs.map((faq, index) => (
          <div key={index} className='mb-6'>
            <div
              onClick={() => toggleAccordion(index)}
              className={`bg-[#44448e] ${openIndex === index ? "active" : ""} text-white flex justify-between items-center lg:w-3xl md:w-2xl w-72 px-2.5 py-5 rounded-xl`}
              aria-expanded={openIndex === index}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleAccordion(index);
                }
              }}
            >
              <span className="flex items-center gap-2"><FaQ />{faq.question}</span>
              <span className="icon">{openIndex === index ? <FaCircleChevronUp /> : <FaCircleChevronDown />}</span>
            </div>
            {openIndex === index && (
              <div
                className={`transition-all lg:w-3xl md:w-2xl w-72 duration-300 ease-in-out ${openIndex === index ? "max-h-[1000px] p-4" : "max-h-0 overflow-hidden"
                  }`}
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
