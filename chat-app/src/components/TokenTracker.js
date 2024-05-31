// src/components/TokenTracker.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TokenTracker = () => {
  const [tokensUsed, setTokensUsed] = useState(0);

  useEffect(() => {
    const fetchTokenUsage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/token-usage', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTokensUsed(response.data.tokensUsed);
      } catch (error) {
        console.error('Error fetching token usage:', error);
      }
    };

    fetchTokenUsage();
  }, []);

  return (
    <div className="p-4 text-center bg-white shadow-md rounded-md">
      <p className="text-lg font-semibold">Tokens Used: {tokensUsed}</p>
    </div>
  );
};

export default TokenTracker;
