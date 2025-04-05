import { create } from 'zustand';
import axios from 'axios';

const useCurrencyStore = create((set) => ({
  currencies: [],
  selectedFromCurrency: 'USD',
  selectedToCurrency: 'EUR',
  amount: 1,
  exchangeRate: null,


  fetchCurrencies: async () => {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      console.log(response?.data)
      const currencies = Object.keys(response.data.rates);
      set({ currencies });
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  },

  fetchExchangeRate: async (from, to) => {
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
      const rate = response.data.rates[to];
      set({ exchangeRate: rate });
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  },

  setSelectedFromCurrency: (currency) => set({ selectedFromCurrency: currency }),
  setSelectedToCurrency: (currency) => set({ selectedToCurrency: currency }),
  setAmount: (value) => set({ amount: value }),
  setExchangeRate: (rate) => set({ exchangeRate: rate }),
}));

export default useCurrencyStore;
