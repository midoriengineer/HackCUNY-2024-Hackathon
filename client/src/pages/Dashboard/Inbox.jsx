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
    <div className="p-4 bg-white rounded-lg shadow h-screen">
      <h2 className="text-xl font-semibold mb-2">Inbox</h2>
      {folder.length < 1 ? <p>This folder is empty.</p> : 
        folder.map((email, index) => (
          <div key={index} className="cursor-pointer" onClick={() => handleEmailClick(email)}>
            <p>
              {email.from} | {email.subject} | {email.phish ? 'Phishing' : 'Safe'}
            </p>
          </div>
        ))
      }

      {selectedEmail && (
        <EmailModal email={selectedEmail} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default Inbox;