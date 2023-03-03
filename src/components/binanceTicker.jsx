import React, { useState, useEffect } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket'

function BinanceTicker({ symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@ticker`);

    ws.onopen = () => {
      console.log(`WebSocket connection established for ${symbol}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.c);
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for ${symbol}`);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return (
    <div>
      <h1>{symbol} Price</h1>
      <p>{price ? `$${price}` : 'Loading...'}</p>
    </div>
  );
}

export default BinanceTicker;
