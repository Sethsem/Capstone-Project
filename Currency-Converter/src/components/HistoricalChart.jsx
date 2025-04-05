import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import useCurrencyStore from '../components/useCurrencyStore';

ChartJS.register(
  Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement
);

const HistoricalChart = () => {
  const { selectedFromCurrency, selectedToCurrency, historicalData, fetchHistoricalData } = useCurrencyStore();

  useEffect(() => {
    if (selectedFromCurrency && selectedToCurrency) {
      fetchHistoricalData(selectedFromCurrency, selectedToCurrency);
    }
  }, [selectedFromCurrency, selectedToCurrency, fetchHistoricalData]);

  const dates = historicalData.map((item) => item.date);
  const rates = historicalData.map((item) => item.rate);

  const data = {
    labels: dates,
    datasets: [
      {
        label: `Exchange Rate (${selectedFromCurrency} to ${selectedToCurrency})`,
        data: rates,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow-md ">
      <h3 className="text-lg mb-2">Historical Exchange Rate (Last 7 Days)</h3>
      <Line data={data} />
    </div>
  );
};

export default HistoricalChart;
