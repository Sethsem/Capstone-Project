import React from 'react';

const ConversionResults = ({ result }) => {
  return (
    <div className="mt-4 p-3 bg-green-100 rounded">
      <h3 className="text-lg font-semibold">Converted Amount:</h3>
      <p className="text-xl">{result}</p>
    </div>
  );
};

export default ConversionResults;
