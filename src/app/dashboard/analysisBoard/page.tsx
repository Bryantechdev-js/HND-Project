"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { Dialog } from "@headlessui/react";
import jsPDF from "jspdf";

interface EmailDataPoint {
  label: string;
  Sent: number;
  Received: number;
}

interface SentimentPoint {
  name: string;
  value: number;
}

interface EmailStats {
  sentReceivedData: EmailDataPoint[];
  sentimentData: SentimentPoint[];
}

interface Filters {
  startDate: string;
  endDate: string;
  email: string;
}

interface EmailOption {
  id: string;
  subject: string;
  body: string;
  to: string;
}

const COLORS = ["#4f46e5", "#10b981", "#facc15"];

export default function EnhancedAnalyticsDashboard(): JSX.Element {
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({ startDate: "", endDate: "", email: "" });
  const [aiReply, setAiReply] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<EmailOption[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const fetchStats = async (): Promise<void> => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) return toast.error("Unauthorized: Please login.");
    setLoading(true);
    try {
      const res = await fetch("/api/email-analytics", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(filters),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStats(data.analytics);
        toast.success("Analytics loaded");
      } else {
        toast.error("Failed to load analytics");
      }
    } catch (err) {
      toast.error("Analytics fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchInboxEmails = async (): Promise<void> => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch("/api/inbox", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setEmails(data.emails);
        toast.success("Inbox loaded");
      } else {
        toast.error("Failed to fetch inbox");
      }
    } catch (err) {
      toast.error("Failed to load inbox emails");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchInboxEmails();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [filters]);

  const askAI = async (): Promise<void> => {
    setAiLoading(true);
    const emailToReply = emails.find(e => e.id === selectedEmail);
    if (!emailToReply) {
      toast.error("Please select an email to reply to.");
      setAiLoading(false);
      return;
    }

    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      setAiLoading(false);
      return;
    }

    toast.info("Generating AI reply...");

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ emailContent: emailToReply.body, question: "Generate a professional reply." }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiReply(data.answer);
        toast.success("AI reply generated");
      } else {
        toast.error("AI suggestion failed");
      }
    } catch (err) {
      toast.error("AI service error");
    } finally {
      setAiLoading(false);
    }
  };

  const sendReply = async (): Promise<void> => {
    const token = sessionStorage.getItem("auth_token");
    if (!token || !aiReply) return toast.error("Please generate a reply first.");
    const emailToReply = emails.find(e => e.id === selectedEmail);
    if (!emailToReply) return toast.error("No selected email found.");

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: emailToReply.to,
          subject: `Re: ${emailToReply.subject}`,
          body: aiReply,
        }),
      });

      if (res.ok) {
        toast.success("AI reply sent successfully");
        setAiReply("");
        setIsOpen(false);
        toast("success")
      } else {
        toast.error("Failed to send reply");
      }
    } catch (err) {
      toast.error("Email sending failed");
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const renderChartTitle = (text: string): JSX.Element => (
    <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {text}
    </motion.h3>
  );

  const exportToCSV = () => {
    if (!emailStats) return toast.error("No data to export");
    toast.info("Exporting to CSV...");

    const csvRows = [
      ["Date", "Sent", "Received"],
      ...emailStats.sentReceivedData.map((row) => [row.label, row.Sent, row.Received]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "email_analytics.csv");
    link.click();
  };

  const exportToPDF = () => {
    if (!emailStats) return toast.error("No data to export");
    toast.info("Exporting to PDF...");

    const doc = new jsPDF();
    doc.text("Email Analytics Report", 10, 10);

    emailStats.sentReceivedData.forEach((row, index) => {
      doc.text(`${row.label}: Sent: ${row.Sent}, Received: ${row.Received}`, 10, 20 + (index * 10));
    });

    doc.save("email_analytics.pdf");
  };

  if (loading) return <div className="text-center p-6">Loading dashboard...</div>;
  if (!emailStats) return <div className="text-center p-6 text-red-500">No analytics found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📊 Enhanced Email Analytics</h2>
        <div className="flex gap-2">
          <button onClick={exportToCSV} className="bg-gray-100 px-3 py-1 rounded text-sm">Export CSV</button>
          <button onClick={exportToPDF} className="bg-gray-100 px-3 py-1 rounded text-sm">Export PDF</button>
          <button onClick={() => setIsOpen(true)} className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <Wand2 size={16} /> Ask AI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          {renderChartTitle("Emails Sent vs Received")}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emailStats.sentReceivedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sent" fill="#4f46e5" />
              <Bar dataKey="Received" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          {renderChartTitle("Sentiment Distribution")}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={emailStats.sentimentData} dataKey="value" nameKey="name" outerRadius={100} label>
                {emailStats.sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex justify-center items-center">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <Dialog.Title className="text-xl font-semibold">Ask AI for Reply</Dialog.Title>
          <div className="mt-4">
            <label className="block">Select Email to Reply:</label>
            <select
              className="block w-full mt-2 p-2 border rounded-md"
              onChange={(e) => setSelectedEmail(e.target.value)}
            >
              <option value="">Select an email</option>
              {emails.map((email) => (
                <option key={email.id} value={email.id}>{email.subject}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={askAI}
              disabled={aiLoading}
            >
              {aiLoading ? "Generating..." : "Generate Reply"}
            </button>
          </div>

                    {aiReply && (
            <div className="mt-4">
              <h4 className="font-semibold">AI Reply:</h4>
              <textarea
                className="w-full border p-4 rounded h-40 resize-none"
                value={aiReply}
                onMouseEnter={(e) => {
                  setAiReply(e.target.value);
                  toast.info("You are editing the AI-generated email");
                }}
              />
            </div>
          )}


          <div className="mt-4 flex justify-end gap-2">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={sendReply}
            >
              Send Reply
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <ToastContainer/>
    </div>
  );
}
