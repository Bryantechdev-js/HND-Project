"use client"

// components/MissionSection.jsx
import { useEffect, useRef } from 'react';

const MissionSection = () => {
  const missionRef = useRef(null);
  const particlesContainerRef = useRef(null);
  
  useEffect(() => {
    // Observer for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', '-translate-x-12');
            entry.target.classList.add('opacity-100', 'translate-x-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe mission content
    if (missionRef.current) {
      observer.observe(missionRef.current);
    }
    
    // Create particles
    if (particlesContainerRef.current) {
      // Create fewer particles on mobile for better performance
      const particleCount = window.innerWidth < 768 ? 25 : 50;
      for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainerRef.current);
      }
    }
    
    // Handle window resize for responsive particles
    const handleResize = () => {
      if (particlesContainerRef.current) {
        // Clear existing particles
        particlesContainerRef.current.innerHTML = '';
        
        // Create new particles appropriate for current screen size
        const particleCount = window.innerWidth < 768 ? 25 : 50;
        for (let i = 0; i < particleCount; i++) {
          createParticle(particlesContainerRef.current);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (missionRef.current) {
        observer.unobserve(missionRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Function to create a single particle
  const createParticle = (container) => {
    const particle = document.createElement('div');
    particle.classList.add(
      'absolute', 
      'rounded-full', 
      'bg-white', 
      'bg-opacity-60', 
      'pointer-events-none'
    );
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size (smaller on mobile)
    const isSmallScreen = window.innerWidth < 768;
    const size = isSmallScreen ? 
      (Math.random() * 2 + 1) : // Smaller on mobile
      (Math.random() * 4 + 1);  // Larger on desktop
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Random speed (slower on mobile)
    const speedFactor = isSmallScreen ? 0.3 : 0.5;
    const speedX = (Math.random() - 0.5) * speedFactor;
    const speedY = (Math.random() - 0.5) * speedFactor;
    
    // Set styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    // Animate particle
    let x = posX;
    let y = posY;
    
    const moveParticle = () => {
      x += speedX;
      y += speedY;
      
      // Boundary check
      if (x < 0) x = 100;
      if (x > 100) x = 0;
      if (y < 0) y = 100;
      if (y > 100) y = 0;
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      requestAnimationFrame(moveParticle);
    };
    
    moveParticle();
  };
  
  return (
    <section className="relative min-h-screen w-full flex items-center dark:bg-[#121212] dark:text-white justify-center bg-slate-100 text-black overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Particles container */}
      <div ref={particlesContainerRef} className="absolute inset-0 z-10"></div>
      
      {/* Content container */}
      <div className="max-w-6xl w-full mx-auto relative z-20">
        <div 
          ref={missionRef} 
          className="max-w-2xl mx-auto lg:mx-0 opacity-0 -translate-x-12 transition-all duration-1000 ease-in-out"
        >
          <h2 className="text-4xl dark:text-white sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black">
            Our Mission
          </h2>
          
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 sm:mb-8"></div>
          
          <p className="text-base sm:text-lg dark:text-white lg:text-xl leading-relaxed mb-4 sm:mb-6 text-black">
            At MaxMail, we're on a mission to revolutionize how the world communicates. 
            We believe in creating seamless, secure, and lightning-fast email experiences 
            that empower individuals and businesses to connect without limitations.
          </p>
          
          <p className="text-base sm:text-lg lg:text-xl dark:text-white leading-relaxed text-black">
            Every day, we strive to build technology that brings people closer together, 
            making communication more efficient, more intuitive, and more impactful.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;