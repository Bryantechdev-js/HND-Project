import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRetry = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`
        bg-white 
        shadow-2xl 
        rounded-2xl 
        p-8 
        max-w-md 
        w-full 
        text-center 
        transform 
        transition-all 
        duration-500 
        ${isAnimating ? 'scale-110 rotate-3' : 'scale-100'}
      `}>
        <div className="relative mb-6">
          <AlertTriangle 
            className="mx-auto text-red-500 animate-bounce" 
            size={80} 
          />
          <div className="absolute top-0 left-0 right-0 -z-10 opacity-20 blur-lg">
            <AlertTriangle 
              className="mx-auto text-red-300" 
              size={80} 
            />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          404 - Oops!
        </h1>
        
        <p className="text-gray-600 mb-6">
          The page you're looking for seems to have wandered off into the digital wilderness.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleRetry}
            className="
              bg-blue-500 
              text-white 
              px-4 
              py-2 
              rounded-full 
              flex 
              items-center 
              space-x-2 
              hover:bg-blue-600 
              transition-colors
              group
            "
          >
            <RefreshCw 
              className="group-hover:animate-spin" 
              size={20} 
            />
            <span>Retry</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="
              bg-green-500 
              text-white 
              px-4 
              py-2 
              rounded-full 
              flex 
              items-center 
              space-x-2 
              hover:bg-green-600 
              transition-colors
              group
            "
          >
            <Home 
              className="group-hover:scale-110" 
              size={20} 
            />
            <Link href={"/"}>
               <span>Home</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;