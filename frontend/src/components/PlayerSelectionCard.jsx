import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerSelectionCard = ({ isAuthenticated }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10); // Number of players per page

  useEffect(() => {
    // Fetch all players from the API
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
    // Filter players based on position and search query
    const filtered = players.filter(player => {
      const positionMatch = positionFilter === 'all' || player.position === positionFilter;
      const nameMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '';
      return positionMatch && nameMatch;
    });
    setFilteredPlayers(filtered);
  }, [players, positionFilter, searchQuery]);

  // Pagination logic
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

  // Handlers for position filter and search query
  const handlePositionFilterChange = event => setPositionFilter(event.target.value);
  const handleSearchInputChange = event => setSearchQuery(event.target.value);

  return (
    <div className="player-selection-card bg-gray-100 rounded-lg p-4">
      {/* Filters and search input */}
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
        <div>
          <label htmlFor="search" className="block font-bold mb-1">Search:</label>
          <input type="text" id="search" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search for player..." className="w-full border-gray-300 rounded-md" />
        </div>
      </div>

      {/* Player list */}
      <div className="player-list">
        <h3 className="text-lg font-bold mb-2">{positionFilter === 'all' ? 'All Players' : positionFilter.charAt(0).toUpperCase() + positionFilter.slice(1) + 's'}</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Element type</th>

              {/* Add other table headers */}
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-300">
                <td className="py-2 px-4">{player.name}</td>
                <td className='py-2 px-4'>{player.element_type}</td>
                {/* Add other table data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
