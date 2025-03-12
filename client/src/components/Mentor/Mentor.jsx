import React from 'react'

export default function Mentor() {
  return (
    <div className='w-full'>
      <div className='m-auto flex w-full max-w-[1440px] px-5 lg:py-20 md:py-16 py-10 '>
        <div className='lg:grid lg:grid-cols-2 gap-5 items-center lg:space-y-0 space-y-10'>
          <div className='space-y-5 flex flex-col lg:items-start items-center'>
            <h1 className='font-[mulish] lg:text-5xl md:text-4xl text-3xl font-bold'>About Founder</h1>
            <p className='font-[mulish] md:text-base text-sm text-center lg:text-left'>
              Rajat, the founder of Mentoreshwar, comes from a typical Indian middle-class household,
              where financial constraints were always a reality. Just like many others in his position,
              he chose to pursue Chartered Accountancy (CA) because it was more affordable than other courses available
              However, the journey was far from easy. Throughout his CA studies, Rajat faced numerous challenges, especially the lack of mentorship and guidance, which made the journey even more daunting. He often found himself struggling with doubts, seeking answers that were hard to come by.
              This experience ignited a deep desire within him to help others who were going through similar challenges. He understood the pain and frustration that came with a lack of direction, which led him to the idea of Mentoreshwar (formerly known as "The Guiding Light"). His mission was simple — to provide the guidance and support that he once wished for, helping students navigate their academic and professional journeys with confidence.
              Rajat became a Chartered Accountant in November 2024, but his passion extends beyond numbers. He is also a content creator who loves to engage with people, understand their struggles, and offer valuable insights and solutions. His ability to connect with individuals and provide mentorship stems from his genuine desire to help others succeed.
              In addition to his work with Mentoreshwar, Rajat also founded Teens Sutra, an initiative aimed at helping teens battle mental health challenges, especially depression. Through his guidance, he has helped over 10 students overcome their struggles and find hope again.
              With his deep understanding of both the academic and emotional hurdles that students face, Rajat is dedicated to creating a platform where students not only excel academically but also grow personally. Mentoreshwar is a reflection of his unwavering commitment to making a difference in the lives of aspiring professionals

            </p>
            <div className="flex justify-center lg:justify-start">
              <a href="" className="bg-[#44448e] text-white font-[mulish] lg:text-xl text-base rounded-full px-8 py-4 w-fit">More About Us</a>
            </div>
          </div>
          <div>
            <img src='' className='bg-yellow-100 w-full h-96 border-0' />
          </div>
        </div>
      </div>
    </div>
  );
}
