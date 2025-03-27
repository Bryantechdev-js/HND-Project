
import React, { useState } from 'react';
import { Mail, User, Star, Trash, Reply, MoreHorizontal } from 'lucide-react';
import { prisma } from '@/lib/db';
import EmailCard from './EmailCard';


const ModernInbox = async() => {
  
  const userEmails=await prisma.email.findMany(
 
  )

  // const [emails, setEmails] = useState(userEmails);

  return (
    
    <div className="w-full h-screen flex flex-col space-y-5">
      {userEmails.map((email)=>(

<EmailCard 
key={email.id}
email={email}
index={email.id}
/>
      ))}
    </div>
  );
};

export default ModernInbox;