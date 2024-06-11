import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FanatsyBar from '../components/FanatsyBar';
import FanatsyBox from '../components/FantasyBox';
import { ACCESS_TOKEN } from '../constants';
import PickYourSquad from '../components/PickYourSquad';
import Login from './Login';

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
      {isAuthenticated ? (
        <div className="relative right-[18vw] sm:right-[18vw]">
          <PickYourSquad />
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
  
}

export default Home;
