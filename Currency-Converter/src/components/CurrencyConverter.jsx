import React, { useState } from 'react';
import CurrencySelector from './CurrencySelector';
import SwapButton from './SwapButton';
import ConversionResults from './ConversionResults';
import HistoricalChart from './HistoricalChart';
import axios from 'axios';

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState('');
  const [historicalData, setHistoricalData] = useState([]);

  const handleSwap = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  const convertCurrency = async () => {
    try {
      // Fetch conversion rate from an API
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const rate = response.data.rates[targetCurrency];
      setResult((amount * rate).toFixed(2));

     
      const historicalResponse = [
        { date: '2025-03-25', rate: rate * 0.98 },
        { date: '2025-03-26', rate: rate * 0.99 },
        { date: '2025-03-27', rate: rate },
        { date: '2025-03-28', rate: rate * 1.01 },
        { date: '2025-03-29', rate: rate * 1.02 },
      ];
      setHistoricalData(historicalResponse);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setResult('Error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-6">
      <div className="flex gap-2 mb-4 justify-center">
        <CurrencySelector
          value={baseCurrency}
          onChange={setBaseCurrency}
          currencies={['USD', 'EUR', 'GBP', 'JPY']}
        />
        <SwapButton onClick={handleSwap} />
        <CurrencySelector
          value={targetCurrency}
          onChange={setTargetCurrency}
          currencies={['USD', 'EUR', 'GBP', 'JPY']}
        />
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter amount"
      />

      <button
        onClick={convertCurrency}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Convert
      </button>

      <ConversionResults result={result} />
      {historicalData.length > 0 && <HistoricalChart data={historicalData} />}
    </div>
  );
};

export default CurrencyConverter;
