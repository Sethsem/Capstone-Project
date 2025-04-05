import React from 'react';

const Button = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    {label}
  </button>
);

export default Button;
