import React from "react";
import { Link } from "react-router-dom";
import { FaInbox, FaPaperPlane, FaFile, FaTrash } from "react-icons/fa";

function Sidebar({ onPageChange }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-screen">
      <button
        className="flex items-center px-4 py-6 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("inbox")}
      >
        <FaInbox size={30} />
        <span className="ml-2 text-xl">Inbox</span>
      </button>
      <button
        className="flex items-center px-4 py-6 mb-2 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("spam")}
      >
        <FaPaperPlane size={30} />
        <span className="ml-2 text-xl">Spam</span>
      </button>
      <button
        className="flex items-center px-4 py-6 text-sm leading-5 font-medium rounded-lg hover:bg-gray-700"
        onClick={() => onPageChange("trash")}
      >
        <FaTrash size={30} />
        <span className="ml-2 text-xl">Trash</span>
      </button>
    </div>
  );
}

export default Sidebar;
