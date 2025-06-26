"use client";

import { deleateEmails } from "@/action/action";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Email = {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
};

const SendBox = () => {
  const [sentEmails, setSentEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const token = sessionStorage.getItem("auth_token");

        if (!token) {
          toast.error("You are not logged in!");
          return;
        }

        const res = await fetch("/api/sent", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setSentEmails(data.emails || []);
        } else {
          toast.error("Failed to fetch sent emails");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching emails.");
        console.error(error);
      }
    };

    fetchSentEmails();
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    readEmailAloud(email);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };



  const readEmailAloud = (email: Email) => {
    if (window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance();
      // Read the receiver, date, and body
      speech.text = `Receiver: ${email.to}. Sent on: ${formatDate(email.date)}. ${email.body}`;
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      toast.error("Speech synthesis not supported in this browser.");
    }
  };

  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">Sent Emails</h2>
      </div>

      <div className="flex flex-col md:flex-row h-[600px]">
        {/* Email List */}
        <div className="w-full md:w-1/3 border-r overflow-y-auto">
          {sentEmails.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No emails sent yet</div>
          ) : (
            <ul className="divide-y">
              {sentEmails.map((email) => (
                <li
                  key={email.id}
                  className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedEmail?.id === email.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="font-medium truncate">{email.to}</div>
                  <div className="text-sm font-medium truncate">{email.subject}</div>
                  <div className="text-xs text-gray-500">{formatDate(email.date)}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent email content from opening
                      deleateEmails(email.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-xs ml-4"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Email Content */}
        <div className="w-full md:w-2/3 overflow-y-auto bg-white">
          {selectedEmail ? (
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-500">
                  To: <span className="text-gray-700">{selectedEmail.to}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Subject: <span className="text-gray-700">{selectedEmail.subject}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Sent: <span className="text-gray-700">{formatDate(selectedEmail.date)}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="prose max-w-none whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => readEmailAloud(selectedEmail)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Read Aloud
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an email to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendBox;
