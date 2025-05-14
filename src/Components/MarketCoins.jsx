import React, { useEffect, useState } from 'react';

const MarketCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with your actual base URL
  const API_URL = 'http://localhost:3000/api/markets/all'; // or from .env

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(response);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCoins(data.data); // assuming `data.data` holds the coins array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p>Loading coins...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='MarketCoins'>
      <h2>Top Market Coins</h2>
      <ul>
        {coins.slice(0, 10).map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}) - ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketCoins;
