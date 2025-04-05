import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import useCurrencyStore from './useCurrencyStore';
import axios from 'axios';

const HistoricalGraph = () => {
  const { selectedFromCurrency, selectedToCurrency } = useCurrencyStore();
  const [historicalData, setHistoricalData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(7); // Default 7 days

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeRange);
        const formattedStartDate = startDate.toISOString().split('T')[0];

        const response = await axios.get(
          `https://api.exchangerate.host/timeseries?start_date=${formattedStartDate}&end_date=${endDate}&base=${selectedFromCurrency}&symbols=${selectedToCurrency}`
        );

        const rates = response.data.rates;
        const dates = Object.keys(rates);
        const values = dates.map((date) => rates[date][selectedToCurrency]);

        setLabels(dates);
        setHistoricalData(values);
      } catch (error) {
        setError('Failed to fetch historical data. Please try again later.');
        console.error('Error fetching historical data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [selectedFromCurrency, selectedToCurrency, timeRange]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Exchange Rate',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: `${selectedFromCurrency} to ${selectedToCurrency}`,
        data: historicalData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="historical-graph mt-4 p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Historical Exchange Rate</h3>
        <select
          className="border rounded p-1"
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={180}>Last 180 days</option>
        </select>
      </div>
      
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && <Line data={data} options={options} />}
    </div>
  );
};

export default HistoricalGraph;


