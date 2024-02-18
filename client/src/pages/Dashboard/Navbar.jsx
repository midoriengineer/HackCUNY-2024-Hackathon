import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <div className="bg-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Email Dashboard</h1>
      <div className="flex items-center">
        <FaUserCircle size={32} />
        <span className="ml-2">John Doe</span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/inbox"
            className="nav-link text-white"
            style={{
              textDecoration: "none",
              padding: "15px 20px",
              display: "block",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Inbox
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/spam"
            className="nav-link text-white"
            style={{
              textDecoration: "none",
              padding: "15px 20px",
              display: "block",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Spam
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/trash"
            className="nav-link text-white"
            style={{
              textDecoration: "none",
              padding: "15px 20px",
              display: "block",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Trash
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
