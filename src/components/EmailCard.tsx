"use client";

import { useState } from "react";
import { Volume2, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleateEmails } from "@/action/action";

const EmailCard = ({
  email,
  index,
  onDelete,
}: {
  email: any;
  onDelete?: (id: string) => void;
  index: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the date format as needed
  };

  const handleReadAloud = () => {
    const speechText = `Sender: ${email.from}. Sent on: ${formatDate(email.date)}. ${email.body}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "en";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{email.subject}</h3>

          <p className="text-sm text-gray-500 mb-2">From: {email.from}</p>
          <p className="text-sm text-gray-500 mb-2">date: {email.date}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleReadAloud}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Read aloud"
          >
            <Volume2 size={20} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 hover:text-gray-800 transition"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <button
            onClick={() => deleateEmails(index)}
            disabled={deleting}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete email"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 text-sm text-gray-700 whitespace-pre-line">
          {email.body}
        </div>
      )}
    </div>
  );
};

export default EmailCard;
