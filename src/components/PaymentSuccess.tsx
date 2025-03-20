// PaymentSuccess.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';



export default function PaymentSuccess() {
  const [counter, setCounter] = useState(10);
  const router=useRouter()
  

  
  // Auto-redirect countdown
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      // Replace with your actual redirect logic
      console.log("Redirecting to dashboard...");
      router.push("/dashboard")
      // window.location.href = "/dashboard";
    }
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full"
      >
        <div className="text-center">
          {/* Success Icon with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="mx-auto mb-6"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-25"
              />
              <CheckCircle size={80} className="text-green-500 relative z-10" />
            </div>
          </motion.div>
          
          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-6"
          >
            Your transaction has been completed successfully.
          </motion.p>
          
          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">upgrade the plan to get the best from maxmail services</span>
            </div>
          </motion.div>
          
          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-4"
          >
            <button 
              onClick={() => router.push("/dashboard")} 
              className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
            >
              Go to Dashboard
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="ml-2"
              >
                <ArrowRight size={18} />
              </motion.span>
            </button>
          </motion.div>
          
          {/* Secondary Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button 
              onClick={() => router.push("/")} 
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <Home size={16} className="mr-1" />
              Return to Home Page
            </button>
          </motion.div>
          
          {/* Auto-redirect Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-sm text-gray-500"
          >
            Redirecting to dashboard in {counter} seconds
          </motion.div>
        </div>
      </motion.div>
      
      {/* Confetti Animation (appears briefly) */}
      {counter > 7 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20,
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: 360,
                opacity: 0
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute h-2 w-2 rounded-full"
              style={{ 
                backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}