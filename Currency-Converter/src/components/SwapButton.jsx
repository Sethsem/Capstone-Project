import React from 'react';

const SwapButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
    >
      🔄
    </button>
  );
};

export default SwapButton;
