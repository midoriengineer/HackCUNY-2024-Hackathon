import React from "react";

function Spam({folder}) {
  return (
    <div className="p-4 bg-transparent rounded-lg ">
      <h1 className="font-semibold text-white mb-4">Spam</h1>

      {folder.length < 1 ? (
        <h4 className="text-white">This folder is empty.</h4>
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

export default Spam;
