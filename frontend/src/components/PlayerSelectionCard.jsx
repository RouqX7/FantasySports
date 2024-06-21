import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set the root element for the modal
Modal.setAppElement('#root');

const PlayerSelectionCard = ({ isAuthenticated, onPlayerSelect }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(30);
  const [sortField, setSortField] = useState('total_points');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const positionMap = {
    1: 'Goalkeeper',
    2: 'Defender',
    3: 'Midfielder',
    4: 'Attacker',
  };

  const positionAbbreviationMap = {
    1: 'GKP',
    2: 'DEF',
    3: 'MID',
    4: 'ATT',
  };

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
  const handleSearchInputChange = event => setSearchQuery(event.target.value);
  const handleSortFieldChange = event => setSortField(event.target.value);
  const handleSortDirectionChange = event => setSortDirection(event.target.value);

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  const handlePlayerSelect = () => {
    if (selectedPlayer) {
      onPlayerSelect(selectedPlayer); // Pass selected player to parent component
      closeModal();
    }
  };

  return (
    <div className="player-selection-card bg-gray-100 rounded-lg p-4 mt-6 w-auto h-auto  ml-auto relative right-[21.5vw] sm:right-[11.5vw]">
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
          <label htmlFor="sorted-by" className="block font-bold mb-1">Sorted By:</label>
          <select id="sorted-by" value={sortField} onChange={handleSortFieldChange} className="w-full border-gray-300 rounded-md">
            {Object.keys(fieldNames).map(key => (
              <option key={key} value={key}>{fieldNames[key]}</option>
            ))}
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
              <th className="py-2 px-4">Player</th>
              <th className="py-2 px-4">£</th>
              <th className="py-2 px-4">{fieldNames[sortField]}</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-300 cursor-pointer" onClick={() => openModal(player)}>
                <td className="py-2 px-4 flex items-center">
                  <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <div className="font-bold">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.team.name} - {positionAbbreviationMap[player.element_type]}</div>
                  </div>
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="text-xs text-gray-500">£</div>
                  <div>{player.price}</div>
                </td>
                <td className="py-2 px-4 text-center">
                  {player[sortField]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4 flex justify-between">
        <button
          onClick={() => paginate('prev')}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
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

      {selectedPlayer && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-2xl font-bold">&times;</button>
            <h2 className="text-xl font-bold mb-4">{selectedPlayer.name}</h2>
            <div className="flex items-center mb-4">
              <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-bold">{selectedPlayer.team.name}</div>
                <div className="text-sm text-gray-500">{positionMap[selectedPlayer.element_type]}</div>
              </div>
            </div>
            <button
              onClick={handlePlayerSelect}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Select Player
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlayerSelectionCard;
