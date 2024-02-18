import React from 'react';
import EmailModal from './EmailModal';

function Inbox({ folder }) {
  const [selectedEmail, setSelectedEmail] = React.useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleModalClose = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="p-4 bg-light rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

      {folder.length < 1 ? (
        <p className="text-gray-500">This folder is empty.</p>
      ) : (
        folder.map((email, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-4 p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300"
          >
            <div>
              <p className="text-xl font-bold text-gray-800">{email.subject}</p>
              <p className="text-sm text-gray-600">{email.from}</p>
            </div>
            <button
              style={{
                background: email.phish ? "#ff4d4f" : "#52c41a",
                color: "white",
              }}
              className="px-4 py-2 rounded-full"
            >
              {email.phish ? 'Phishing' : 'Safe'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;