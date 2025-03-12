"use client"


import { useEffect, useRef } from 'react';

const CoreValuesSection = () => {
  const sectionRef = useRef(null);
  
  // Core values data with icons represented as SVG paths
  const coreValues = [
    {
      id: 'speed',
      title: 'Speed',
      description: 'Lightning-fast email delivery and response times. We believe your time is valuable and every second counts.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Advanced encryption and privacy controls that keep your communications safe from prying eyes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      )
    },
    {
      id: 'reliability',
      title: 'Reliability',
      description: 'Industry-leading uptime and consistent performance you can depend on, day in and day out.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      id: 'intuitive',
      title: 'Intuitive Design',
      description: 'User-friendly interfaces that make communication effortless and enjoyable for everyone.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      )
    }
  ];
  
  useEffect(() => {
    // Observer for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the section title in
            const title = sectionRef.current.querySelector('.values-title');
            title.classList.remove('opacity-0', '-translate-y-6');
            title.classList.add('opacity-100', 'translate-y-0');
            
            // Animate each value card with delay
            const cards = sectionRef.current.querySelectorAll('.value-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-8');
                card.classList.add('opacity-100', 'translate-y-0');
              }, 200 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 dark:bg-[#121212] dark:text-white lg:px-8 bg-white text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="values-title text-4xl dark:text-white sm:text-5xl lg:text-6xl font-bold mb-4 text-black">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto"></div>
        </div>
        
        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div 
              key={value.id}
              className="value-card opacity-0 translate-y-8 dark:text-black transition-all duration-700 ease-out dark:bg-slate-100 dark:shadow-md bg-slate-100   bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-gray-700 group hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {/* Icon - Animation on appearance and hover */}
              <div className="mb-6 text-black   group-hover:text-blue-400 transform transition-all duration-300 ease-in-out group-hover:scale-110">
                {value.icon}
              </div>
              
              {/* Title with hover effect */}
              <h3 className="text-xl text-black  sm:text-2xl font-semibold mb-3 group-hover:text-blue-400 relative">
                {value.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              
              {/* Description */}
              <p className="text-black
              ">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;