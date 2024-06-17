import React from 'react';
import Navbar from '../components/Navbar';
import FanatsyBar from '../components/FanatsyBar';
import FanatsyBox from '../components/FantasyBox';
import PlayerSelectionCard from '../components/PlayerSelectionCard';

const SquadSelectionPage = ({ isAuthenticated }) => {
  return (
    <div>
      <Navbar />
      <FanatsyBar />
      <FanatsyBox isAuthenticated={isAuthenticated} />
      <div className="flex">
        <div className="relative left-[18.5vw] sm:left-[vw]">
          <PlayerSelectionCard isAuthenticated={isAuthenticated} /> {/* Render PlayerSelectionCard component */}
        </div>
      </div>
    </div>
  );
};

export default SquadSelectionPage;
