import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeagueList = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    axios.get('/api/leagues/')
      .then(response => {
        setLeagues(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the leagues!', error);
      });
  }, []);

  return (
    <div>
      <h1>Leagues</h1>
      <ul>
        {leagues.map(league => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeagueList;
