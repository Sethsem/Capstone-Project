import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRateGraph from './components/ExchangeRateGraph';
import RecentConversions from './components/RecentConversions';
import Footer from './components/Footer';
import HistoricalExchangeGraph from './components/HistoricalExchangeGraph';

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <HeroSection />
      <main className="p-8">
        <CurrencyConverter />
        <HistoricalExchangeGraph />
        <RecentConversions />
      </main>
      <Footer />
    </div>
  );
};

export default App;
