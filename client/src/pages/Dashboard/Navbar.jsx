import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Email Dashboard</h1>
      <div className="flex items-center">
        <FaUserCircle size={32} />
        <span className="ml-2">John Doe</span>
      </div>
    </div>
  );
}

export default Navbar;
