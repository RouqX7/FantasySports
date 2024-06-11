import React from "react";

const PickYourSquad = () => {
  return (
    <div className="max-w-3xl mx-auto my-14  bg-gray-300  shadow-sm">
      <div className="flex h-64">
        {/* Player Selection */}
        <div className="flex  items-center flex-2">
          <div className="text-center">
            <img
              src="src/assets/Nunez.png"
              alt="Nunez"
              className="h-32 w-32 object-cover mx-auto"
            />
          </div>
          <div className="text-center">
            <img
              src="src/assets/Haaland.png"
              alt="Haaland"
              className="h-32 w-32 object-cover mx-auto"
            />
            
          </div>
          <div className="text-center">
            <img
              src="src/assets/Isak.png"
              alt="Isak"
              className="h-32 w-32 object-cover mx-auto"
            />
           
          </div>
        </div>

        {/* Pick Your Squad Info */}
        <div className="flex-1 bg-blue-500 text-white p-6   flex justify-center items-center">
          <div>
            <h2 className="text-2xl font-bold">Pick Your Squad</h2>
            <p>
              Use your budget of £100m to pick a squad of 15 players from the
              Premier League.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickYourSquad;
