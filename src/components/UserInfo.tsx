import React from 'react';
import { getLoggedInUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

const UserInfo = async () => {
 const users = await prisma.user.findMany({
     where: { login: true },
   });


   const name="byan tech",
   email="bryantech.dev@gmail.com"
//    const loginUser = users.map((user) => [user.name,user.email]);
//    const [name,email]=loginUser
//    const {name,email}=name

//   if (!loginUser) {
//     return (
//       <div className="userinfo w-full h-auto px-5 py-3 bg-slate-100 shadow-lg flex space-x-5 justify-center items-center rounded-lg">
//         <p className="text-gray-500">No user logged in</p>
//       </div>
//     );
//   }

  return (
    <div className="userinfo w-full h-auto px-5 py-3 bg-slate-100 shadow-lg hover:shadow-xl flex space-x-5 justify-center items-center rounded-lg transition-all duration-300 hover:bg-white">
      <div className="userImage w-10 h-10 bg-blue-200 hover:bg-blue-300 rounded-full flex justify-center items-center transition-colors duration-300 text-blue-700 font-semibold">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="transition-all duration-300 hover:translate-x-1">
        <li className="list-none font-medium text-gray-800 hover:text-black transition-colors duration-300">
          {name}
        </li>
        <p className="emails text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
