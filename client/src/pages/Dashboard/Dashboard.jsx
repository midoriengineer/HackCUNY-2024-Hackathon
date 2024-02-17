import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("inbox");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Sidebar onPageChange={handlePageChange} />
        {currentPage === "inbox" && <Inbox />}
        {currentPage === "spam" && <Sent />}
        {currentPage === "trash" && <Trash />}
      </div>
    </div>
  );
}

export default Dashboard;
