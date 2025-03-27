"use client"; // Ensure it runs in the client

import { createContext, useState, useContext } from "react";

// Create the Context
const AppContext = createContext();

// Custom Hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context Provider Component
export const AppProvider = ({ children }) => {

  const [unreadCount, setUnreadCount] = useState(0);
 

  return (
    <AppContext.Provider
      value={{unreadCount, setUnreadCount}}
    >
      {children}
    </AppContext.Provider>
  );
};
