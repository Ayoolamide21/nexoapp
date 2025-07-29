import React, { useEffect, useState } from 'react';

function CryptoTable() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,usd-coin')
      .then(res => res.json())
      .then(data => setCoins(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto text-gray-800">
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
          <tr>
            {['Name', 'Price', '24h Change', 'Market Cap', 'Supply'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr
              key={coin.id}
              className="border-b hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-red-100 transition-colors"
            >
              <td className="px-4 py-3 flex items-center gap-2">
                <img src={coin.image} alt={coin.symbol} className="w-6 h-6" />
                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              </td>
              <td className="px-4 py-3">${coin.current_price.toLocaleString()}</td>
              <td className={`px-4 py-3 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-4 py-3">${coin.market_cap.toLocaleString()}</td>
              <td className="px-4 py-3">{coin.circulating_supply.toLocaleString()}</td>
              <td className="px-4 py-3">
                <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">Learn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;
