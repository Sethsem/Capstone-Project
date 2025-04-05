import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import useCurrencyStore from './useCurrencyStore';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

// Function to generate historical data dynamically
const generateFakeData = (baseCurrency = 'USD') => {
  // Helper function to get the date in 'YYYY-MM-DD' format
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to simulate an exchange rate (e.g., EUR, GBP, JPY)
  const generateExchangeRate = () => {
    return {
      EUR: (Math.random() * (0.95 - 0.85) + 0.85).toFixed(2),  // Simulated EUR rate
      GBP: (Math.random() * (0.85 - 0.75) + 0.75).toFixed(2),  // Simulated GBP rate
      JPY: (Math.random() * (135 - 130) + 130).toFixed(2),    // Simulated JPY rate
    };
  };

  // Get today's date
  const today = new Date();
  
  // Generate the data for the last 14 days
  const generatedData = {};
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);  // Subtract days to get previous dates
    const formattedDate = getFormattedDate(date);
    generatedData[formattedDate] = generateExchangeRate();
  }

  return {
    base: baseCurrency,
    start_date: getFormattedDate(new Date(today.setDate(today.getDate() - 13))),  // Start date (two weeks ago)
    end_date: getFormattedDate(new Date()),  // End date (today)
    rates: generatedData,
  };
};

const SingleCurrencyLineChart = ({ baseCurrency = 'USD', targetCurrency = 'EUR' }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { selectedToCurrency, selectedFromCurrency  } = useCurrencyStore();

  // Simulate fetching historical data for one currency
  useEffect(() => {
    const simulateHistoricalData = () => {
      
      const fakeData = generateFakeData(baseCurrency); // Generate dynamic fake data

      // Transform data for the Line Chart
      const labels = Object.keys(fakeData.rates); // Dates
      const dataPoints = labels.map((date) => fakeData.rates[date][targetCurrency]);

      const chartFormattedData = {
        labels,
        datasets: [
          {
            label: `${selectedFromCurrency} to ${selectedToCurrency}`,
            data: dataPoints,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
          },
        ],
      };

      setChartData(chartFormattedData);
      setLoading(false);
    };

    simulateHistoricalData();
  }, [baseCurrency, targetCurrency, selectedToCurrency, selectedFromCurrency]);

  if (loading) return <div>Loading chart...</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Exchange Rate: ${selectedFromCurrency} to ${selectedToCurrency}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Exchange Rate',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="border-2 rounded-2xl " style={{ width: '600px', margin: '0 auto' }}>
      <h3 className='text-center font-bold p-10'>{`Exchange Rate for ${targetCurrency}`}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SingleCurrencyLineChart;







// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import useCurrencyStore from './useCurrencyStore';
// import {useFakeHistoricalRates} from "../hooks/use-fake-data"


// const HistoricalExchangeGraph = () => {
//   const { selectedToCurrency, selectedFromCurrency  } = useCurrencyStore();
//   // const [dataPoints, setDataPoints] = useStaaate([]);
//   const { loading, data: dataPoints} = useFakeHistoricalRates()

//   console.log(selectedFromCurrency);
//   useEffect(() => {
//     const fetchHistoricalRates = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.exchangerate-api.com/v4/history/${selectedFromCurrency}`
//         );
//         const { rates } = res.data;

        
//         const processedData = Object.keys(rates).map((date) => ({
//           date,
//           rate: rates[date][selectedToCurrency],
//         }));

//         // Store the last 7 days' data
//         setDataPoints(processedData.slice(-7));
//       } catch (err) {
//         console.error('Error fetching historical data:', err);
//       }
//     };
//     fetchHistoricalRates();
//   }, [selectedFromCurrency, selectedToCurrency]);

//   // Prepare the data for the chart
//   const chartData = {
//     labels: dataPoints.map((entry) => entry.date),
//     datasets: [
//       {
//         label: `${selectedFromCurrency} to ${selectedToCurrency} Rates`,
//         data: dataPoints.map((entry) => entry.rate),
//         borderColor: '#4f46e5',
//         backgroundColor: 'rgba(79, 70, 229, 0.2)',
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="p-4 mt-4">
//       <h2 className="text-xl font-semibold mb-2">Historical Exchange Rates (7 Days)</h2>
//       {dataPoints.length ? (
//         <Line data={chartData} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default HistoricalExchangeGraph;
