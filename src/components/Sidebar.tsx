"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Inbox, Send, Archive, Trash, Star, Tag, Settings, 
  ChevronRight, ChevronLeft, Menu, X, User, Bell, PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import share from '@/lib/shareComponents';
import { useRouter } from 'next/navigation';


const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [activeItem, setActiveItem] = useState('inbox');
  const router = useRouter()

  interface SidebarProps {
    onButtonClick: (component: string) => void;
  }

  const setEmailFo=share().setEmailFo
  // const setInbox=share().setInbox
  // const setSendbox=share().setSendbox
  
  // Check if on mobile device
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

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Navigation items
  const navItems = [
    { id: 'inbox', icon: Inbox, label: 'Inbox', count: unreadCount },
    { id: 'starred', icon: Star, label: 'Starred', count: 0 },
    { id: 'sent', icon: Send, label: 'Sent', count: 0 },
    { id: 'drafts', icon: Mail, label: 'Drafts', count: 2 },
    { id: 'archive', icon: Archive, label: 'Archive', count: 0 },
    { id: 'trash', icon: Trash, label: 'Trash', count: 0 },
  ];

  // Label items
  const labelItems = [
    { id: 'work', color: '#FF5630', label: 'Work' },
    { id: 'personal', color: '#4C9AFF', label: 'Personal' },
    { id: 'important', color: '#FFC400', label: 'Important' },
  ];

  // Sidebar animations
  const sidebarVariants = {
    expanded: { width: '250px', transition: { duration: 0.3, ease: 'easeInOut' } },
    // collapsed: { width: '64px', transition: { duration: 0.3, ease: 'easeInOut' } },
    mobileOpen: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    mobileClosed: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } }
  };
  
  // Item hover animation
  const itemHoverVariants = {
    hover: { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }
  };

  return (
    <div className='w-[250px] h-screen'>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-30 rounded-full p-2 bg-indigo-600 text-white shadow-lg"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-black z-20"
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-gray-200 shadow-lg dark:bg-[#121212] dark:text-white text-black z-20 overflow-x-hidden flex flex-col "
        variants={sidebarVariants}
        initial={isMobile ? "mobileClosed" : "expanded"}
        animate={isMobile 
          ? (mobileOpen ? "mobileOpen" : "mobileClosed") 
          : (expanded ? "expanded" : "collapsed")
        }
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <Mail className="text-indigo-400" size={24} />
            <AnimatePresence>
              {(expanded || (isMobile && mobileOpen)) && (
                <Link href={"/"}>
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 font-bold text-lg"
                >
                  MaxMail
                </motion.span>
                </Link>
              )}
            </AnimatePresence>
          </div>
          
          {!isMobile && (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
              {expanded ? "" : <ChevronRight size={20} />}
            </button>
          )}
        </div>
        
        {/* Create Email Button - Added Here */}
        <div className="px-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium shadow-md"
            onClick={()=>router.push("/dashboard/EmailForm")}
          >
            <PlusCircle size={16} />
            {(expanded || (isMobile && mobileOpen)) && (
              <span className="ml-2">Create Email</span>
            )}
          </motion.button>
        </div>
        
        {/* Profile */}
        <div className="p-4 border-b border-gray-800 flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
            <User size={16} />
          </div>
          <AnimatePresence>
            {(expanded || (isMobile && mobileOpen)) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 overflow-hidden"
              >
                <p className="font-medium text-sm">Alex Johnson</p>
                <p className="text-xs text-gray-400">alex@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Main navigation */}
        <div className="py-4 flex-grow overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <motion.li key={item.id} whileHover="hover" variants={itemHoverVariants}>
                <button
                  onClick={() =>{
                    setActiveItem(item.id)
                    if(item.id==="inbox") router.push("/dashboard")
                    else if(item.id==="sent") router.push("/dashboard/Sendbox");
                  }}
                  className={`w-full flex items-center px-4 py-3 transition-colors ${
                    activeItem === item.id ? 'bg-indigo-600 text-white' : 'text-gray-black '
                  }`}
                >
                  <item.icon size={expanded || (isMobile && mobileOpen) ? 18 : 22} />
                  
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
                    <AnimatePresence>
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`ml-auto ${expanded || (isMobile && mobileOpen) ? 'text-xs' : 'text-xs'} px-2 py-1 rounded-full ${
                          activeItem === item.id ? 'bg-white text-indigo-600' : 'bg-indigo-500'
                        }`}
                      >
                        {item.count}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
          
          {/* Labels section */}
          {(expanded || (isMobile && mobileOpen)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 px-4"
            >
              <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Labels</p>
              <ul>
                {labelItems.map((label) => (
                  <motion.li key={label.id} whileHover="hover" variants={itemHoverVariants} >
                    <button className="w-full flex items-center py-2 text-black dark:text-white text-sm" >
                      <span
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: label.color }}
                      />
                      {label.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full py-2 bg-indigo-600  hover:bg-indigo-700 rounded-md text-sm"
          >
            <Settings size={16} />
            {(expanded || (isMobile && mobileOpen)) && (
              <span className="ml-2">Settings</span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;