import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/Fantasy.png"; // Update this path to your logo image

function FanatsyBox({ isAuthenticated }) {
  return (
    <div className="h-[246.72px]   bg-gradient-to-r from-cyan-400 to-blue-500 p-4 flex flex-col justify-between ">
      {/* Middle Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center mr-auto relative left-[18vw] sm:left-[18vw]">
          <img src={logo} alt="Fantasy Logo" className="h-18 mr-4" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center space-x-2  mr-auto relative left-[18vw] sm:left-[18vw]">
        {isAuthenticated ? (
          <>
            <Link to="/home" className="bg-green-400 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Home
            </Link>
            <Link to="/squad-selection" className="bg-green-400 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Squad Selection
            </Link>
            <Link to="/help" className="bg-green-400 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Help
            </Link>
            <Link to="/logout" className="bg-green-400 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Home
            </Link>
            <Link to="/prizes" className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Prizes
            </Link>
            <Link to="/scout" className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Scout
            </Link>
            <Link to="/podcast" className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Podcast
            </Link>
            <Link to="/help" className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Help
            </Link>
            <Link to="/statistics"className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              Statistics
            </Link>
            <Link to="/fpl-challenge"className="bg-green-600 text-black font-bold py-7 px-6 rounded hover:bg-gray-200">
              FPL Challenge
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default FanatsyBox;
