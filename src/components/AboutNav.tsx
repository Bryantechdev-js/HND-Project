"use client"
// components/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={`fixed w-full shadow dark:bg-[#121212] dark:text-white bg-white z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#081420] shadow-lg backdrop-blur-sm bg-opacity-90' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
             
              <span className="text-black font-bold text-xl dark:text-white">
                Maxmail
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-4 mr-4 lg:space-x-8">
              <Link href="/stripe" className="text-black dark:text-white hover:text-white transition-colors px-2 py-1 text-sm lg:text-base">
                Pricing
              </Link>
             
              <Link href="/contact" className="text-black dark:text-white hover:text-white transition-colors px-2 py-1 text-sm lg:text-base">
                Contact
              </Link>
            </div>
            <div className="flex space-x-2 lg:space-x-4">
          
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#4facfe]/20 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only dark:text-white">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } absolute top-16 inset-x-0 bg-[#081420] bg-opacity-95 backdrop-blur-md shadow-lg`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link 
            href="/features" 
            className="block text-base dark:text-white text-gray-200 hover:text-white hover:bg-[#4facfe]/20 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="block text-base dark:text-white text-gray-200 hover:text-white hover:bg-[#4facfe]/20 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className="block text-base text-gray-200 hover:text-white hover:bg-[#4facfe]/20 px-3 py-2 rounded-md transition-colors dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-base dark:text-white text-gray-200 hover:text-white hover:bg-[#4facfe]/20 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="grid grid-cols-2 gap-3 dark:text-white pt-3">
            <Link 
              href="/login" 
              className="text-center text-white px-3 py-2 rounded-full border border-[#4facfe] hover:bg-[#4facfe]/20 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-center bg-gradient-to-r dark:text-white from-[#4facfe] to-[#00f2fe] text-white px-3 py-2 rounded-full hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNav;