"use client"

import React, { useState } from 'react';
import { Mail, Star, Paperclip, Trash2 } from 'lucide-react';
import { deleateEmails } from '@/action/action';

const EmailCard = ({ email,index}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    from,
    to,
    subject,
    body,
    isUnread = false, 
    hasAttachment = false, 
    isFavorite = false
  } = email;



  return (
    <div className={`
      w-full 
      relative 
      flex 
      items-start 
      p-4 
      border-b 
      hover:bg-gray-50 
      transition-all 
      duration-300 
      ${isDeleting ? 'transform scale-95 opacity-0' : ''}
      ${isUnread ? 'bg-blue-50 font-semibold' : 'bg-white'}
    `}>
      {/* Delete Button */}
      <button 
        onClick={async()=> await deleateEmails(index)}
        className="
          absolute 
          right-2 
          top-2 
          text-gray-500 
          hover:text-red-600 
          transition-colors 
          group
        "
      >
        <Trash2 
          className="
            w-4 
            h-4 
            md:w-5 
            md:h-5 
            group-hover:scale-110 
            transition-transform
          " 
        />
      </button>

      {/* Sender Avatar */}
      <div className="mr-4 shrink-0">
        <div className={`
          w-10 
          h-10 
          md:w-12 
          md:h-12 
          rounded-full 
          flex 
          items-center 
          justify-center 
          ${isUnread ? 'bg-blue-100' : 'bg-gray-200'}
        `}>
          <Mail className={`
            w-5 
            h-5 
            md:w-6 
            md:h-6 
            ${isUnread ? 'text-blue-600' : 'text-gray-500'}
          `} />
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-grow min-w-0 pr-8">
        <div className="flex justify-between items-start space-x-2">
          <h3 className={`
            text-xs 
            md:text-sm 
            flex-grow 
            truncate 
            ${isUnread ? 'text-blue-800' : 'text-gray-800'}
          `}>
            {from}
          </h3>
          <div className="flex items-center space-x-2">
            {hasAttachment && (
              <Paperclip 
                className="w-3 h-3 md:w-4 md:h-4 text-gray-500" 
                strokeWidth={2} 
              />
            )}
            {isFavorite && (
              <Star 
                className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" 
                fill="currentColor" 
              />
            )}
            <span className={`
              text-xs 
              ${isUnread ? 'text-blue-600' : 'text-gray-500'}
            `}>
              
            </span>
          </div>
        </div>

        <h2 className={`
          text-sm 
          md:text-base 
          truncate 
          my-1 
          ${isUnread ? 'text-blue-900' : 'text-gray-700'}
        `}>
          {subject}
        </h2>

        <p className={`
          text-xs 
          md:text-sm 
          truncate 
          ${isUnread ? 'text-blue-700' : 'text-gray-600'}
        `}>
          {body}
        </p>
      </div>
    </div>
  );
};



export default EmailCard;