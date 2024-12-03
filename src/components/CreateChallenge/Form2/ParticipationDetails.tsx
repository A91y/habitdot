import React from "react";

const ParticipationDetails = ({ participationType }) => {
  // Define the maximum participants based on the participation type
  const getMaxParticipants = () => {
    switch (participationType) {
      case 2:
        return 50; // Multiplayer
      case 1:
        return 2; // Versus a friend
      case 0:
        return 1; // Dare a friend
      default:
        return 0;
    }
  };

  return (

    <>
      <div className={`div-[#252A31] div-[16px] font-[500]`}>
        Participation Details
      </div>

      <div className="flex flex-row justify-between w-full items-center">
        <div className="text-[#252A31] text-[12px] font-[500] mt-2">
          Maximum Participants
        </div>
        <div className="flex">
          <div className="mt-2 mx-2">{getMaxParticipants()}</div>
        </div>
      </div>
    </>
  );
};

export default ParticipationDetails;
