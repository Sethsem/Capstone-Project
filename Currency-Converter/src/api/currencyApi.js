import axios from "axios";

const API_URL = "https://api.exchangerate-api.com/v4/latest"; // Replace with the actual API URL you’re using

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    return response.data;  // Return the data if the request is successful
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates");
  }
};

export const fetchHistoricalRates = async (baseCurrency, date) => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/${date}/${baseCurrency}`);
    return response.data; // Return the historical data
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    throw new Error("Failed to fetch historical data");
  }
};
