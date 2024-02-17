import React from "react";
import { Link } from "react-router-dom";
import { FaInbox, FaPaperPlane, FaFile, FaTrash } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <FaInbox size={24} />
            <span>Inbox</span>
          </Link>
        </li>
        <li>
          <Link to="/sent">
            <FaPaperPlane size={24} />
            <span>Sent</span>
          </Link>
        </li>
        <li>
          <Link to="/trash">
            <FaTrash size={24} />
            <span>Trash</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
