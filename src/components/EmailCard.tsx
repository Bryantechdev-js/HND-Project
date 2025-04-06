"use client";

import { useState } from "react";
import { Volume2, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const EmailCard = ({
  email,
  onDelete,
}: {
  email: any;
  onDelete?: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(email.body);
    speechSynthesis.speak(utterance);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this email?");
    if (!confirm) return;

    setDeleting(true);
    try {
      const token = sessionStorage.getItem("auth_token");
      const res = await fetch(`/api/email/${email.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Email deleted");
        onDelete?.(email.id); // remove from UI
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting email");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{email.subject}</h3>
          <p className="text-sm text-gray-500 mb-2">From: {email.from}</p>
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
            onClick={handleDelete}
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
