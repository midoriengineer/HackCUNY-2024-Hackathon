import React from "react";

function Inbox({ folder }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Inbox</h2>
      {folder.length < 1 ? <p>This folder is empty.</p> : 
        folder.map((email, index) => (
          <div key={index}>
            <p>
              {email.from} | {email.subject} | {email.phish ? 'Phishing' : 'Safe'}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default Inbox;
