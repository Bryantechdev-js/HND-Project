"use client"

import React, { useState } from 'react';
import { Mail, User, Star, Trash, Reply, MoreHorizontal } from 'lucide-react';

const ModernInbox = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: 'John Smith',
      email: 'john.smith@example.com',
      subject: 'Project Update - Q1 Results',
      preview: 'Hi there, I wanted to share the latest updates on our Q1 results. The team has made significant progress...',
      date: '10:30 AM',
      read: false,
      starred: false,
      expanded: false,
      replying: false,
    },
    {
      id: 2,
      sender: 'Marketing Team',
      email: 'marketing@company.com',
      subject: 'New Campaign Launch',
      preview: 'We are excited to announce our new marketing campaign that will be launching next week. Please review the materials...',
      date: 'Yesterday',
      read: true,
      starred: true,
      expanded: false,
      replying: false,
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      email: 'sarah.j@partner.org',
      subject: 'Meeting Request - Partnership Opportunity',
      preview: 'I would like to schedule a meeting to discuss a potential partnership between our organizations...',
      date: 'Mar 10',
      read: true,
      starred: false,
      expanded: false,
      replying: false,
    },
  ]);

  const [replyText, setReplyText] = useState('');

  const toggleExpand = (id) => {
    setEmails(emails.map(email => {
      if (email.id === id) {
        return { ...email, expanded: !email.expanded, read: true };
      }
      return email;
    }));
  };

  const toggleStar = (id, e) => {
    e.stopPropagation();
    setEmails(emails.map(email => {
      if (email.id === id) {
        return { ...email, starred: !email.starred };
      }
      return email;
    }));
  };

  const toggleReply = (id, e) => {
    if (e) e.stopPropagation();
    setEmails(emails.map(email => {
      if (email.id === id) {
        return { ...email, replying: !email.replying, expanded: true };
      }
      return email;
    }));
  };

  const handleReplySubmit = (id) => {
    if (replyText.trim() === '') return;
    
    // In a real app, you would send the reply to the server
    alert(`Reply sent to email #${id}: ${replyText}`);
    
    setReplyText('');
    toggleReply(id);
  };
  
  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };
  
  const handleReplyFormClick = (e) => {
    // Prevent the click from bubbling up to parent elements
    e.stopPropagation();
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          Inbox
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {emails.map((email) => (
          <div 
            key={email.id}
            className={`${
              email.read ? 'bg-white' : 'bg-blue-50'
            } hover:bg-gray-100 transition-all duration-200 cursor-pointer`}
          >
            <div 
              className="p-4"
              onClick={() => toggleExpand(email.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    <User className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="truncate font-medium">
                      {email.sender}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-gray-500 text-sm">
                      <button 
                        onClick={(e) => toggleStar(email.id, e)}
                        className={`focus:outline-none ${email.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <span>{email.date}</span>
                    </div>
                  </div>
                  
                  <div className="font-medium truncate mb-1">
                    {email.subject}
                  </div>
                  
                  <div className="text-gray-600 text-sm truncate">
                    {email.preview}
                  </div>
                </div>
              </div>
              
              {email.expanded && (
                <div className="mt-4 ml-12 opacity-0 animate-fadeIn">
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">From: {email.sender} &lt;{email.email}&gt;</span>
                        <span className="text-sm text-gray-500">{email.date}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">Subject: {email.subject}</div>
                      <p className="whitespace-pre-line">
                        {email.preview}
                        {"\n\n"}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel semper aliquam. 
                        Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia 
                        Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                        {"\n\n"}
                        Best regards,
                        {"\n"}
                        {email.sender}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => toggleReply(email.id, e)} 
                        className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                        <Trash className="h-4 w-4" />
                        Delete
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {email.replying && (
                    <div 
                      className="mt-3 p-4 bg-white border border-gray-200 rounded-lg opacity-0 animate-slideIn" 
                      onClick={handleReplyFormClick}
                    >
                      <div className="mb-2 text-sm text-gray-500">
                        Replying to {email.sender} &lt;{email.email}&gt;
                      </div>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32"
                        placeholder="Write your reply here..."
                        value={replyText}
                        onChange={handleReplyTextChange}
                        onClick={handleReplyFormClick}
                      />
                      <div className="mt-3 flex justify-end gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleReply(email.id);
                          }} 
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReplySubmit(email.id);
                          }} 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out forwards;
          }
          
          .animate-slideIn {
            animation: slideIn 0.3s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ModernInbox;