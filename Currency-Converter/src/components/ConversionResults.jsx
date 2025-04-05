import React from 'react';

const ConversionResults = ({ result }) => (
  <div className="mt-4 text-xl text-gray-800">
    {result ? `Converted Amount: ${result}` : 'Enter amount to convert'}
  </div>
);

export default ConversionResults;
