"use client"

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  BellOff, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

// Simulated server actions (you'll replace these with actual implementations)


export default function UserSettingsForm() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notificationsEnabled: false
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (type) => {
    const newErrors = {};

    switch(type) {
      case 'profile':
        if (!userData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        break;

      case 'email':
        if (!userData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;

      case 'password':
        if (!userData.currentPassword) {
          newErrors.currentPassword = 'Current password is required';
        }
        if (!userData.newPassword) {
          newErrors.newPassword = 'New password is required';
        } else if (userData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters';
        }
        if (userData.newPassword !== userData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm('profile')) return;

    startTransition(async () => {
      try {
        await updateUserProfile(userData.name);
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ form: error.message });
      }
    });
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm('email')) return;

    startTransition(async () => {
      try {
        await updateUserEmail(userData.email);
        setSuccessMessage('Email updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ form: error.message });
      }
    });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!validateForm('password')) return;

    startTransition(async () => {
      try {
        await updateUserPassword({
          currentPassword: userData.currentPassword,
          newPassword: userData.newPassword
        });
        setSuccessMessage('Password updated successfully');
        setUserData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ form: error.message });
      }
    });
  };

  const handleToggleNotifications = async () => {
    startTransition(async () => {
      try {
        const newNotificationStatus = !userData.notificationsEnabled;
        await toggleNotifications(newNotificationStatus);
        setUserData(prev => ({
          ...prev,
          notificationsEnabled: newNotificationStatus
        }));
        setSuccessMessage(
          newNotificationStatus 
            ? 'Notifications enabled' 
            : 'Notifications disabled'
        );
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ form: error.message });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
            role="alert"
          >
            <div className="flex items-center">
              <CheckCircle2 className="mr-2" />
              {successMessage}
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <div className="flex items-center">
              <AlertTriangle className="mr-2" />
              {errors.form}
            </div>
          </motion.div>
        )}

        <div className="p-6 space-y-6">
          {/* Profile Update Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-600" />
              Profile Information
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isPending ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </motion.div>

          {/* Email Update Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="mr-2 text-green-600" />
              Email Address
            </h3>
            <form  className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md  transition-colors disabled:opacity-50"
              >
                {isPending ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </motion.div>

          {/* Password Update Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Lock className="mr-2 text-purple-600" />
              Change Password
            </h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={userData.currentPassword}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                )}
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md  transition-colors disabled:opacity-50"
              >
                {isPending ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </motion.div>

          {/* Notifications Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-6 flex items-center justify-between"
          >
                      <button
              onClick={async () => {
                await fetch("/api/logout");
                window.location.reload();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleNotifications}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                userData.notificationsEnabled 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-gray-200 border-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  userData.notificationsEnabled 
                    ? 'translate-x-5' 
                    : 'translate-x-0'
                }`}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}