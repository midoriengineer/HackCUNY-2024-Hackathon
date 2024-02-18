import React from "react";

function Inbox() {
  return (
    <div className="inbox">
      <h2 className="mb-4">Inbox</h2>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Email Subject 1</h5>
            <small>2 hours ago</small>
          </div>
          <p className="mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Email Subject 2</h5>
            <small>1 day ago</small>
          </div>
          <p className="mb-1">Nulla vitae elit libero, a pharetra augue.</p>
        </a>
        {/* Add more emails as needed */}
      </div>
    </div>
  );
}

export default Inbox;
