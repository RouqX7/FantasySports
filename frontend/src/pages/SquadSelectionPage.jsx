import React from 'react';
import Navbar from '../components/Navbar';
import FanatsyBar from '../components/FanatsyBar';
import FanatsyBox from '../components/FantasyBox';
import PlayerSelectionCard from '../components/PlayerSelectionCard';
import ClubSites from '../components/ClubSites';

const SquadSelectionPage = ({ isAuthenticated }) => {
  return (
    <div>
    <ClubSites />
      <Navbar />
      <FanatsyBar />
      <FanatsyBox isAuthenticated={isAuthenticated} />
          <PlayerSelectionCard isAuthenticated={isAuthenticated} /> {/* Render PlayerSelectionCard component */}
    </div>
  );
};

export default SquadSelectionPage;
