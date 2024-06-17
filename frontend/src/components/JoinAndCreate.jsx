import React from "react";

const JoinAndCreate = () => {
  return (
    <div className="max-w-3xl mx-auto my-14  bg-gray-300  shadow-sm">
      <div className="flex h-64">
        <div className="flex items-center flex-2">
          <img
            src="src/assets/LeaguesCups.png"
            alt="Nunez"
            className="  object-cover mx-auto"
          />
        </div>
        <div className="flex-1 bg-blue-500 text-white p-6   flex justify-center items-center ">
          <div>
            <h2 className="text-2xl font-bold">
            Create and Join Leagues</h2>
            <p>
            Play against friends and family, colleagues or a web community in invitational leagues and cups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAndCreate;
