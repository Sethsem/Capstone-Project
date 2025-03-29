import { Line } from 'react-chartjs-2';
import useCurrencyStore from './useCurrencyStore';

const ExchangeRateGraph = () => {
  const { history } = useCurrencyStore();

  const data = {
    labels: history.map((_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Rate',
      data: history,
      borderColor: '#4A90E2',
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
    }],
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h3>Exchange Rate Trends</h3>
      <Line data={data} />
    </div>
  );
};

export default ExchangeRateGraph;
