import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";

function Dashboard() {
  return (
    <>
      <Inbox />
      <Trash />
      <Spam />
    </>
  );
}
export default Dashboard;
