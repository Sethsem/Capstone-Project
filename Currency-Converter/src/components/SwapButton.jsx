import React from 'react';

const SwapButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Swap
  </button>
);

export default SwapButton;
