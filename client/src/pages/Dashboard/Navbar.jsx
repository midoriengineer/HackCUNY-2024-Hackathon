import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <div
      className="left-nav-bar bg-gradient-to-b from-purple-600 via-pink-600 to-orange-500 col-2 p-0"
      style={{
        minHeight: "100vh",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="logo text-white p-3"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Email Dashboard
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
