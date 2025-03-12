"use client"


// components/FAQSection.js
import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is MaxMail?',
    answer:
      'MaxMail is a modern email service provider that uses HMail Server for efficient email handling and Thunderbird for a seamless user interface, offering high reliability and security for personal and business communication.',
  },
  {
    question: 'How does MaxMail ensure email security?',
    answer:
      'MaxMail leverages robust security protocols such as SSL/TLS encryption for secure email transmission, along with advanced spam filtering powered by HMail Server to ensure your inbox stays safe and clean.',
  },
  {
    question: 'What is HMail Server, and why is it used by MaxMail?',
    answer:
      'HMail Server is a free, open-source email server that MaxMail uses to provide fast and reliable email delivery. It supports various protocols such as POP3, IMAP, and SMTP, ensuring MaxMail users have a stable and secure email experience.',
  },
  {
    question: 'Can I access MaxMail via Thunderbird?',
    answer:
      'Yes, MaxMail can be easily configured to work with Thunderbird, providing you with a clean, feature-rich interface for managing your email accounts, calendar, and tasks efficiently.',
  },
  {
    question: 'How can to get started with maxmails services?',
    answer:
      'First sigin and login into your account then subscribe to MaxMails services',
  },

];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 px-20 py-10 dark:bg-[#121212]" id='faq'>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl dark:text-white font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex items-center justify-between py-4 text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
              >
                <span className='dark:text-white'>{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className={`h-6 w-6 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  openIndex === index ? 'max-h-full' : 'max-h-0'
                } overflow-hidden transition-all duration-300`}
              >
                <p className="pt-4 text-gray-600 text-lg dark:text-white">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
