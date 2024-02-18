import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("inbox");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar onPageChange={handlePageChange} />
        <div className="flex-1 p-4">
          {currentPage === "inbox" && <Inbox />}
          {currentPage === "spam" && <Spam />}
          {currentPage === "trash" && <Trash />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
