import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <h1>Email Dashboard</h1>
      <div className="user">
        <FaUserCircle size={32} />
        <span>John Doe</span>
      </div>
    </div>
  );
}

export default Navbar;
