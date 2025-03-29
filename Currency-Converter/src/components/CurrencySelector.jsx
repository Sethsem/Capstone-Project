import React from 'react';

const CurrencySelector = ({ value, onChange, currencies }) => {
  return (
    <select
      className="p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
