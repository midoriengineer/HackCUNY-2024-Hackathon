import React from 'react';

function EmailModal({ email, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <button className="text-gray-500 hover:text-gray-700 font-semibold mb-4" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-gray-700">
          <p><strong>From:</strong> {email.from}</p>
          <p><strong>Subject:</strong> {email.subject}</p>
          <p><strong>Body:</strong></p>
          <div className="bg-gray-100 p-4 rounded-lg w-auto h-64 overflow-y-auto">
            <p>{email.message.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailModal;