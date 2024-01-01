import React from 'react';

export const SideBar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      {/* Sidebar content goes here */}
      <button onClick={onClose} className="absolute top-2 right-2 p-2 focus:outline-none">
        Close
      </button>
    </div>
  )
}
