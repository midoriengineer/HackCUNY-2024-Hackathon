import React from 'react';
import EmailModal from './EmailModal';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import PhishingOutlinedIcon from '@mui/icons-material/PhishingOutlined';

function Inbox({ folder }) {
  const [selectedEmail, setSelectedEmail] = React.useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleModalClose = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg ">
      <h1 className="font-semibold text-white mb-4">Inbox</h1>

      {folder.length < 1 ? (
        <h4 className="text-white">This folder is empty.</h4>
      ) : (
        folder.map((email, index) => (
          <div
            key={index}
            className="cursor-pointer flex items-center justify-between mb-4 p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300"
            onClick={() => handleEmailClick(email)}>
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
                {email.phish ? (
                  <div className="flex">
                    <PhishingOutlinedIcon />
                    <span style={{ marginLeft: '2px' }}>Phishing</span>
                  </div>
                ) : (
                  <div className="flex">
                    <GppGoodOutlinedIcon />
                    <span style={{ marginLeft: '2px' }}>Safe</span>
                  </div>
                )}
              </button>
            </div>
          ))
        )}
        {selectedEmail && (
          <EmailModal email={selectedEmail} onClose={handleModalClose} />
        )}
      </div>
  );
}

export default Inbox;