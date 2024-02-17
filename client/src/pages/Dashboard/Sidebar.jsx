import React from "react";
import { Link } from "react-router-dom";
import { FaInbox, FaPaperPlane, FaFile, FaTrash } from "react-icons/fa";

function Sidebar({ onPageChange }) {
  return (
    <div>
      <button onClick={() => onPageChange("inbox")}>Inbox</button>
      <button onClick={() => onPageChange("spam")}>Spam</button>
      <button onClick={() => onPageChange("trash")}>Trash</button>
    </div>
  );
}

export default Sidebar;
