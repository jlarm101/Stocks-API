
import React, { useState } from 'react';
import axios from 'axios';
import '../StockPrices.css'; 
import config from '../config/config';


const StockPrices = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null); 
      setLoading(true);
      const apiKey = config.apiKey;
      const apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${stockSymbol}?apikey=${apiKey}`;

      const response = await axios.get(apiUrl);
      
      // Check if the response is empty 
      if (!response.data || response.data.length === 0) {
        setError('No data found for the provided stock symbol.');
        setStockPrice(null);
      } else {
        setStockPrice(response.data[0]);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setError('Error fetching stock price. Please try again later.');
      setStockPrice(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Find Stock Price</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <span className="label-text">Stock Symbol:</span>
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            className="input"
          />
        </label>
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Loading...' : 'Get Price'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {stockPrice && (
        <div className="result">
          <h3 className="result-header">Stock Price for {stockSymbol}</h3>
          <p className="result-item">Price: {stockPrice.price}</p>
        </div>
      )}
    </div>
  );
};

export default StockPrices;









