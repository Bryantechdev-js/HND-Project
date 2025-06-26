"use client";

import React, { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
import { toast } from "react-toastify";

const ModernInbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInbox = async () => {
      const token = sessionStorage.getItem("auth_token"); // ✅ using sessionStorage

      if (!token) {
        toast.error("User not authenticated");
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/inbox", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Fetched inbox:", data);

        if (res.ok) {
          setEmails(data.emails);
        } else {
          setError(data.error || "Failed to fetch inbox");
          toast.error(data.error || "Failed to fetch inbox");
        }
      } catch (err) {
        console.error(err);
        setError("Server error while fetching inbox");
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

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600">
        {error}
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
      <div className="text-sm text-gray-400">
        Loaded {emails.length} {emails.length === 1 ? "email" : "emails"}
      </div>
      {emails.map((email: any) => (
        <EmailCard key={email.id} email={email} index={email.id} />
      ))}
    </div>
  );
};

export default ModernInbox;
