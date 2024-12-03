import React from "react";

const Invitation = ({ isPrivate, setIsPrivate }) => {
  return (
    <div className="flex justify-between items-center mt-4 w-full">
      <span className="text-[#252A31] font-[500]">Invite only challenge</span>
      <label className="inline-flex items-center ml-2">
        <input
          type="checkbox"
          className="hidden"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
        <div className="relative">
          <div
            className={`w-[52px] h-[26px] ${isPrivate ? "bg-[#E6FC8E]" : "bg-gray-400"
              } shadow-inner rounded-[6px] relative`}
          >
            <div
              className={`${isPrivate
                ? "translate-x-[28px] translate-y-[3px]"
                : "translate-x-1 translate-y-[3px]"
                } w-5 h-5 bg-white border-2 shadow-sm border-gray-400 rounded-[6px] transform transition-transform duration-200 ease-in-out`}
            ></div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Invitation;
