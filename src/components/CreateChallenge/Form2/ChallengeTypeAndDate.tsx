import React, { useState } from "react";

const ChallengeTypeAndDate = ({
  challenge,
  handleRequest,
  setDuration_,
  errors,
}) => {
  const [duration, setDuration] = useState("1 Month");

  // const calculateEndDate = (startDate, duration) => {
  //   const durationsMap = {
  //     "1 Month": 30,
  //     "3 Month": 90,
  //     "6 Month": 180,
  //     "9 Month": 270,
  //   };
  //   const daysToAdd = durationsMap[duration] || 7;
  //   const endDate = new Date(startDate);
  //   endDate.setDate(endDate.getDate() + daysToAdd);
  //   return endDate;
  // };
  const durationsMap = {
    "1 Month": 30,
    "3 Month": 90,
    "6 Month": 180,
    "9 Month": 270,
  };

  // const handleStartDateChange = (e) => {
  //   const selectedDate = new Date(e.target.value);
  //   setStartDate(selectedDate);
  //   const calculatedEndDate = calculateEndDate(selectedDate, duration);
  //   setEndDate(calculatedEndDate);
  // };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setDuration_(durationsMap[newDuration]);
    // const startDate = new Date(); // Default start date if none selected
    // const calculatedEndDate = calculateEndDate(startDate, newDuration);
    // setEndDate(calculatedEndDate);
  };

  return (
    <>
      {/* <div className={`div-[#252A31] div-[12px] font-[500] mt-4`}>
        Challenge Type
      </div>
      <div className="w-full">
        <select
          value={challenge.ParticipationType}
          onChange={(e) => {
            handleRequest("ParticipationType", parseInt(e.target.value, 10));
          }}
          className="border-[1px] border-[#C9DE88B2] rounded-[4px] my-2 w-full mx-0 h-12 p-2 outline-none"
        >
          <option value="2">Multiplayer (50+ Player)</option>
          <option value="1">Versus your friend (2 Player)</option>
          <option value="0">Dare your friend (1 Player)</option>
        </select>
      </div>
      {errors.ParticipationType && (
        <div className="text-red-500">{errors.ParticipationType}</div>
      )} */}

      {/* <div className="flex flex-col text-left w-full mt-2">
        <div className={`div-[#252A31] div-[12px] font-[500] mt-2`}>
          Start Date / Time
        </div>
        <div>
          <input
            type="datetime-local"
            className="w-full border-[1px] border-[#C9DE88B2] outline-none rounded-[4px] my-2 mx-0 h-12 p-2"
            placeholder="Select a date"
            onChange={handleStartDateChange}
          />
        </div>
      </div> */}

      <div className="flex flex-col w-full text-left -mt-4">
        <div className={`div-[#252A31] div-[12px] font-[500] mt-2`}>
          Challenge Duration
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {["1 Month", "3 Month", "6 Month", "9 Month"].map((item) => (
            <button
              key={item}
              onClick={() => handleDurationChange(item)}
              className={`px-4 py-2 rounded ${
                duration === item
                  ? "bg-[#FFC464] text-black"
                  : "bg-[#F5F5F5] text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {errors.startDate && (
        <div className="text-red-500">{errors.startDate}</div>
      )}
    </>
  );
};

export default ChallengeTypeAndDate;
