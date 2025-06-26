// components/ReplyEmailSelect.tsx
import { useInboxEmails } from "@/lib/useInboxEmails";
import React, { useState } from "react";
// import { useInboxEmails } from "@/hooks/useInboxEmails";

export function ReplyEmailSelect({ token, onSelect }: { token: string; onSelect: (email: any) => void }) {
  const emails = useInboxEmails(token);

  return (
    <div className="w-full">
      <label className="text-sm font-semibold">Select an email to reply to:</label>
      <select
        onChange={(e) => {
          const selected = emails.find((email) => email.id === e.target.value);
          onSelect(selected);
        }}
        className="w-full p-2 rounded-lg border mt-2"
      >
        <option value="">-- Choose Email --</option>
        {emails.map((email: any) => (
          <option key={email.id} value={email.id}>
            From: {email.from} — {email.subject}
          </option>
        ))}
      </select>
    </div>
  );
}
