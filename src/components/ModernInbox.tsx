import React from 'react';
import { getUserEmails } from '@/lib/email';
import { prisma } from '@/lib/db';
import EmailCard from './EmailCard';

const ModernInbox = async () => {
  // Get all currently logged-in users
  const users = await prisma.user.findMany({
    where: { login: true },
  });

  // Handle case where no users are logged in
  if (users.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        No users are currently logged in.
      </div>
    );
  }

  // Collect emails of all logged-in users
  const loggedInEmails = users.map((user) => user.email);

  // Fetch emails for all logged-in users
  const userEmails = await prisma.email.findMany({
    where: {
      to: { in: loggedInEmails }, // Fetch emails where "to" matches any logged-in user's email
    },
  });

  // Handle case where no emails exist for logged-in users
  if (userEmails.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        No emails received.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col space-y-5 p-5">
      {userEmails.map((email) => (
        <EmailCard key={email.id} email={email} index={email.id} />
      ))}
    </div>
  );
};

export default ModernInbox;
