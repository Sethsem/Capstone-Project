import { useEffect, useState } from "react";
import { fetchExchangeRates } from "./api/currencyApi";

function App() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetchExchangeRates("USD").then((data) => setRates(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Currency Exchange Rates</h1>
      {rates ? <pre>{JSON.stringify(rates, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
