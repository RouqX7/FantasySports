import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FanatsyBar from '../components/FanatsyBar';
import FanatsyBox from '../components/FantasyBox';
import { ACCESS_TOKEN } from '../constants';
import PickYourSquad from '../components/PickYourSquad';
import Login from './Login';
import JoinAndCreate from '../components/JoinAndCreate';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      <Navbar />
      <FanatsyBar />
      <FanatsyBox isAuthenticated={isAuthenticated} />
      <div className="flex">
        <div className="relative left-[18.5vw] sm:left-[18.5vw]">
          <PickYourSquad isAuthenticated={isAuthenticated} />
        </div>
        {isAuthenticated && (
          <div className="relative left-[20vw] sm:left-[20vw]">
            <JoinAndCreate isAuthenticated={isAuthenticated} />
          </div>
          
          
          
        )}
      </div>
      {!isAuthenticated && <Login />}
    </div>
  );
}

export default Home;
