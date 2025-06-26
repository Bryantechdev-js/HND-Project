"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailForm = () => {
  const initialForm = {
    from: "",
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
    attachments: [],
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.to.trim()) {
      newErrors.to = "Recipient email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.to)) {
      newErrors.to = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = sessionStorage.getItem("auth_token"); // Changed from localStorage to sessionStorage
    if (!token) {
      toast.error("You are not logged in!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      to: formData.to,
      cc: formData.cc || null,
      bcc: formData.bcc || null,
      subject: formData.subject,
      body: formData.message,
      draft: isDraft,
    };

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(isDraft ? "Draft saved!" : "Email sent!");
        setFormData(initialForm);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error("Something went wrong while sending the email.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="bg-blue-600 py-4 px-6 text-white font-bold text-xl">
        Compose Email
      </div>
      <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 space-y-4">
        <div className="from">
          <label htmlFor="from">From:</label>
          <br />
          <input
            type="text"
            name="from"
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Auto-detected from backend"
            disabled
          />
        </div>

        <div>
          <label className="block">To:</label>
          <input
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.to && <p className="text-red-600 text-sm">{errors.to}</p>}
        </div>

        <button
          type="button"
          onClick={() => setShowCcBcc(!showCcBcc)}
          className="text-blue-600 text-sm"
        >
          {showCcBcc ? "Hide" : "Show"} CC/BCC
        </button>

        {showCcBcc && (
          <>
            <div>
              <label className="block">Cc:</label>
              <input
                name="cc"
                value={formData.cc}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block">Bcc:</label>
              <input
                name="bcc"
                value={formData.bcc}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        <div>
          <label className="block">Subject:</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.subject && (
            <p className="text-red-600 text-sm">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block">Message:</label>
          <textarea
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.message && (
            <p className="text-red-600 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e as any, true)}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Sending..." : "Send Email"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailForm;
