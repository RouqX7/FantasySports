import React, { useState } from "react";
import PitchSVG from "/src/assets/pitch-default.svg";
import PlayerSelectionCard from "./PlayerSelectionCard";

const SquadSelectionCard = ({ isAuthenticated, onPlayerSelect }) => {
  const [selectedPlayers, setSelectedPlayers] = useState(Array(15).fill(null));
  const [activeTab, setActiveTab] = useState("pitch");

  const positionLabels = [
    "Add Goalkeeper", "Add Goalkeeper",
    "Add Defender", "Add Defender", "Add Defender", "Add Defender", "Add Defender",
    "Add Midfielder", "Add Midfielder", "Add Midfielder", "Add Midfielder", "Add Midfielder",
    "Add Attacker", "Add Attacker", "Add Attacker"
  ];

  const handlePlayerSelect = (player) => {
    const positionMap = {
      1: { max: 1 },     // Goalkeepers
      2: { min: 2, max: 6 },   // Defenders
      3: { min: 7, max: 11 },  // Midfielders
      4: { min: 12, max: 14 }, // Attackers
    };

    const { min, max } = positionMap[player.element_type];
    const emptyIndex = selectedPlayers.findIndex(
      (p, index) => index >= (min || 0) && index <= (max || 14) && p === null
    );

    if (emptyIndex !== -1) {
      const newSelectedPlayers = [...selectedPlayers];
      newSelectedPlayers[emptyIndex] = player;
      setSelectedPlayers(newSelectedPlayers);
    }
  };

  const renderCircle = (index) => {
    const player = selectedPlayers[index];

    return (
      <div className="relative">
        <div className="w-16 h-16 mb-8 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">
          {!player && '+'}
        </div>
        <div className="w-24  flex items-center justify-center text-xs font-medium absolute bottom-0 left-0 right-0 bg-gray-200">
          {!player && positionLabels[index]}
          {player && (
            <div className="border-box rounded-sm text-white bg-red-600 w-[82.64px] h-[28px] flex items-center justify-center mt-1">
              {player.price}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="mt-10 mr-auto relative left-[19vw] sm:left-[19vw] font-bold text-3xl font-premier">
        Squad Selection
      </h1>
      <div className="bg-blue-500 w-[880px] h-[894px] mt-10 mr-auto relative left-[19vw] sm:left-[19vw] mb-[15px] rounded-lg"
           style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 200px, rgb(255, 255, 255) 320px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-184.d7588c45.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))`,
             backgroundPosition: `0px 50%, 100%, 0px`,
             backgroundRepeat: `no-repeat, no-repeat, no-repeat`,
           }}>
        <div className="bg-sky-200 w-[864.25px] h-[125px] ml-2 mt-4 rounded-lg">
          <div className="w-[848px] h-[66px] ml-2 flex">
            <div className="w-[424px] h-[46px] mt-2 flex flex-col items-center justify-start">
              <h3 className="font-premier text-sm font-medium">
                Players Selected
              </h3>
              <div className="border-box rounded-sm text-white bg-red-600 w-[82.64px] h-[28px] flex items-center justify-center mt-1">
                {selectedPlayers.filter(p => p !== null).length}/15
              </div>
            </div>
            <div className="w-[424px] h-[46px] mt-2 ml-1 flex flex-col items-center justify-start">
              <h3 className="font-premier text-sm font-medium">
                Money Remaining
              </h3>
              <div className="border-box rounded-sm text-black bg-green-500 w-[82.64px] h-[28px] flex items-center justify-center mt-1">
                100.0
              </div>
            </div>
          </div>
          <div className="w-[848px] h-[44px] ml-2 flex">
            <div className="w-[424px] h-[44px] flex flex-col items-center justify-start">
              <button className="w-[230.41px] h-[44px] bg-gray-100 rounded-sm font-premier">
                Auto Pick
              </button>
            </div>
            <div className="w-[424px] h-[44px] flex flex-col items-center justify-start">
              <button className="w-[230.41px] h-[44px] bg-gray-100 rounded-sm font-premier">
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="w-[706.25px] h-[32px] ml-2 flex justify-center mt-4">
          <button
            className={`w-[100px] h-[32px] ${
              activeTab === "pitch" ? "bg-gray-300" : "bg-gray-100"
            } rounded-tl-md rounded-bl-md font-premier`}
            onClick={() => setActiveTab("pitch")}
          >
            Pitch View
          </button>
          <button
            className={`w-[100px] h-[32px] ${
              activeTab === "list" ? "bg-gray-300" : "bg-gray-100"
            } rounded-tr-md rounded-br-md font-premier`}
            onClick={() => setActiveTab("list")}
          >
            List View
          </button>
        </div>
        <div className="h-[710px] w-[890.25px] ml-2 mt-4 flex justify-center items-center">
          {activeTab === "pitch" ? (
            <div className="w-[1010px] h-[840px] overflow-hidden relative mt-32">
              <img
                src={PitchSVG}
                alt="Pitch View"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-wrap content-start">
                <div className="w-[220px] h-[122px]"></div>
                <div className="w-[220px] h-[122px] flex flex-col items-center justify-center">{renderCircle(0)}</div>
                <div className="w-[220px] h-[122px] flex flex-col items-center justify-center">{renderCircle(1)}</div>
                <div className="w-[220px] h-[122px]"></div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(2)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(3)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(4)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(5)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(6)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(7)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(8)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(9)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(10)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(11)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center"></div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(12)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(13)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center">{renderCircle(14)}</div>
                <div className="w-[176px] h-[116px] flex flex-col items-center justify-center"></div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <h2 className="font-premier text-xl">List View Content</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadSelectionCard;
