
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedCTA = () => {
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const ctaRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Track mouse position for hover effects
  const handleMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Record click position for ripple effect
  const handleButtonClick = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsActive(!isActive);
    
    // Trigger haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  
  // Particles effect when button is clicked
  const Particles = () => {
    const particles = [];
    const colors = ["#FF5252", "#FFD740", "#40C4FF", "#69F0AE", "#FF4081"];
    
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 80 + 20;
      const x = clickPosition.x + Math.cos(angle) * radius;
      const y = clickPosition.y + Math.sin(angle) * radius;
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 0.2;
      
      particles.push(
        <motion.div
          key={i}
          initial={{ 
            x: clickPosition.x, 
            y: clickPosition.y, 
            opacity: 1, 
            scale: 0 
          }}
          animate={{ 
            x, 
            y, 
            opacity: 0, 
            scale: 1 
          }}
          transition={{ 
            duration: 0.8, 
            delay,
            ease: "easeOut" 
          }}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      );
    }
    
    return particles;
  };

  return (
    <motion.div 
      ref={ctaRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-slate-100 dark:bg-[#121212]"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundSize: "50px 50px",
          }}
          animate={{
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Animated Blob */}
        <motion.div
          className="absolute w-96 h-96 rounded-full filter blur-3xl opacity-30"
          style={{
  
            top: "20%",
            left: "60%",
          }}
          animate={{
            x: isActive ? [-20, 20, -20] : [-10, 10, -10],
            y: isActive ? [-20, 20, -20] : [-10, 10, -10],
            scale: isActive ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(79,70,229,1) 100%",
            bottom: "10%",
            right: "60%",
          }}
          animate={{
            x: isActive ? [20, -20, 20] : [10, -10, 10],
            y: isActive ? [20, -20, 20] : [10, -10, 10],
            scale: isActive ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Headline with text reveal animation */}
        <motion.div
          className="overflow-hidden"
          initial={{ y: 0 }}
          animate={{ y: isActive ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6"
            initial={{ y: 0 }}
            animate={{ y: isActive ? [0, -20, 0] : 0 }}
            transition={{ duration: 0.8 }}
          >
            {isActive ? "You're Amazing!" : "Ready to Be Amazed?"}
          </motion.h2>
        </motion.div>

        {/* Subtitle with staggered text animation */}
        <motion.p 
          className="text-lg md:text-xl text-black dark:text-white mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: [1, 0.8, 1],
            y: isActive ? [0, 5, 0] : 0
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isActive 
            ? "Unleash your potential with our cutting-edge solutions"
            : "Experience the next generation of digital innovation today"}
        </motion.p>
        
        {/* Interactive 3D Button */}
        <div className="relative perspective-1000">
          <motion.button
            ref={buttonRef}
            className="relative overflow-hidden group px-8 py-4 rounded-full text-lg font-medium text-black bg-slate-100 shadow-md"
            style={{ 
              transformStyle: "preserve-3d",
            }}
            whileHover={{ 
              scale: 1.05,
              rotateX: mousePosition.y > 40 ? 5 : -5,
              rotateY: mousePosition.x > 100 ? -5 : 5,
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: isActive 
                ? "0 20px 30px rgba(79, 70, 229, 0.4)" 
                : "0 10px 25px rgba(0, 0, 0, 0.25)"
            }}
            onClick={handleButtonClick}
          >
            {/* Button text */}
            <motion.span
              className="relative text-black z-10 block"
              animate={{ 
                y: isActive ? [0, -20, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {isActive ? "Continue the Experience" : "Click to Experience"}
            </motion.span>
            
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
              style={{
                // filter: "blur(15px)",
                transform: "translateZ(-1px)",
              }}
              animate={{
                opacity: isActive ? 0.8 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Ripple effect on click */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                    backgroundColor: "white",
                    transformOrigin: "center",
                  }}
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: 500, height: 500, x: -250, y: -250, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Particles animation when button is clicked */}
          <AnimatePresence>
            {isActive && <Particles />}
          </AnimatePresence>
        </div>
        
        {/* Animated highlight effect after click */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="dark:bg-white/10 bg-white/10 shadow-lg backdrop-blur-lg rounded-2xl p-6 md:p-8"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                <div className="flex flex-col md:flex-row   items-center gap-6 md:gap-8">
                  <motion.div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 text-black flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  
                  <div className="text-center md:text-left">
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Start Your Journey Now
                    </motion.h3>
                    <motion.p 
                      className="dark:text-gray-300  text-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Join thousands of satisfied customers already using our platform
                    </motion.p>
                  </div>
                  
                  <motion.button
                    className="mt-4 md:mt-0 md:ml-auto px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AnimatedCTA;