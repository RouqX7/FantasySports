import React from "react";

function SquadSelectionCard() {
  return (
    <div className="flex flex-col">
      <h1 className="mt-10 mr-auto relative left-[19vw] sm:left-[19vw] font-bold text-3xl font-premier">
        Squad Selection
      </h1>
      <div className="bg-blue-500 w-[738.25px] h-[894px] mt-10 mr-auto relative left-[19vw] sm:left-[19vw] mb-[15px] rounded-lg">
        <div className="bg-green-200 w-[722.25px] h-[125px] ml-2 mt-4 rounded-lg">
          <div className="bg-gray-800 w-[706.25px] h-[66px] ml-2 flex">
            <div className="bg-blue-200 w-[353px] h-[46px] mt-2 flex flex-col items-center justify-start">
              {/* Content for the first box */}
              <h3 className="font-premier text-sm font-medium">
                Players Selected
              </h3>
              <div className="border-box rounded-sm text-white bg-red-600 ">
                0/15
              </div>
            </div>
            <div className="bg-red-600 w-[353px] h-[46px] mt-2 ml-1 flex flex-col items-center justify-start">
              {/* Content for the second box */}
              <h3 className="font-premier text-sm font-medium">
                Money Remaining
              </h3>
              <div className="border-box rounded-sm text-black bg-green-500 ">
                100.0
              </div>
            </div>
          </div>
          <div className="bg-red-500 w-[706.25px] h-[44px] ml-2 flex">
            <div className="bg-blue-200 w-[353px] h-[44px]  flex flex-col items-center justify-start">
                <button className=" w-[230.41px] h-[44px]  bg-gray-100 rounded-sm font-premier ">
                Auto Pick
                </button>
            </div>
            <div className="bg-blue-200 w-[353px] h-[44px]  flex flex-col items-center justify-start">
                <button className=" w-[230.41px] h-[44px]  bg-gray-100 rounded-sm font-premier ">
                 Reset
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquadSelectionCard;
