import { useState } from "react";
import { FaCircleChevronUp, FaCircleChevronDown, FaQ } from "react-icons/fa6";

const faqs = [
  { question: "What is Mentoreshwar?", answer: "Mentoreshwar is an education platform dedicated to supporting CA students at all levels through a variety of services, including Test Series, expert mentorship, professional development courses, and Articleship & Industrial Training opportunities. Our mission is to guide and empower students to succeed in their CA journey and beyond." },
  { question: " Who are the mentors at Mentoreshwar?", answer: "Our mentors are experienced professionals and Chartered Accountants from various industries who provide valuable guidance based on their real-world expertise. They are passionate about helping students navigate both academic challenges and career development, ensuring that you receive the best mentorship tailored to your needs." },
  { question: "What kind of Test Series do you offer?", answer: "We offer comprehensive Test Series designed specifically for CA students at all levels. Our tests are created by experts to ensure that they closely mirror the real exam format, helping you practice effectively and assess your preparedness. These test series cover all subjects and provide in-depth analysis to help you identify areas for improvement." },
  { question: "How can I sign up for Mentoreshwar's courses and mentorship programs?", answer: "You can sign up for our courses and mentorship programs directly through our website. Simply choose the services you are interested in, fill out the registration form, and gain immediate access to the resources, mentorship sessions, and support tailored to your needs." },
  { question: "Do you offer any courses for professional development?", answer: "Yes! At Mentoreshwar, we offer a variety of professional development courses aimed at helping CA students and young professionals sharpen their skills. These courses cover areas like communication, leadership, and industry-specific knowledge, equipping you with the tools needed to succeed in your career." },
  { question: "How can I find Articleship & Industrial Training opportunities through Mentoreshwar?", answer: "We collaborate with various organizations to provide Articleship and Industrial Training opportunities for CA students. Once you join Mentoreshwar, we will guide you through the process of finding suitable training placements, based on your skills and career goals. Our mentors will also provide you with tips and advice to succeed in these roles." },
  { question: "Who is the founder of Mentoreshwar?", answer: "Mentoreshwar was founded by Rajat, a Chartered Accountant (qualified in Nov 2024) and a passionate content creator. Rajat’s own journey of struggling without mentorship during his CA studies inspired him to create Mentoreshwar, aiming to provide guidance, support, and resources to other aspiring CA students." },
  { question: " Can Mentoreshwar help with mental health challenges?", answer: "Yes, Rajat, the founder of Mentoreshwar, also runs an initiative called Teens Sutra, which supports teens battling mental health issues, particularly depression. Through personalized guidance and support, Rajat has helped over 10 students overcome their struggles. If you’re facing emotional or mental health challenges, Mentoreshwar is here to listen and support you." },
  { question: "What makes Mentoreshwar different from other educational platforms?", answer: "Mentoreshwar stands out by offering a holistic approach to education. We don’t just focus on academics but also on mentorship, career guidance, and personal development. Our commitment to providing real-world support, expert mentorship, and professional opportunities ensures that our students are well-equipped to succeed, both academically and professionally." },
  { question: "How do I contact Mentoreshwar for any queries?", answer: "You can reach us through our contact page on the website, where you'll find options for email, phone, and live chat support. Our team is always ready to assist you with any queries or concerns you may have." },

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
              className={`bg-[#44448e] ${openIndex === index ? "active" : ""} text-white flex justify-between items-center lg:w-3xl md:w-2xl w-full px-2.5 py-5 rounded-xl`}
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
                className={`transition-all lg:w-3xl md:w-2xl w-full duration-300 ease-in-out ${openIndex === index ? "max-h-[1000px] p-4" : "max-h-0 overflow-hidden"
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
