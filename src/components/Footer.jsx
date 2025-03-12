"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const Footer = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
          color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <footer className="relative text-black w-full darck:bg-[#121212] !darck:?bg-white  dark:text-white overflow-hidden px-20">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-blue-300 transition-colors duration-300">home</Link>
              <Link href="/about" className="hover:text-blue-300 transition-colors duration-300">About</Link>
              <Link href="/contact" className="hover:text-blue-300 transition-colors duration-300">Contact us</Link>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">website section</h3>
            <div className="flex flex-col space-y-2">
              <Link href="#hero" className="hover:text-blue-300 transition-colors duration-300">hero section</Link>
              <Link href="#fea" className="hover:text-blue-300 transition-colors duration-300">feature secion</Link>
              <Link href="#faq" className="hover:text-blue-300 transition-colors duration-300">FAQ</Link>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/resources/docs" className="hover:text-blue-300 transition-colors duration-300">Documentation</Link>
              <Link href="/resources/tutorials" className="hover:text-blue-300 transition-colors duration-300">Tutorials</Link>
              <Link href="/resources/faq" className="hover:text-blue-300 transition-colors duration-300">FAQ</Link>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {/* Social icons */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            
            <form className="mt-4">
              <label htmlFor="email" className="block mb-2 text-sm">Subscribe to our newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-2 text-gray-900 bg-white rounded-l-lg focus:outline-none" 
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-r-lg transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} MaxMail. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm hover:text-blue-300 transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-blue-300 transition-colors duration-300">Terms of Service</Link>
              <Link href="/cookies" className="text-sm hover:text-blue-300 transition-colors duration-300">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;