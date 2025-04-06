"use client"


// pages/contact.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Send, Mail, Sun, Moon } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bullets, setBullets] = useState([]);
  const pageRef = useRef(null);
  const bulletIdRef = useRef(0);

  // Handle theme change on mount
  useEffect(() => {
    // Check system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  const createBullet = (e) => {
    if (!pageRef.current) return;
    
    const rect = pageRef.current.getBoundingClientRect();
    const startX = rect.width / 2;
    const startY = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate angle to shoot towards cursor
    const angle = Math.atan2(mouseY - startY, mouseX - startX);
    
    // Calculate x and y velocity components based on angle
    const speed = 15;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    const newBullet = {
      id: bulletIdRef.current++,
      x: startX,
      y: startY,
      vx,
      vy,
      rotation: angle * (180 / Math.PI),
      opacity: 1
    };
    
    setBullets(prevBullets => [...prevBullets, newBullet]);
    
    // Remove bullets after they've traveled
    setTimeout(() => {
      setBullets(prevBullets => prevBullets.filter(b => b.id !== newBullet.id));
    }, 2000);
  };

  // Animation frame for bullet movement
  useEffect(() => {
    if (bullets.length === 0) return;
    
    const moveInterval = setInterval(() => {
      setBullets(prevBullets =>
        prevBullets.map(bullet => ({
          ...bullet,
          x: bullet.x + bullet.vx,
          y: bullet.y + bullet.vy,
          opacity: bullet.opacity - 0.01
        }))
      );
    }, 16);
    
    return () => clearInterval(moveInterval);
  }, [bullets]);

  return (
    <div
        
      ref={pageRef}
      onClick={createBullet}
      className={`min-h-screen relative dark:bg-[#121212] overflow-hidden ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      } transition-colors duration-300`}
    >
      <Head>
        <title>Contact MaxMail</title>
        <meta name="description" content="Contact the MaxMail team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Theme Toggle Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent bullet creation
          toggleTheme();
        }}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-opacity-70 backdrop-blur-sm"
      >
        {isDarkMode ? 
          <Sun className="text-yellow-400 h-6 w-6" /> : 
          <Moon className="text-blue-800 h-6 w-6" />
        }
      </button>

      {/* Storm Effect Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lightning flashes */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-blue-500' : 'bg-yellow-300'} opacity-0 animate-lightning`}></div>
        
        {/* Moving clouds */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div 
              key={idx}
              className={`absolute ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full opacity-50 cloud-${idx % 3}`}
              style={{
                width: `${100 + idx * 30}px`,
                height: `${60 + idx * 20}px`,
                top: `${idx * 15}%`,
                left: `${idx * 10}%`,
                animationDelay: `${idx * 0.5}s`,
                filter: 'blur(8px)'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Email Bullets */}
      {bullets.map(bullet => (
        <div
          key={bullet.id}
          className="absolute z-20 bullet-animation"
          style={{
            left: `${bullet.x}px`,
            top: `${bullet.y}px`,
            transform: `rotate(${bullet.rotation}deg)`,
            opacity: bullet.opacity
          }}
        >
          <Mail className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
      ))}

      {/* Gun (hidden but functional) */}
      <div className="hidden gun-position"></div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl dark:text-white font-bold mb-4">Get in Touch</h1>
          <p className={`text-xl dark:text-white ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Contact Form with Storm Background */}
          <div className={`relative rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'
          } backdrop-blur-md shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]`}>
            
            {/* Storm background specifically for the form */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`storm-background ${isDarkMode ? 'storm-dark' : 'storm-light'}`}></div>
            </div>
            
            {/* Form Success Message */}
            {formSubmitted ? (
              <div className="text-center py-8 animate-fadeIn">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDarkMode ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'
                }`}>
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} action="https://usebasin.com/f/6dca096afbf8" method="POST" className="relative dark:bg-slate-100 shadow-sm z-10 space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block mb-2 text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg focus:ring-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className={`block mb-2 text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg focus:ring-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                
                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block mb-2 text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg resize-none focus:ring-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                    placeholder="Your message here..."
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-px ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Send className="w-5 h-5 mr-2" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className={`py-8 text-center dark:text-white ${isDarkMode ? 'text-gray-400' : 'text-black'}`}>
        <p>© 2025 MaxMail. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        /* Lightning animation */
        @keyframes lightning {
          0%, 100% { opacity: 0; }
          0.5%, 0.7% { opacity: 0.3; }
          0.6% { opacity: 0.5; }
          1.5%, 1.7% { opacity: 0.3; }
          1.6% { opacity: 0.5; }
          5%, 5.2% { opacity: 0.3; }
          5.1% { opacity: 0.7; }
          10% { opacity: 0; }
        }
        
        .animate-lightning {
          animation: lightning 10s infinite;
        }
        
        /* Cloud animations */
        @keyframes cloud-move-0 {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }
        
        @keyframes cloud-move-1 {
          0% { transform: translateX(110%); }
          100% { transform: translateX(-10%); }
        }
        
        @keyframes cloud-move-2 {
          0% { transform: translateX(-20%); }
          100% { transform: translateX(120%); }
        }
        
        .cloud-0 {
          animation: cloud-move-0 40s linear infinite;
        }
        
        .cloud-1 {
          animation: cloud-move-1 50s linear infinite;
        }
        
        .cloud-2 {
          animation: cloud-move-2 60s linear infinite;
        }
        
        /* Storm background animation */
        @keyframes storm-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        .storm-background {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          animation: storm-pulse 8s ease-in-out infinite;
        }
        
        .storm-dark {
          background-color: rgba(30, 41, 59, 0.8);
        }
        
        .storm-light {
          background-color: rgba(225, 225, 225, 0.8);
        }
        
        /* Bullet animation */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .bullet-animation {
          animation: spin 1s linear infinite;
          filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.5));
        }
        
        /* Fade in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}