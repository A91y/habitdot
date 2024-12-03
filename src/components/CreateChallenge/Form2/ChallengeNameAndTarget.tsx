import React from "react";

const ChallengeNameAndTarget = ({
  challenge,
  handleRequest,
  errors,
  selectedCategory,
  selectedUnit,
  setSelectedUnit,
}) => {
  return (
    <>
      <div className={`div-[#252A31] font-[500] mt-2`}>Name</div>
      <input
        placeholder="Enter Challenge Name"
        type="text"
        onChange={(e) => {
          handleRequest("ChallengeName", e.target.value);
        }}
        className="border-[1px] border-[#C9DE88B2] rounded-[4px] my-2 w-full mx-0 h-12 p-2 outline-none"
        value={challenge.ChallengeName || ""}
      />
      {errors.ChallengeName && (
        <div className="text-red-500">{errors.ChallengeName}</div>
      )}

      {/* Target field */}
      {/* <div className="flex flex-row justify-between w-full items-end">
        <div className={`div-[#252A31] font-[500] mt-2`}>Target to Win</div>
      </div>
      <div className="flex w-full flex-row justify-between mt-2 items-center border-[1px] border-[#C9DE88B2] bg-gray-100 rounded-[4px] px-2 h-12 relative">
        <div className="flex items-center text-center justify-center">
          <input
            placeholder={
              selectedCategory?.name === "Fitness"
                ? "100"
                : "Maintain Daily Streak"
            }
            type="number"
            onChange={(e) => {
              if (selectedCategory?.name === "Fitness") {
                handleRequest("Target", Math.abs(parseInt(e.target.value, 10)));
              }
            }}
            className={` ${
              selectedCategory?.name === "Fitness" ? "text-sm" : ""
            } outline-none border-none bg-none`}
            value={challenge.Target || ""}
            disabled={selectedCategory?.name !== "Fitness"}
          />
        </div>
        <div className="flex items-center text-center justify-center">
          {selectedCategory?.name === "Fitness" ? (
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="outline-none border-none"
            >
              <option value="calories">Calories</option>
              <option value="steps">Steps</option>
            </select>
          ) : (
            // <input
            //   placeholder="Enter Unit"
            //   type="text"
            //   required
            //   onChange={(e) => setSelectedUnit(e.target.value)}
            //   className="w-[120px] text-gray-400 outline-none border-none"
            // />
            <></>
          )}
        </div>
      </div> */}
      {/* <div className="flex flex-row justify-between w-full items-end">
        <div className={`div-[#252A31] font-[500] mt-2`}>Units</div>
      </div>
      <div className="flex w-full flex-row justify-between mt-2 items-center border-[1px] border-[#C9DE88B2] rounded-[4px] px-2 h-12 relative"> */}
        {/* <div className="flex items-center text-center justify-center">
          <input
            placeholder={
              selectedCategory?.name === "Fitness"
                ? "100"
                : "Enter Winning Metric"
            }
            type="number"
            onChange={(e) => {
              if (selectedCategory?.name === "Fitness") {
                handleRequest("Target", Math.abs(parseInt(e.target.value, 10)));
              }
            }}
            className={` ${
              selectedCategory?.name === "Fitness" ? "text-sm" : ""
            } outline-none border-none bg-white`}
            value={challenge.Target || ""}
            disabled={selectedCategory?.name !== "Fitness"}
          />
        </div> */}
        {/* <div className="flex items-center text-center justify-center">
          {selectedCategory?.name === "Fitness" ? (
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="outline-none border-none"
            >
              <option value="calories">Calories</option>
              <option value="steps">Steps</option>
            </select>
          ) : (
            <input
              placeholder="Enter Winning Metric"
              type="text"
              required
              onChange={(e) => setSelectedUnit(e.target.value)}
              className=" text-gray-400 outline-none border-none"
            />
          )}
        </div>
      </div> */}
    </>
  );
};

export default ChallengeNameAndTarget;
