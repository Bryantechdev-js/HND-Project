"use client"


import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, GlobeAltIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const MaxMailUniqueSection = () => {
  const [animationStarted, setAnimationStarted] = useState(false);


  useEffect(() => {
    // Start animation after component mounts
    setAnimationStarted(true);
    
    // Reset animation periodically
    const intervalId = setInterval(() => {
      setAnimationStarted(false);
      setTimeout(() => setAnimationStarted(true), 100);
    }, 10000); // Reset every 10 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  // Network node positions
  const nodes = [
    { x: '10%', y: '20%', delay: 0 },
    { x: '25%', y: '65%', delay: 0.4 },
    { x: '40%', y: '30%', delay: 0.8 },
    { x: '60%', y: '70%', delay: 1.2 },
    { x: '75%', y: '25%', delay: 1.6 },
    { x: '90%', y: '60%', delay: 2 },
  ];

  // Path points for the envelope to follow
  const pathPoints = [
    { x: '0%', y: '40%' },
    { x: '20%', y: '35%' },
    { x: '40%', y: '45%' },
    { x: '60%', y: '40%' },
    { x: '80%', y: '50%' },
    { x: '100%', y: '45%' },
  ];

  const gets=()=>{
    console.log(card1Ref.current.value,card2Ref.current.value,card3Ref.current.value)
  }



  return (
    <section className="relative py-16 px-4 dark:bg-[#121212] dark:text-white overflow-hidden bg-white text-black">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0,_rgba(99,102,241,0)_50%)]"></div>
      </div>

      {/* Network Nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            className="absolute h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-300"
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={animationStarted ? { 
              scale: [0.8, 1.3, 0.8], 
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                '0 0 0 rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(59, 130, 246, 0.8)',
                '0 0 0 rgba(59, 130, 246, 0.4)'
              ]
            } : {}}
            transition={{ 
              duration: 3, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: node.delay
            }}
          />
        ))}

        {/* Connecting Lines */}
        {nodes.slice(0, -1).map((node, index) => (
          <React.Fragment key={`line-${index}`}>
            <div 
              className="absolute h-px bg-blue-300 opacity-40 transform origin-left"
              style={{
                left: node.x,
                top: node.y,
                width: '15%',
                transformOrigin: 'left center'
              }}
            ></div>
          </React.Fragment>
        ))}
      </div>

      {/* Data Streams / Glowing Trails */}
      {pathPoints.slice(0, -1).map((point, index) => (
        <motion.div
          key={`trail-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0"
          style={{
            left: point.x,
            top: point.y,
            width: '20%',
            transformOrigin: 'left center'
          }}
          initial={{ opacity: 0, width: '0%' }}
          animate={animationStarted ? { 
            opacity: [0, 0.7, 0],
            width: ['0%', '20%', '20%']
          } : {}}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity,
            delay: index * 0.5,
            repeatDelay: 2
          }}
        />
      ))}

      {/* Moving Envelope */}
      <motion.div
        className="absolute flex items-center justify-center h-8 w-8 md:h-12 md:w-12"
        style={{ top: '40%' }}
        initial={{ x: '-5%', opacity: 0 }}
        animate={animationStarted ? { 
          x: ['0%', '20%', '40%', '60%', '80%', '100%'],
          y: ['40%', '35%', '45%', '40%', '50%', '45%'],
          opacity: [0, 1, 1, 1, 1, 0]
        } : {}}
        transition={{ 
          duration: 8, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <div className="relative">
          <EnvelopeIcon className="h-8 w-8 md:h-12 md:w-12 black" />
          <motion.div
            className="absolute -inset-1 rounded-full bg-blue-400 -z-10"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Makes <span className="text-black dark:text-white">MaxMail</span> Unique
          </motion.h2>
          <motion.p 
            className="text-lg text-black max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of email communication with innovative features 
            designed for global reach and unparalleled performance.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <GlobeAltIcon className="h-10 w-10 text-black" />,
              title: "Global Network",
              description: "Our distributed server network ensures lightning-fast delivery anywhere in the world.",
              delay: 0.4
            },
            {
              icon: <BoltIcon className="h-10 w-10 text-black" />,
              title: "Instant Delivery",
              description: "Advanced routing algorithms deliver your emails in milliseconds, not minutes.",
              delay: 0.6
            },
            {
              icon: <ShieldCheckIcon className="h-10 w-10 text-black" />,
              title: "Enterprise Security",
              description: "End-to-end encryption and advanced threat detection keep your communications safe.",
              delay: 0.8
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-slate-100 backdrop-blur-sm rounded-xl p-6 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.5)' }}
            >
              <div className="bg-blue-900/50 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button className="by bg-blue-500  text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg dark:bg-black hover:shadow-md hover:shadow-blue-500/50">
            Experience MaxMail Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MaxMailUniqueSection;