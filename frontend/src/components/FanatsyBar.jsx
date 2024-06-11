import React from "react";
import { Link } from "react-router-dom";

function FanatsyBar() {
  return (
    <div className="bg-white p-4">
      <div className="px-56 flex justify-between items-center">
        <div className="flex space-x-14">
          <Link to="/fantasy" className=" text-2xl font-bold text-gray-400">
            Fantasy
          </Link>
          <Link to="/fantasy-challenge" className="text-2xl font-bold text-gray-400">
            Fantasy Challenge
          </Link>
          <Link to="/fantasy-draft" className="text-2xl font-bold text-gray-400">
            Fantasy Draft
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FanatsyBar;
