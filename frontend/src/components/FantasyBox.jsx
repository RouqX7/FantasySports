import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/react.svg"; // Update this path to your logo image

function FanatsyBox({ isAuthenticated }) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 h-80 flex flex-col justify-between">
      {/* Middle Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center">
          <img src={logo} alt="Fantasy Logo" className="h-16 mr-4" />
          <span className="text-4xl font-bold text-white">Fantasy</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="px-[990px] h-10 space-x-2">
        {isAuthenticated ? (
          <>
            <Link
              to="/home"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Home
            </Link>
            <Link
              to="/squad-selection"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Squad Selection
            </Link>
            <Link
              to="/help"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Help
            </Link>
            <Link
              to="/logout"
              className="bg-red-500 text-white font-bold py-7 px-6 rounded hover:bg-red-600"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/home"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Home
            </Link>
            <Link
              to="/prizes"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Prizes
            </Link>
            <Link
              to="/scout"
              className="bg-white text-black font-bold py-7 px-6 rounded hover:bg-gray-200"
            >
              Scout
            </Link>
            <Link
              to="/podcast"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Podcast
            </Link>
            <Link
              to="/help"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Help
            </Link>
            <Link
              to="/statistics"
              className="bg-green-500 text-black font-bold py-7 px-6 rounded hover:bg-green-600"
            >
              Statistics
            </Link>
            <Link
              to="/fpl-challenge"
              className="bg-purple-500 text-white font-bold py-7 px-6 rounded hover:bg-purple-600"
            >
              FPL Challenge
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default FanatsyBox;
