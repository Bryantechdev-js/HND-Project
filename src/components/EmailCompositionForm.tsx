"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, X, Paperclip, Bold, Italic, AlignLeft, 
  List, Link as LinkIcon, Smile, Image, ChevronDown, Save,
  Minimize2, Maximize2, MoreHorizontal
} from 'lucide-react';

const EmailCompositionForm = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
  });
  
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSending, setSending] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      onClose();
      // Here you would normally send the email data to your API
      console.log('Email sent:', formState, 'Attachments:', attachments);
    }, 1500);
  };
  
  // Handle file attachment
  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };
  
  // Remove an attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
  
  // Draft autosave
  useEffect(() => {
    const interval = setInterval(() => {
      if (formState.to || formState.subject || formState.message) {
        localStorage.setItem('emailDraft', JSON.stringify(formState));
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [formState]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      y: 50, 
      transition: { duration: 0.2 }
    }
  };
  
  const containerSizeVariants = {
    normal: { 
      width: '100%',
      height: '90%',
      transition: { duration: 0.3 }
    },
    minimized: { 
      height: '60px',
      transition: { duration: 0.3 }
    },
    maximized: { 
      width: '100%',
      height: '100%',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-4">
          <motion.div 
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={!isMinimized ? onClose : undefined}
          />
          
          <motion.div 
            className={`bg-white dark:bg-gray-800 rounded-t-lg md:rounded-lg shadow-2xl flex flex-col overflow-hidden 
                        ${isMinimized ? 'w-72' : isMaximized ? 'w-full' : 'w-full md:w-1/2'}
                        ${isMinimized ? 'h-14' : isMaximized ? 'h-full' : 'h-5/6'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Form Header */}
            <div className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-medium">
                {isMinimized ? 'New Message' : 'Compose Email'}
              </h3>
              <div className="flex items-center space-x-2">
                {!isMinimized && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsMinimized(true);
                      setIsMaximized(false);
                    }}
                    className="text-white hover:bg-indigo-700 p-1 rounded"
                  >
                    <Minimize2 size={16} />
                  </motion.button>
                )}
                
                {isMinimized && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMinimized(false)}
                    className="text-white hover:bg-indigo-700 p-1 rounded"
                  >
                    <Maximize2 size={16} />
                  </motion.button>
                )}
                
                {!isMinimized && !isMaximized && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMaximized(true)}
                    className="text-white hover:bg-indigo-700 p-1 rounded"
                  >
                    <Maximize2 size={16} />
                  </motion.button>
                )}
                
                {!isMinimized && isMaximized && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMaximized(false)}
                    className="text-white hover:bg-indigo-700 p-1 rounded"
                  >
                    <Minimize2 size={16} />
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-white hover:bg-indigo-700 p-1 rounded"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>
            
            {/* Form Content - Hidden when minimized */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="p-4 space-y-3 overflow-y-auto flex-1">
                    {/* To field */}
                    <div className="flex items-center space-x-2">
                      <label className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">To:</label>
                      <input
                        type="text"
                        name="to"
                        value={formState.to}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 
                                 dark:focus:border-indigo-400 outline-none bg-transparent py-1 px-1 text-sm
                                 dark:text-white transition-colors duration-200"
                        placeholder="recipient@example.com"
                      />
                    </div>
                    
                    {/* CC field - conditionally shown */}
                    <AnimatePresence>
                      {showCc && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <label className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">CC:</label>
                          <input
                            type="text"
                            name="cc"
                            value={formState.cc}
                            onChange={handleChange}
                            className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 
                                     dark:focus:border-indigo-400 outline-none bg-transparent py-1 px-1 text-sm
                                     dark:text-white transition-colors duration-200"
                            placeholder="cc@example.com"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* BCC field - conditionally shown */}
                    <AnimatePresence>
                      {showBcc && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <label className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">BCC:</label>
                          <input
                            type="text"
                            name="bcc"
                            value={formState.bcc}
                            onChange={handleChange}
                            className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 
                                     dark:focus:border-indigo-400 outline-none bg-transparent py-1 px-1 text-sm
                                     dark:text-white transition-colors duration-200"
                            placeholder="bcc@example.com"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* CC/BCC toggle links */}
                    <div className="flex space-x-4 text-xs text-indigo-600 dark:text-indigo-400">
                      {!showCc && (
                        <button
                          type="button"
                          onClick={() => setShowCc(true)}
                          className="hover:underline"
                        >
                          Add CC
                        </button>
                      )}
                      
                      {!showBcc && (
                        <button
                          type="button"
                          onClick={() => setShowBcc(true)}
                          className="hover:underline"
                        >
                          Add BCC
                        </button>
                      )}
                    </div>
                    
                    {/* Subject field */}
                    <div className="flex items-center space-x-2 mt-2">
                      <label className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">Subject:</label>
                      <input
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 
                                 dark:focus:border-indigo-400 outline-none bg-transparent py-1 px-1 text-sm
                                 dark:text-white transition-colors duration-200"
                        placeholder="Email subject"
                      />
                    </div>
                    
                    {/* Formatting toolbar */}
                    <div className="flex items-center space-x-1 py-2 border-b border-gray-200 dark:border-gray-700">
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Bold size={16} />
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Italic size={16} />
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <AlignLeft size={16} />
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <List size={16} />
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LinkIcon size={16} />
                      </button>
                      <button type="button" className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Smile size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Image size={16} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAttachment} 
                        className="hidden" 
                        multiple 
                      />
                    </div>
                    
                    {/* Message body */}
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={12}
                      className="w-full flex-1 outline-none bg-transparent resize-none text-gray-800 
                               dark:text-gray-200 text-sm mt-2"
                      placeholder="Compose your email..."
                    />
                    
                    {/* Attachments list */}
                    {attachments.length > 0 && (
                      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments ({attachments.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {attachments.map((file, index) => (
                            <div 
                              key={index}
                              className="flex items-center bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                            >
                              <Paperclip size={12} className="mr-1 text-gray-500" />
                              <span className="text-xs truncate max-w-xs">{file.name}</span>
                              <button 
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Form footer with actions */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSending}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium
                                 hover:bg-indigo-700 transition-colors duration-200 flex items-center
                                 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} className="mr-1" />
                            Send
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip size={16} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <MoreHorizontal size={16} />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="text-gray-500 hover:text-red-500 text-sm"
                      onClick={onClose}
                    >
                      Discard
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmailCompositionForm;