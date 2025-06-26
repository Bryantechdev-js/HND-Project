"use client"

// components/Testimonials.js
import React, { useState } from 'react';

const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO at TechCorp',
    message:
      'MaxMail has transformed the way we communicate internally and externally. The seamless integration with our existing systems and the robust security features make it an invaluable tool for our business.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    title: 'Marketing Director at InnoTech',
    message:
      'We’ve been using MaxMail for a few months, and we couldn’t be happier with the reliability and speed. Our email deliverability has improved significantly, and the spam filters are excellent!',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Robert White',
    title: 'Founder of StartUp Solutions',
    message:
      'I love how easy it is to manage multiple email accounts in one place. MaxMail has reduced our email-related issues and allows us to focus on what really matters—growing our business.',
    image: 'https://via.placeholder.com/150',
  },
];

const Testimonials = () => {
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  

  // Function to handle ripple effect
  const createRipple = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const size = Math.max(width, height);
    const x = e.clientX - left - size / 2;
    const y = e.clientY - top - size / 2;
    setRipplePosition({ x, y });
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-[#121212] px-20 dark:bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl dark:text-white font-bold text-center text-gray-800 mb-10">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl overflow-hidden"
              onMouseDown={createRipple} // Activate ripple effect
            >
              {/* Ripple Effect */}
              <span
                className="absolute w-32 h-32 bg-blue-500 opacity-40 rounded-full animate-ripple"
                style={{
                  left: ripplePosition.x + 'px',
                  top: ripplePosition.y + 'px',
                }}
              ></span>

              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
                />
              </div>
              <p className="text-lg italic text-gray-600 mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="font-semibold text-xl text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
