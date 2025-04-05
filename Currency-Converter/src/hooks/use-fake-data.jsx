import { useState, useEffect } from 'react';

export const useFakeHistoricalRates = (baseCurrency = 'USD') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateFetch = () => {
      // Simulated data similar to the example provided
      const fakeData = {
        base: baseCurrency,
        start_date: '2023-04-01',
        end_date: '2023-04-05',
        rates: {
          '2023-04-01': { EUR: 0.92, GBP: 0.80, JPY: 133.55 },
          '2023-04-02': { EUR: 0.91, GBP: 0.81, JPY: 133.10 },
          '2023-04-03': { EUR: 0.93, GBP: 0.79, JPY: 134.20 },
          '2023-04-04': { EUR: 0.92, GBP: 0.80, JPY: 133.90 },
          '2023-04-05': { EUR: 0.91, GBP: 0.82, JPY: 132.50 },
        },
      };

      setTimeout(() => {
        setData(fakeData);
        setLoading(false);
      }, 1000); // Simulating network delay
    };

    simulateFetch();
  }, [baseCurrency]);

  return { data, loading };
};
