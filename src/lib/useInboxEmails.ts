// hooks/useInboxEmails.ts
import { useEffect, useState } from "react";

export function useInboxEmails(token: string) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("/api/inbox", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmails(data.emails || []))
      .catch(console.error);
  }, [token]);

  return emails;
}
