// src/components/HistoricalChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Exchange Rate',
        data: data.map((entry) => entry.rate),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 rounded mt-4">
      <h3 className="text-lg font-semibold mb-2">Historical Exchange Rate</h3>
      <Line data={chartData} />
    </div>
  );
};

export default HistoricalChart;
