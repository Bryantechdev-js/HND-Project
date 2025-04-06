"use client";

import React, { useState, useRef } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModernLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store the JWT in sessionStorage (tab-specific)
        sessionStorage.setItem("auth_token", data.token);
        toast.success("🎉 Login successful!", { autoClose: 2000 });
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        toast.error(`❌ ${data.error || "Invalid email or password."}`);
      }
    } catch (error) {
      toast.error("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 p-4 overflow-hidden">
      <div
        ref={formRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
        style={{
          transform: `perspective(1000px) rotateX(${(mousePosition.y - 250) / 50}deg) rotateY(${-(mousePosition.x - 250) / 50}deg)`,
          boxShadow: `${(mousePosition.x - 250) / 20}px ${(mousePosition.y - 250) / 20}px 30px rgba(0,0,0,0.1)`,
        }}
      >
        {/* Form Content */}
        <div className="relative z-10 p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-500">Email Address</label>
              <div className="flex items-center">
                <Mail className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-100 rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs text-gray-500">Password</label>
              <div className="flex items-center">
                <Lock className="absolute left-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-100 rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 active:scale-95"
            >
              {loading ? "Logging in..." : <>
                <LogIn className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                Sign In
              </>}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?
              <a href="/sigup" className="ml-2 text-blue-600 hover:underline transition-colors">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ModernLoginForm;
