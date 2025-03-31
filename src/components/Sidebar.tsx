"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Inbox, Send, Archive, Trash, Star, Settings, 
  ChevronRight, Menu, X, PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { prisma } from '@/lib/db';
import UserInfo from './UserInfo';

const Sidebar = () => {
  // const userEmails=await prisma.email.findMany()
  // const emailslenght=userEmails.length
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inbox');
  const router = useRouter();

  // Responsive and mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Navigation items with icons and counts
  const navItems = [
    { id: 'inbox', icon: Inbox, label: 'Inbox', count:3 },
    { id: 'sent', icon: Send, label: 'Sent', count: 0 },
    { id: 'drafts', icon: Mail, label: 'Drafts', count: 0 },
    { id: 'archive', icon: Archive, label: 'Archive', count: 0 },
  ];

  // Label items with color indicators
  const labelItems = [
    { id: 'work', color: '#FF5630', label: 'Work' },
    { id: 'personal', color: '#4C9AFF', label: 'Personal' },
    { id: 'important', color: '#FFC400', label: 'Important' },
  ];

  // Sidebar and animation configurations
  const sidebarVariants = {
    expanded: { 
      width: '250px', 
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
    mobileOpen: { 
      x: 0, 
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
    mobileClosed: { 
      x: '-100%', 
      transition: { duration: 0.3, ease: 'easeInOut' } 
    }
  };

  const itemHoverVariants = {
    hover: { 
      scale: 1.02, 
      backgroundColor: 'rgba(99, 102, 241, 0.1)' // Indigo-500 with opacity
    }
  };

  // Sidebar toggle functions
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="w-[250px] h-screen">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-50 rounded-full p-2 
            bg-indigo-600 text-white shadow-lg 
            dark:bg-indigo-500 dark:text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full 
          bg-white dark:bg-[#121212] 
          text-gray-800 dark:text-gray-100 
          shadow-lg z-50 overflow-hidden 
          flex flex-col"
        variants={sidebarVariants}
        initial={isMobile ? "mobileClosed" : "expanded"}
        animate={isMobile 
          ? (mobileOpen ? "mobileOpen" : "mobileClosed") 
          : (expanded ? "expanded" : "mobileOpen")
        }
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between 
          border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <Mail className="text-indigo-500 dark:text-indigo-400" size={24} />
            <AnimatePresence>
              {(expanded || (isMobile && mobileOpen)) && (
                <Link href="/">
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-3 font-bold text-lg 
                      text-gray-900 dark:text-white"
                  >
                    MaxMail
                  </motion.span>
                </Link>
              )}
            </AnimatePresence>
          </div>
          
          {!isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="text-gray-500 hover:text-indigo-600 
                dark:text-gray-400 dark:hover:text-indigo-400"
            >
              {expanded ? "" : <ChevronRight size={20} />}
            </button>
          )}
        </div>

       <UserInfo/>
        
        {/* Create Email Button */}
        <div className="px-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full py-3 
              bg-indigo-600 hover:bg-indigo-700 
              dark:bg-indigo-500 dark:hover:bg-indigo-600 
              rounded-md text-white font-medium shadow-md"
            onClick={() => router.push("/dashboard/EmailForm")}
          >
            <PlusCircle size={16} />
            {(expanded || (isMobile && mobileOpen)) && (
              <span className="ml-2">Create Email</span>
            )}
          </motion.button>
        </div>

        
        
        {/* Navigation Items */}
        <div className="py-4 flex-grow overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <motion.li 
                key={item.id} 
                whileHover="hover" 
                variants={itemHoverVariants}
              >
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    router.push(
                      item.id === "inbox" 
                        ? "/dashboard" 
                        : item.id==="send"? "/dashboard/Sendbox":"/EmailForm"
                    );
                  }}
                  className={`w-full flex items-center px-4 py-3 
                    transition-colors 
                    ${activeItem === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <item.icon 
                    size={expanded || (isMobile && mobileOpen) ? 18 : 22} 
                    className="text-current" 
                  />
                  
                  <AnimatePresence>
                    {(expanded || (isMobile && mobileOpen)) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-3 text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {item.count > 0 && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`ml-auto text-xs px-2 py-1 rounded-full 
                        ${activeItem === item.id 
                          ? 'bg-white text-indigo-600' 
                          : 'bg-indigo-500 text-white'}`}
                    >
                      {item.count}
                    </motion.span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full py-2 
              bg-indigo-600 hover:bg-indigo-700 
              dark:bg-indigo-500 dark:hover:bg-indigo-600 
              rounded-md text-sm text-white"
          >
            <Settings size={16} />
            {(expanded || (isMobile && mobileOpen)) && (
              <span className="ml-2" onClick={()=>router.push("/dashboard/Setings")}>Settings</span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;