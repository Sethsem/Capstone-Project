import React from 'react';
import CurrencySelector from './CurrencySelector';
import useCurrencyStore from '../components/useCurrencyStore';

const CurrencyConverter = () => {
  const { 
    selectedFromCurrency, 
    selectedToCurrency, 
    setSelectedFromCurrency, 
    setSelectedToCurrency, 
    amount, 
    setAmount, 
    exchangeRate, 
    fetchExchangeRate 
  } = useCurrencyStore();

  // Swap button logic
  const handleSwap = () => {
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(selectedFromCurrency);
  };

  // Handle conversion
  const handleConvert = async () => {
    await fetchExchangeRate(selectedFromCurrency, selectedToCurrency);
  };

  return (
    <div className="currency-converter p-4 bg-grey-500 rounded shadow w-[50%] m-[auto] pb-20">
      <h2 className="text-xl mb-4">Currency Converter</h2>
      <div className="flex gap-2 mb-4 ">
        <CurrencySelector 
          selectedCurrency={selectedFromCurrency}
          onChange={setSelectedFromCurrency}
        />
        <button 
          onClick={handleSwap} 
          className="swap-button p-2 bg-blue-500 text-white rounded">
          Swap
        </button>
        <CurrencySelector
          selectedCurrency={selectedToCurrency}
          onChange={setSelectedToCurrency}
        />
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded w-[50%] bg-[#334D66]"
        placeholder="Enter amount"
      />
      <button 
        onClick={handleConvert} 
        className="convert-button mt-2 p-2 bg-[#243647] text-white rounded w-[50%] flex justify-center items-center">
        Convert
      </button>
      {exchangeRate && (
        <p className="mt-4">
          {amount} {selectedFromCurrency} = {(amount * exchangeRate).toFixed(2)} {selectedToCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
