"use client"

import { useState, useEffect } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...arguments) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arguments);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        },
      });

      const onLoad = () => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "OYZnAHnzOMQyNo3QPnXxm";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    }
  }, []);

  return (
    <div className="relative">
      {/* Button to toggle chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {/* Chatbox container */}
      {isOpen && (
        <div
          id="chatbase"
          className="fixed bottom-0 right-0 w-full sm:w-96 h-[400px] bg-white shadow-lg rounded-t-lg transition-all duration-300 ease-in-out"
        >
          <div className="w-full h-full" id="OYZnAHnzOMQyNo3QPnXxm"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
