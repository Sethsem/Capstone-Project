// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CurrencyConverter from './components/CurrencyConverter';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <CurrencyConverter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
