import axios from "axios";

const API_KEY = "your_api_key_here"; // Replace with actual API key
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};
