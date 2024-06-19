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
        <SquadSelectionCard />
        <PlayerSelectionCard isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}

export default SquadSelectionPage;
