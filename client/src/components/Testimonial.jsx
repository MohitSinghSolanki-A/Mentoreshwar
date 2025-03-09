
import './Testimonial.css';

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      text: "Amazing service! Highly recommended!",
      role: "CEO, Tech Corp"
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Best decision we ever made for our business.",
      role: "Founder, StartUp"
    }
  ];

  return (
    <div className='bg-[#e0e0ef]'>
      <section className="container !px-20">
        <h1 className='text-5xl font-bold font-[mulish] text-center mb-12'>What Our Clients Say</h1>
        <div className='grid grid-cols-2 gap-5'>
          {testimonials.map(testimonial => (
            <div className='bg-white rounded-xl px-5 py-5 space-y-2.5'>
              <p className='text-base font-normal font-[mulish]'>"{testimonial.text}"</p>
              <h3 className='text-xl font-bold font-[mulish]'>{testimonial.name}</h3>
              <span>{testimonial.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
