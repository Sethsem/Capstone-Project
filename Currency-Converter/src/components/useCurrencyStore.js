import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
  baseCurrency: 'USD',
  targetCurrency: 'EUR',
  amount: 1,
  result: '',
  historicalData: [],
  setBaseCurrency: (currency) => set({ baseCurrency: currency }),
  setTargetCurrency: (currency) => set({ targetCurrency: currency }),
  setAmount: (value) => set({ amount: value }),
  setResult: (value) => set({ result: value }),
  setHistoricalData: (data) => set({ historicalData: data }),
}));

export default useCurrencyStore;
