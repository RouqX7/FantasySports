import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('/api/teams/')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id} className="border p-2 mb-2">{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
