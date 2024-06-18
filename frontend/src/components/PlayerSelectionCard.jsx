import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerSelectionCard = ({ isAuthenticated }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [sortField, setSortField] = useState('total_points');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mapping element_type to position
  const positionMap = {
    1: 'Goalkeeper',
    2: 'Defender',
    3: 'Midfielder',
    4: 'Attacker',
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/players/');
        setPlayers(response.data);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const filtered = players.filter(player => {
      const position = positionMap[player.element_type] || 'Unknown';
      const positionMatch = positionFilter === 'all' || position.toLowerCase() === positionFilter.toLowerCase();
      const nameMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '';
      return positionMatch && nameMatch;
    });

    // Sort filtered players based on the sortField and sortDirection
    const sorted = [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setFilteredPlayers(sorted);
  }, [players, positionFilter, searchQuery, sortField, sortDirection]);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = direction => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPlayers.length === playersPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePositionFilterChange = event => setPositionFilter(event.target.value);
  const handleSortFieldChange = event => setSortField(event.target.value);
  const handleSortDirectionChange = event => setSortDirection(event.target.value);
  const handleSearchInputChange = event => setSearchQuery(event.target.value);

  // Human-readable field names for display in the table header
  const fieldNames = {
    total_points: 'Total Points',
    assists: 'Assists',
    bonus: 'Bonus',
    bps: 'BPS',
    clean_sheets: 'Clean Sheets',
    creativity: 'Creativity',
    goals_conceded: 'Goals Conceded',
    goals_scored: 'Goals Scored',
    ict_index: 'ICT Index',
    influence: 'Influence',
    minutes: 'Minutes',
    own_goals: 'Own Goals',
    penalties_missed: 'Penalties Missed',
    penalties_saved: 'Penalties Saved',
    red_cards: 'Red Cards',
    saves: 'Saves',
    threat: 'Threat',
    yellow_cards: 'Yellow Cards',
  };

  return (
    <div className="player-selection-card bg-gray-100 rounded-lg p-4 mt-10 w-2/6 ml-auto mr-28">
      <div className="filter-container mb-4">
        <div className="mb-2">
          <label htmlFor="position" className="block font-bold mb-1">Position:</label>
          <select id="position" value={positionFilter} onChange={handlePositionFilterChange} className="w-full border-gray-300 rounded-md">
            <option value="all">All Positions</option>
            <option value="goalkeeper">Goalkeeper</option>
            <option value="defender">Defender</option>
            <option value="midfielder">Midfielder</option>
            <option value="attacker">Attacker</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="sort-field" className="block font-bold mb-1">Sorted By:</label>
          <select id="sort-field" value={sortField} onChange={handleSortFieldChange} className="w-full border-gray-300 rounded-md">
            {Object.keys(fieldNames).map(key => (
              <option key={key} value={key}>{fieldNames[key]}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="sort-direction" className="block font-bold mb-1">Sort Direction:</label>
          <select id="sort-direction" value={sortDirection} onChange={handleSortDirectionChange} className="w-full border-gray-300 rounded-md">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="block font-bold mb-1">Search:</label>
          <input type="text" id="search" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search for player..." className="w-full border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="player-list">
        <h3 className="text-lg font-bold mb-2">{positionFilter === 'all' ? 'All Players' : positionFilter.charAt(0).toUpperCase() + positionFilter.slice(1) + 's'}</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Position</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">{fieldNames[sortField]}</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-300">
                <td className="py-2 px-4">{player.name}</td>
                <td className="py-2 px-4">{positionMap[player.element_type] || 'Unknown'}</td>
                <td className="py-2 px-4">{player.price}</td>
                <td className="py-2 px-4">{player[sortField]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4">
        <button
          onClick={() => paginate('prev')}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Prev
        </button>
        <button
          onClick={() => paginate('next')}
          disabled={currentPlayers.length < playersPerPage}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlayerSelectionCard;
