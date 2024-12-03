import React from "react";

type Props = {
  challenge?: any;
  totalStreak: any;
  totalDays?: any;
  showFullDescription: any;
  status: any;
  category: string;
  depositAmount: number;
  rewardPoints: number;
  styles?: any;
};

const AboutChallengeDescriptions = ({
  category,
  depositAmount,
  rewardPoints,
  totalStreak,
  totalDays,
  showFullDescription,
  status,
  styles,
}: Props) => {
  console.log(status);

  return (
    <div className="mx-4 -mt-2 text-left bg-[#EFEDFF] rounded-xl px-2">
      <div className="mt-6 bg-[#EFEDFF] rounded-xl">
        <div className="px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-row justify-between">
              <div className="relative flex flex-row gap-4">
                <div className="font-semibold ml-2 my-auto">Streak</div>
                <div className="my-auto">{totalStreak}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="relative flex flex-row gap-4">
                <div className="font-semibold ml-2 my-auto">Days</div>
                <div className="my-auto">{totalDays}</div>
              </div>
            </div>
          </div>
          <div className="py-1 ">
            <div className="w-full bg-white h-[10px] rounded-[8px]">
              <div
                className="bg-[#917EEC] h-[10px] rounded-[8px]"
                style={{ width: `${(totalStreak / totalDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`text-base font-semibold 
        ${styles.subheading} 
         px-4 py-2`}
      >
        STATS
      </div>
      <div
        className={`${
          showFullDescription ? "px-4" : "line-clamp-4"
        } text-base px-2 `}
      >
        <div className="flex flex-col gap-2 pb-2">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="font-semibold">Category</div>
            <div className="font-semibold">{category}</div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="font-semibold">Reward Points</div>
            <div className="font-semibold">{rewardPoints}</div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="font-semibold">Deposited</div>
            <div className="font-semibold">{depositAmount}</div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="font-semibold">Status</div>
            <div
              className={`my-auto font-semibold ${
                status ? "text-green-800" : "text-red-800"
              }`}
            >
              {status ? "ACTIVE" : "INACTIVE"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutChallengeDescriptions;
