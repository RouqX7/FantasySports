import React, { useState } from "react";
import PitchSVG from "/src/assets/pitch-default.svg"; // Import your SVG here


const SquadSelectionCard = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [moneyRemaining, setMoneyRemaining] = useState(100); // Initial budget
  const [playersSelected, setPlayersSelected] = useState({});
  const [activeTab, setActiveTab] = useState("pitch"); // State for the active tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelection = (player) => {
    // Check if the player has already been selected
    if (selectedPlayers.find((p) => p.id === player.id)) {
      alert("Player already selected!");
      return;
    }

    // Check remaining budget
    if (moneyRemaining - player.price < 0) {
      alert("Insufficient budget!");
      return;
    }

    // Implement other selection rules (max players per team, per position, etc.)
    // For example:
    const maxPlayersPerTeam = 3; // Assuming a max of 3 players per team
    const maxPlayersPerPosition = {
      1: 2, // Goalkeepers
      2: 5, // Defenders
      3: 5, // Midfielders
      4: 3, // Attackers
    };

    const teamCount = selectedPlayers.reduce((acc, curr) => {
      acc[curr.team.id] = (acc[curr.team.id] || 0) + 1;
      return acc;
    }, {});

    const positionCount = selectedPlayers.reduce((acc, curr) => {
      acc[curr.element_type] = (acc[curr.element_type] || 0) + 1;
      return acc;
    }, {});

    if (teamCount[player.team.id] >= maxPlayersPerTeam) {
      alert(
        `Maximum ${maxPlayersPerTeam} players allowed from ${player.team.name}.`
      );
      return;
    }

    if (
      positionCount[player.element_type] >=
      maxPlayersPerPosition[player.element_type]
    ) {
      alert(
        `Maximum ${
          maxPlayersPerPosition[player.element_type]
        } players allowed in position ${player.element_type}.`
      );
      return;
    }

    // Update state if all checks pass
    setSelectedPlayers([...selectedPlayers, player]);
    setMoneyRemaining(moneyRemaining - player.price);
    setPlayersSelected({
      ...playersSelected,
      [player.id]: true,
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="mt-10 mr-auto relative left-[19vw] sm:left-[19vw] font-bold text-3xl font-premier">
        Squad Selection
      </h1>
      <div
        className="bg-blue-500 w-[880px] h-[894px] mt-10 mr-auto relative left-[19vw] sm:left-[19vw] mb-[15px] rounded-lg "
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 200px, rgb(255, 255, 255) 320px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-184.d7588c45.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))`,
          backgroundPosition: `0px 50%, 100%, 0px`,
          backgroundRepeat: `no-repeat, no-repeat, no-repeat`,
        }}
      >
        <div className="bg-sky-200 w-[864.25px] h-[125px] ml-2 mt-4 rounded-lg">
          <div className="w-[848px] h-[66px] ml-2 flex">
            <div className="w-[424px] h-[46px] mt-2 flex flex-col items-center justify-start">
              {/* Content for the first box */}
              <h3 className="font-premier text-sm font-medium">
                Players Selected
              </h3>
              <div className="border-box rounded-sm text-white bg-red-600 w-[82.64px] h-[28px] flex items-center justify-center mt-1">
                0/15
              </div>
            </div>
            <div className="w-[424px] h-[46px] mt-2 ml-1 flex flex-col items-center justify-start">
              {/* Content for the second box */}
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
        <div className="h-[710px] w-[890.25px] ml-2 mt-4 flex justify-center items-center  ">
          {activeTab === "pitch" ? (
            <div className="w-[1010px] h-[840px] overflow-hidden relative mt-32">
              {/* SVG for Pitch View */}
              <img
                src={PitchSVG}
                alt="Pitch View"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-wrap content-start">
                <div className=" w-[220px] h-[122px] "></div>
                
                <div className=" w-[220px] h-[122px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[220px] h-[122px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[220px] h-[122px] border border-black">
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                   <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">+</div>
                </div>
                 <div className=" w-[176px] h-[116px]  flex flex-col items-center justify-center">
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              {/* Content for List View */}
              <h2 className="font-premier text-xl">List View Content</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadSelectionCard;
