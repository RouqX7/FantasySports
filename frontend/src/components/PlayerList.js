import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('/api/players/')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the players!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <ul>
        {players.map(player => (
          <li key={player.id} className="border p-2 mb-2">{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
