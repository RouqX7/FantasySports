import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpenPremierLeague, setIsOpenPremierLeague] = useState(false);
  const [isOpenFantasy, setIsOpenFantasy] = useState(false);

  const toggleMenuPremierLeague = () => {
    setIsOpenPremierLeague(!isOpenPremierLeague);
  };

  const toggleMenuFantasy = () => {
    setIsOpenFantasy(!isOpenFantasy);
  };

  return (
    <nav className="bg-fuchsia-950 p-4 w-auto h-auto pl-36 ">
      <div className=" justify-between items-center">
        <div className="flex items-center space-x-7 ">
          {/* <div className="text-3xl font-bold text-white mr-4">FantasySports</div> */}
          <div className="relative mr-8">
            <button onClick={toggleMenuPremierLeague} className="text-white text-3xl font-bold  flex items-center">
              Premier League <FaAngleDown className="ml-2" />
            </button>
            {isOpenPremierLeague && (
              <div className="absolute bg-gray-700 text-white py-2 px-4 rounded shadow-lg mt-2">
                <a href="#home" className="block py-1">
                  Home
                </a>
                <a href="#fixtures" className="block py-1">
                  Fixtures
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={toggleMenuFantasy} className="text-white text-3xl font-bold flex items-center">
              Fantasy <FaAngleDown className="ml-2" />
            </button>
            {isOpenFantasy && (
              <div className="absolute bg-gray-700 text-white py-2 px-4 rounded shadow-lg mt-2">
                <a href="#fanatsy" className="block py-1">
                  Fantasy
                </a>
                <a href="#fantasy-draft" className="block py-1">
                  Fantasy Draft
                </a>
                <a href="#fantasy-challenge" className="block py-1">
                  Fnatasy Challenge
                </a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={toggleMenuFantasy} className="text-white text-3xl font-bold flex items-center">
              Football & Community <FaAngleDown className="ml-2" />
            </button>
            {isOpenFantasy && (
              <div className="absolute bg-gray-700 text-white py-2 px-4 rounded shadow-lg mt-2">
                <a href="#fanatsy" className="block py-1">
                  Fantasy
                </a>
                <a href="#fantasy-draft" className="block py-1">
                  Fantasy Draft
                </a>
                <a href="#fantasy-challenge" className="block py-1">
                  Fnatasy Challenge
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
