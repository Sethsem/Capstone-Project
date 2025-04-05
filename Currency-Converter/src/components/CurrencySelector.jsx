import React, { useEffect } from 'react';
import useCurrencyStore from '../components/useCurrencyStore';

const CurrencySelector = ({ selectedCurrency, onChange }) => {
  const { currencies, fetchCurrencies } = useCurrencyStore();

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <select 
      value={selectedCurrency}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded bg-[#243647]"
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
