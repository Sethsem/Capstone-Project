import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import useCurrencyStore from './useCurrencyStore';

const HistoricalExchangeGraph = () => {
  const { fromCurrency, toCurrency } = useCurrencyStore();
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const res = await axios.get(
          `https://api.exchangerate-api.com/v4/history/${fromCurrency}`
        );
        const { rates } = res.data;

        // Process the data
        const processedData = Object.keys(rates).map((date) => ({
          date,
          rate: rates[date][toCurrency],
        }));

        // Store the last 7 days' data
        setDataPoints(processedData.slice(-7));
      } catch (err) {
        console.error('Error fetching historical data:', err);
      }
    };
    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  // Prepare the data for the chart
  const chartData = {
    labels: dataPoints.map((entry) => entry.date),
    datasets: [
      {
        label: `${fromCurrency} to ${toCurrency} Rates`,
        data: dataPoints.map((entry) => entry.rate),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <Card className="p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">Historical Exchange Rates (7 Days)</h2>
      {dataPoints.length ? (
        <Line data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
};

export default HistoricalExchangeGraph;
