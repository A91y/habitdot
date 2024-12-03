import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChallengeActions = ({
  challenge,
  isChallengeOver,
  sidebetted,
  isSpeculator,
  isavalidator,
  isJoined,
  active,
  handleConfirmJoinNow,
  setSpeculate,
  creditSGV,
}) => {
  const navigate = useNavigate();

  return (
    <div className=" w-full mt-5 flex flex-col rounded-t-3xl  tall:absolute tall:bottom-0">
      <div className="flex items-center justify-between py-3 px-4 rounded-t-3xl">
        <h1 className="text-[#545454] text-sm font-semibold">Join With</h1>
        <div className="flex items-center gap-2">
          <img className="h-4 w-4" src={creditSGV} alt="Credit Icon" />
          <h1 className="font-semibold font-runs">
            {challenge.Wager} {challenge.Currency}
          </h1>
        </div>
      </div>

      {challenge.State === "CANCELLED" && (
        <div className="bg-red-100 text-black p-3 m-4 flex items-center justify-center rounded-sm">
          <div className="text-lg font-semibold">Cancelled</div>
        </div>
      )}

      {isChallengeOver && challenge.State !== "CANCELLED" && (
        <div className="bg-black text-white p-3 flex items-center justify-center">
          <div className="text-lg font-semibold">Challenge Over</div>
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
        {!isChallengeOver && !sidebetted && (
          <button
            className={`p-3 flex items-center justify-center shadow-xl rounded-md ${
              isSpeculator
                ? "bg-white text-black border-2 border-black"
                : "bg-black text-white"
            }`}
            onClick={() => {
              if (isSpeculator) {
                navigate(`/sidebet/${challenge.ChallengeID}`);
                return;
              }
              if (
                isavalidator ||
                isJoined ||
                active.includes(parseInt(challenge.ChallengeID || ""))
              ) {
                navigate(`/gameDashboard/${challenge.ChallengeID}`);
              } else {
                handleConfirmJoinNow();
              }
            }}
          >
            <div className="text-lg font-semibold font-inter">
              {isSpeculator
                ? "See Speculation"
                : isavalidator
                ? "Validate"
                : isJoined ||
                  active.includes(parseInt(challenge.ChallengeID || ""))
                ? "View Status"
                : "Join Now"}
            </div>
          </button>
        )}

        {!isJoined && challenge.AllowSideBets && (
          <button
            className="flex rounded-md p-3 justify-center shadow-xl items-center border border-black font-semibold font-inter"
            type="button"
            onClick={() => setSpeculate(true)}
          >
            Speculate
          </button>
        )}
      </div>
    </div>
  );
};

export default ChallengeActions;
