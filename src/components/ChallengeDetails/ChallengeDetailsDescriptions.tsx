import React from "react";

type Props = {
  av: string;
  challenge: any;
  totalParticipants: any;
  progress?: any;
  showFullDescription: any;
  wordCount: any;
  toggleDescription: any;
  profile: string;
  money: string;
  totalPrizePool: any;
  truncateText?: any;
  styles?: any;
};

const ChallengeDetailsDescriptions = ({
  av,
  challenge,
  totalParticipants,
  progress,
  showFullDescription,
  wordCount,
  toggleDescription,
  profile,
  money,
  totalPrizePool,
  truncateText,
  styles,
}: Props) => {
  return (
    <div className="mx-4 -mt-2 text-left bg-[#EFEDFF] rounded-xl px-2">
      <div className="mt-6 bg-[#EFEDFF] rounded-xl">
        <div className="px-4 py-4">
          <div className="flex flex-row justify-between">
            <div className="relative flex flex-row">
              <div className="relative">
                <img src={av} alt="Avatar" />
              </div>
              <div className="font-semibold ml-2 my-auto">
                {challenge.Players?.length}
                Players joined
              </div>
            </div>
            <div className="my-auto">
              of
              {totalParticipants}
              Total
            </div>
          </div>

          <div className="py-1 mt-2">
            <div className="w-full bg-white h-[10px] rounded-[8px]">
              <div
                className="bg-[#917EEC] h-[10px] rounded-[8px]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`text-base font-semibold 
        ${styles.subheading} 
         px-2`}
      >
        ABOUT THE CHALLENGE
      </div>
      <div
        className={`${
          showFullDescription ? "px-2" : "line-clamp-4"
        } text-base px-2 `}
      >
        {challenge.ChallengeDescription}
      </div>

      {wordCount > 5 && (
        <div onClick={toggleDescription}>
          <div className="mt-1 div-base font-semibold underline underline-offset-8 px-2">
            {showFullDescription ? "Show Less" : "Read More"}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between w-full pt-2 pb-4 px-4 mt-4 ">
        <div className="flex items-center space-x-2">
          <div className=" ">
            <img
              src={
                challenge?.ChallengeCreator?.ProfilePicture
                  ? challenge?.ChallengeCreator?.ProfilePicture
                  : profile
              }
              alt="Avatar"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-sm ">Creator Name</div>
            <div className="text-sm font-semibold">
              {/* {truncateText(challenge?.ChallengeCreator?.UserName, 8)} */}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-10 rounded-full ">
            <img src={money} alt="Money" className="w-10" />
          </div>

          <div className="flex flex-col">
            <div className="text-sm ">Win</div>
            <div className="text-sm font-semibold">
              {totalPrizePool} {challenge?.Currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsDescriptions;
