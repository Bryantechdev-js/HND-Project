"use client"

import { creatEmails } from '@/action/action';
import { useAuth } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { Files } from 'lucide-react';
// components/EmailForm.jsx
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const EmailForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    from:useAuth().actor,
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  
  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.to)) {
      newErrors.to = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If onSubmit prop is provided, call it with form data
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Email sent:', formData);
      }
      
      // Reset form after successful submission
      setFormData({
        from:useAuth().actor,
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: '',
        attachments: []
      });
      
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-6">
        <h2 className="text-xl font-bold text-white">Compose New Email</h2>
      </div>
      
      <form action={creatEmails} className="p-6">
        <div className="space-y-4">
          {/* To Field */}
          <div className="from">
            <label htmlFor="from">from:</label>
            <br />
            <input type="text" name="from" id="from" className={`mt-1 block w-full px-3 py-2 border ${
                errors.from ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                To:
              </label>
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-800"
                onClick={() => setShowCcBcc(true)}
              >
                {showCcBcc ? 
                   <div id="google_translate_element" className="google-translate-container z-50"></div> : 'translate'
                }
              </button>
            </div>
            
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.to ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="recipient@example.com"
            />
            {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to}</p>}
          </div>
          
          {/* Cc and Bcc Fields */}
         
          
          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Email subject"
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
          </div>
          
          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="8"
              value={formData.message}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Type your message here..."
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>
          
          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments:
            </label>
            
            {formData.attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {formData.attachments.map((file, index) => (
                  
                  <div 
                    key={index} 
                    className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                  >
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Attach files
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Email'}
            </button>
          </div>
        </div>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default EmailForm;