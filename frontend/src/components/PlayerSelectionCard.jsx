import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerSelectionCard = ({ isAuthenticated }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/players/');
        console.log('Fetched players:', response.data); // Debugging: log fetched data
        setPlayers(response.data);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const filtered = players.filter(player => {
      const positionMatch = positionFilter === 'all' || player.element_type.toString() === positionFilter;
      const nameMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '';
      return positionMatch && nameMatch;
    });
    console.log('Filtered players:', filtered); // Debugging: log filtered data
    setFilteredPlayers(filtered);
  }, [players, positionFilter, searchQuery]);

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
  const handleSearchInputChange = event => setSearchQuery(event.target.value);

  return (
    <div className="player-selection-card bg-gray-100 rounded-lg p-4">
      <div className="filter-container mb-4">
        <div className="mb-2">
          <label htmlFor="position" className="block font-bold mb-1">Element Type:</label>
          <select id="position" value={positionFilter} onChange={handlePositionFilterChange} className="w-full border-gray-300 rounded-md">
            <option value="all">All Types</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="block font-bold mb-1">Search:</label>
          <input type="text" id="search" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search for player..." className="w-full border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="player-list">
        <h3 className="text-lg font-bold mb-2">{positionFilter === 'all' ? 'All Players' : `Element Type ${positionFilter}`}</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Element Type</th>
              <th className="py-2 px-4">Price</th>

              {/* Add other table headers */}
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-300">
                <td className="py-2 px-4">{player.name}</td>
                <td className="py-2 px-4">{player.element_type}</td>
                <td className="py-2 px-4">{player.price}</td>

                {/* Add other table data */}
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
