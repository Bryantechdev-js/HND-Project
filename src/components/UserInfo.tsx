"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("auth_token");

      if (!token) return;

      const res = await fetch("/api/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        sessionStorage.removeItem("auth_token"); // Remove invalid token
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!user) {
    return (
      <div className="userinfo w-full h-auto px-5 py-3 bg-slate-100 shadow-lg flex justify-center items-center rounded-lg">
        <p className="text-gray-500">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="userinfo w-full h-auto px-5 py-3 bg-slate-100 shadow-lg flex space-x-5 justify-center items-center rounded-lg transition-all hover:shadow-xl hover:bg-white">
      <div className="userImage w-10 h-10 bg-blue-200 hover:bg-blue-300 rounded-full flex justify-center items-center text-blue-700 font-semibold">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <li className="list-none font-medium text-gray-800 hover:text-black">
          {user.name}
        </li>
        <p className="text-sm text-gray-500 hover:text-gray-700">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
