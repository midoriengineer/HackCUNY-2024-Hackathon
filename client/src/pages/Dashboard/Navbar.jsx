import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center"></h1>
      <div className="flex items-center">
        {/* <FaUserCircle size={32} /> */}
      </div>
    </div>
  );
};

export default NavBar;
