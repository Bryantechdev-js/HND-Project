"use client"

import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Lock, 
  LogIn, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
// import { useRouter } from 'next/router';

const ModernLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLElement>(null);
  const router=useRouter()

  const handleMouseMove = (e) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Read error message
        console.log("Login failed:", errorData.message);
        return;
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
      toast("Login successful:")
     const isLogin= data.user.login=true
    //  logStatus(isLogin)
      if(isLogin) router.push("/dashboard")
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  return (
    <div 
      className="
        min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-white to-slate-100 
        p-4 overflow-hidden
      "
    >
      <div 
        ref={formRef}
        onMouseMove={handleMouseMove}
        className="
          relative w-full max-w-md 
          bg-white 
          rounded-3xl shadow-2xl 
          overflow-hidden
          transform transition-all duration-300
        "
        style={{
          transform: `
            perspective(1000px) 
            rotateX(${(mousePosition.y - 250) / 50}deg) 
            rotateY(${-(mousePosition.x - 250) / 50}deg)
          `,
          boxShadow: `
            ${(mousePosition.x - 250) / 20}px 
            ${(mousePosition.y - 250) / 20}px 
            30px rgba(0,0,0,0.1)
          `
        }}
      >
        {/* Animated Background Layer */}
        <div 
          className="
            absolute inset-0 
            bg-gradient-to-br from-white to-slate-100
            opacity-10
            pointer-events-none
          "
          style={{
            transform: `
              translate(
                ${-(mousePosition.x - 250) / 50}px, 
                ${-(mousePosition.y - 250) / 50}px
              )
            `
          }}
        />

        {/* Form Content */}
        <div className="relative z-10 p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Sign In
            </h2>
            <p className="text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label 
                htmlFor="email" 
                className="
                  absolute -top-2 left-4 
                  bg-white px-2 
                  text-xs text-gray-500
                  transition-all duration-300
                "
              >
                Email Address
              </label>
              <div className="flex items-center">
                <div className="
                  absolute left-3 
                  text-gray-400
                ">
                  <Mail size={20} />
                </div>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="
                    w-full pl-10 pr-4 py-3.5 
                    bg-slate-100 
                    rounded-xl 
                    border border-transparent
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    transition-all duration-300
                  "
                />
              </div>
            </div>

            <div className="relative">
              <label 
                htmlFor="password" 
                className="
                  absolute -top-2 left-4 
                  bg-white px-2 
                  text-xs text-gray-500
                  transition-all duration-300
                "
              >
                Password
              </label>
              <div className="flex items-center">
                <div className="
                  absolute left-3 
                  text-gray-400
                ">
                  <Lock size={20} />
                </div>
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="
                    w-full pl-10 pr-10 py-3.5 
                    bg-slate-100 
                    rounded-xl 
                    border border-transparent
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    transition-all duration-300
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 
                    text-gray-400
                    hover:text-gray-600
                    transition-colors
                  "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="
                    mr-2 rounded 
                    text-blue-600 
                    focus:ring-blue-500
                  "
                />
                <label 
                  htmlFor="remember" 
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a 
                href="#" 
                className="
                  text-sm text-blue-600 
                  hover:underline
                  transition-colors
                "
              >
                Forgot password?
              </a>
            </div>

            <button 
              type="submit"
              className="
                w-full py-3.5 
                bg-gradient-to-r from-blue-500 to-blue-600 
                text-white 
                rounded-xl 
                hover:from-blue-600 hover:to-blue-700
                transition-all duration-300
                flex items-center justify-center
                transform hover:scale-105 active:scale-95
                group
              "
              
            >
              <LogIn 
                className="mr-2 group-hover:rotate-12 transition-transform" 
                size={20} 
              />
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?
              <a 
                href="/sigup" 
                className="
                  ml-2 text-blue-600 
                  hover:underline
                  transition-colors
                "
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div 
        className="
          fixed -top-20 -right-20 
          w-96 h-96 
          bg-blue-100 
          rounded-full 
          opacity-20 
          pointer-events-none
          z-0
        "
        style={{
          transform: `
            translate(
              ${(mousePosition.x - 250) / 100}px, 
              ${(mousePosition.y - 250) / 100}px
            )
          `
        }}
      />
      <div 
        className="
          fixed -bottom-20 -left-20 
          w-96 h-96 
          bg-blue-100 
          rounded-full 
          opacity-20 
          pointer-events-none
          z-0
        "
        style={{
          transform: `
            translate(
              ${-(mousePosition.x - 250) / 100}px, 
              ${-(mousePosition.y - 250) / 100}px
            )
          `
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default ModernLoginForm;