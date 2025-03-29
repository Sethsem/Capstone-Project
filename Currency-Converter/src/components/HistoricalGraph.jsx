import React from 'react';
import { Line } from 'react-chartjs-2';
import useCurrencyStore from './useCurrencyStore';


const HistoricalChart = () => {
  const { historicalData, baseCurrency, targetCurrency } = useCurrencyStore();

  const data = {
    labels: historicalData.map((point) => point.date),
    datasets: [
      {
        label: `Exchange Rate: ${baseCurrency} to ${targetCurrency}`,
        data: historicalData.map((point) => point.rate),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h3 className="text-lg font-semibold">Historical Exchange Rate</h3>
      <Line data={data} />
    </div>
  );
};

export default HistoricalChart;
