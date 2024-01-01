// src/components/HamburgerButton.js
import React from 'react';

export const HamburgerButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-4 text-black focus:outline-none">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  );
};
