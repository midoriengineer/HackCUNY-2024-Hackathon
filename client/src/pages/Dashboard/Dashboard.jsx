import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("inbox");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Container>
          <Row>
            <Col sm={2}>
              <Sidebar onPageChange={handlePageChange} />
            </Col>
            <Col sm={10}>
              {currentPage === "inbox" && <Inbox />}
              {currentPage === "spam" && <Spam />}
              {currentPage === "trash" && <Trash />}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
