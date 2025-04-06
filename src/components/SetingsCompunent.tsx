"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Bell } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function UserSettingsForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    notificationsEnabled: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("auth_token");
    if (!token) return toast.error("Unauthorized");

    if (!userData.name || !userData.email || !userData.password) {
      return toast.error("Please fill in all required fields");
    }

    if (userData.password !== userData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append("token", token);
    form.append("name", userData.name);
    form.append("email", userData.email);
    form.append("password", userData.password);
    form.append("notificationsEnabled", userData.notificationsEnabled.toString());

    try {
      const res = await fetch("/api/updateUserProfile", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log(data)
      if (data.success) {
        toast.success("✅ Account updated successfully!");
      } else {
        toast.error("⚠️ Failed to update.");
      }
    } catch (err) {
      toast.error("⚠️ Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Update Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={userData.notificationsEnabled}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Enable Notifications</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
