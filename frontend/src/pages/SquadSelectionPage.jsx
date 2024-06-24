import React, { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";
import Navbar from "../components/Navbar";
import FanatsyBar from "../components/FanatsyBar";
import FanatsyBox from "../components/FantasyBox";
import PlayerSelectionCard from "../components/PlayerSelectionCard";
import ClubSites from "../components/ClubSites";
import SquadSelectionCard from "../components/SquadSelectionCard";

function SquadSelectionPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelect = (player) => {
    const positionMap = {
      1: { min: 0, max: 1 },
      2: { min: 2, max: 6 },
      3: { min: 7, max: 11 },
      4: { min: 12, max: 14 },
    };
    
    const positionRange = positionMap[player.element_type];
    const emptyIndex = selectedPlayers.findIndex((p, index) => index >= positionRange.min && index <= positionRange.max && p === null);

    if (emptyIndex !== -1) {
      const newSelectedPlayers = [...selectedPlayers];
      newSelectedPlayers[emptyIndex] = player;
      setSelectedPlayers(newSelectedPlayers);
    }
  };


  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      <ClubSites />
      <Navbar />
      <FanatsyBar />
      <FanatsyBox isAuthenticated={isAuthenticated} />
      <div className="flex">
        <SquadSelectionCard selectedPlayer={selectedPlayer} />
        <PlayerSelectionCard isAuthenticated={isAuthenticated} onPlayerSelect={handlePlayerSelect} />
      </div>
    </div>
  );
}

export default SquadSelectionPage;
