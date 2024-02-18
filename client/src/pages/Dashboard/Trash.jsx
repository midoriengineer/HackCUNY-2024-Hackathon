import React from "react";

function Trash({folder}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Trash</h3>
      </div>
    // <div className="trash">
    //   <h3>Trash</h3>
    //   {folder.length < 1 ? <p>This folder is empty.</p>: null }
    // </div>
  );
}

export default Trash;
