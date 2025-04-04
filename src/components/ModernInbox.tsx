"use client";

import React, { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import { toast } from "react-toastify";

const ModernInbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      try {
        const res = await fetch("/api/inbox", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setEmails(data.emails);
        } else {
          toast.error(data.error || "Failed to fetch inbox");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching inbox");
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading your inbox...
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        No emails in your inbox.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col space-y-5 p-5 overflow-y-auto">
      {emails.map((email: any) => (
        <EmailCard key={email.id} email={email} index={email.id} />
      ))}
    </div>
  );
};

export default ModernInbox;
