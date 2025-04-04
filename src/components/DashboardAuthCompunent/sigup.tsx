"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "@/action/action";

// Server-side action that needs to be called in the client
// import { registerUser } from "@/actions/registerUser";

const AdvancedLoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      // Convert the form data to FormData
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
  
      const response = await registerUser(formDataObj);
  
      if (response.success) {
        toast.success(response.success);
        setTimeout(() => {
          window.location.href = "/login"; // Redirect on success
        }, 2000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-slate-200"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-800">Welcome</h2>
          <p className="text-slate-600 mt-2 text-sm">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name"
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg focus:outline-none transition-all duration-300 ${
                formErrors.name ? "border-red-500 text-red-500" : "border-slate-200 text-slate-800 focus:border-blue-500"
              }`}
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1 pl-10">{formErrors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-slate-400" size={20} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg focus:outline-none transition-all duration-300 ${
                formErrors.email ? "border-red-500 text-red-500" : "border-slate-200 text-slate-800 focus:border-blue-500"
              }`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1 pl-10">{formErrors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-slate-400" size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-lg focus:outline-none transition-all duration-300 ${
                formErrors.password ? "border-red-500 text-red-500" : "border-slate-200 text-slate-800 focus:border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formErrors.password && <p className="text-red-500 text-xs mt-1 pl-10">{formErrors.password}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AdvancedLoginForm;
