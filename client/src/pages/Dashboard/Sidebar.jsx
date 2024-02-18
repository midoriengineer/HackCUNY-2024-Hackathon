import React from "react";
import { Link } from "react-router-dom";
import { FaInbox, FaPaperPlane, FaFile, FaTrash } from "react-icons/fa";

function Sidebar({ onPageChange }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <button
        className="flex items-center p-2 mb-2 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("inbox")}
      >
        <FaInbox size={20} />
        <span className="ml-2">Inbox</span>
      </button>
      <button
        className="flex items-center p-2 mb-2 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("spam")}
      >
        <FaPaperPlane size={20} />
        <span className="ml-2">Spam</span>
      </button>
      <button
        className="flex items-center p-2 mb-2 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("trash")}
      >
        <FaTrash size={20} />
        <span className="ml-2">Trash</span>
      </button>
    </div>
  );
}

export default Sidebar;
