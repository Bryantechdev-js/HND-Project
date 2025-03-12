"use client"


import "./globals.css";

import { useEffect, useRef } from 'react';

const CompanyHistorySection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Company milestones data
  const milestones = [
    {
      id: 1,
      year: '2018',
      title: 'Foundation',
      description: 'MaxMail was founded with a vision to revolutionize email communication.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 2,
      year: '2019',
      title: 'First Launch',
      description: 'The beta version of MaxMail launched with core features and an initial user base of 1,000 customers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      )
    },
    {
      id: 3,
      year: '2020',
      title: 'Rapid Growth',
      description: 'MaxMail reached 100,000 users and expanded our team to 50 employees worldwide.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 4,
      year: '2021',
      title: 'Security Innovation',
      description: 'Introduced end-to-end encryption and advanced threat protection, setting new industry standards.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: 5,
      year: '2022',
      title: 'Enterprise Solutions',
      description: 'Launched MaxMail Enterprise, serving our first Fortune 500 clients with tailored solutions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 6,
      year: '2023',
      title: 'Global Expansion',
      description: 'Opened offices in 5 new countries and reached 1 million active users worldwide.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 7,
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered email features, automating complex tasks and increasing productivity.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 8,
      year: '2025',
      title: 'The Future',
      description: 'Continuing to innovate and reshape the future of communication technology.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    }
  ];
  
  useEffect(() => {
    // Observer for timeline scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the section title and intro
            const title = sectionRef.current.querySelector('.history-title');
            title.classList.remove('opacity-0', '-translate-y-6');
            title.classList.add('opacity-100', 'translate-y-0');
            
            // Start timeline animation
            startTimelineAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Function to animate timeline milestones
    const startTimelineAnimation = () => {
      const milestoneElements = timelineRef.current.querySelectorAll('.milestone');
      const connectingLines = timelineRef.current.querySelectorAll('.connecting-line');
      
      // Animate milestones with delay
      milestoneElements.forEach((milestone, index) => {
        setTimeout(() => {
          milestone.classList.remove('opacity-0', 'scale-90');
          milestone.classList.add('opacity-100', 'scale-100');
          
          // Add particles for this milestone
          createParticles(milestone);
          
          // Animate connecting line (if it exists)
          if (connectingLines[index]) {
            setTimeout(() => {
              connectingLines[index].classList.add('active');
            }, 200);
          }
        }, 500 * index);
      });
    };
    
    // Function to create particles around milestone
    const createParticles = (milestone) => {
      const particleCount = 5;
      const container = milestone.querySelector('.particles-container');
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add(
          'absolute',
          'w-1',
          'h-1',
          'rounded-full',
          'bg-blue-400',
          'animate-ping'
        );
        
        // Random position around milestone node
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 20 + 30; // 30-50px from center
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        // Random animation duration
        const duration = Math.random() * 2 + 1; // 1-3s
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 0.5;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
      }
    };
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Horizontal scroll handling for timeline on desktop
  useEffect(() => {
    const handleTimelineScroll = () => {
      if (window.innerWidth < 768 || !timelineRef.current) {
        return; // Skip on mobile view
      }
      
      const scrollContainer = timelineRef.current;
      
      // Detect when timeline is in view
      const rect = scrollContainer.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        // Calculate how far scrolled down the page
        const scrollPercentage = Math.min(
          1,
          Math.max(0, (window.innerHeight - rect.top) / window.innerHeight)
        );
        
        // Apply horizontal scroll based on vertical scroll
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollContainer.scrollLeft = maxScroll * scrollPercentage;
      }
    };
    
    window.addEventListener('scroll', handleTimelineScroll);
    
    return () => {
      window.removeEventListener('scroll', handleTimelineScroll);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 dark:bg-[#121212] dark:text-white lg:px-8 bg-slate-100 text-white relative overflow-hidden"
    >
      {/* Background particles/dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="history-title text-4xl dark:text-white sm:text-5xl lg:text-6xl font-bold mb-4 text-black">
            Our Journey
          </h2>
          <p className="max-w-2xl mx-auto dark:text-white  mb-8 opacity-0 -translate-y-6 transition-all duration-700 delay-300 ease-out text-black">
            From our humble beginnings to industry leadership, explore the key milestones that have shaped MaxMail's evolution.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto"></div>
        </div>
        
        {/* Timeline - Desktop Horizontal, Mobile Vertical */}
        <div className="relative">
          {/* Desktop Timeline (Horizontal) */}
          <div 
            ref={timelineRef}
            className="hidden md:flex overflow-x-auto pb-12 pt-8 items-center scrollbar-hide md:space-x-16 lg:space-x-24"
            style={{ scrollBehavior: 'smooth' }}
          >
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex-shrink-0 relative">
                {/* Connecting line */}
                {index < milestones.length - 1 && (
                  <div className="connecting-line absolute top-6 right-0 h-0.5 bg-gray-700 w-16 lg:w-24 transform translate-x-full origin-left scale-x-0 transition-transform duration-1000" />
                )}
                
                {/* Milestone */}
                <div className="milestone opacity-0 scale-90 transition-all duration-500 ease-out w-64 flex flex-col items-center">
                  {/* Year */}
                  <div className="mb-4 text-xl dark:text-white font-bold text-black">{milestone.year}</div>
                  
                  {/* Icon and particles container */}
                  <div className="relative mb-4">
                    <div className="particles-container absolute inset-0"></div>
                    <div className="w-12 h-12 rounded-full dark:bg-slate-300 bg-gray-800 border-2 border-blue-400 flex items-center justify-center text-blue-400 z-10 relative">
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg text-black dark:text-white font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-sm text-black dark:text-white">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline (Vertical) */}
          <div className="md:hidden space-y-12">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Vertical line */}
                {index < milestones.length - 1 && (
                  <div className="connecting-line absolute top-16 left-7 w-0.5 h-12 bg-gray-700 transform origin-top scale-y-0 transition-transform duration-1000"></div>
                )}
                
                {/* Milestone */}
                <div className="milestone opacity-0 scale-90 transition-all duration-500 ease-out flex items-start">
                  {/* Icon and particles container */}
                  <div className="relative mr-4">
                    <div className="particles-container absolute inset-0"></div>
                    <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-blue-400 flex items-center justify-center text-blue-400 z-10 relative">
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="text-lg font-bold text-blue-400 mb-1">{milestone.year}</div>
                    <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistorySection;