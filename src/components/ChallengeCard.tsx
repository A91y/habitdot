/* eslint-disable */
// @ts-nocheck

import React, { useEffect } from 'react';
import styles from '../styles/styles';
import dumbell from '/assets/images/dumbell 2.webp';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Challenge } from '../types/types';
import { categories } from '../utils/constants/gameCategories';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  // console.log("CHALLENGE OBJECT FROM MY CHALLENGE 🔥🔥🔥 ",challenge)
  const truncatediv = (div: string, maxLength: number) => {
    if (div?.length <= maxLength) return div;
    return div?.substr(0, maxLength) + '...';
  };
  const truncatedivforcreator = (div: string, maxLength: number) => {
    if (!div) return 'You';
    if (div?.length <= maxLength) return div;
    return div?.substr(0, maxLength) + '...';
  };
  const location = useLocation();
  const getStateColor = (state) => {
    switch (state) {
      case true:
        return '#3498db'; // Blue
      case 'ONGOING':
        return '#27ae60'; // Green
      case 'PROCESSING':
        return '#f39c12'; // Orange
      case 'PAYINGOUT':
        return '#8e44ad'; // Purple
      case false:
        return '#e74c3c'; // Light Green
      case 'CANCELLED':
        return '#e74c3c'; // Red
      case 'NO_WINNER':
        return '#95a5a6'; // Gray
      default:
        return '#7f8c8d'; // Default Gray
    }
  };

  // const calculateTotalParticipants = () => {
  //   const playersJoined =
  //     challenge?.Players?.length || challenge?.ParticipantsJoined || 0;

  //   switch (
  //     challenge.Game?.ParticipationType
  //       ? challenge.Game?.ParticipationType
  //       : challenge.ParticipationType
  //   ) {
  //     case 0:
  //     case "0v1":
  //       return 1;
  //     case 1:
  //     case "1v1":
  //       return 2;
  //     case 2:
  //     case "nvn":
  //       if (playersJoined < 50) return 50;
  //       if (playersJoined >= 50 && playersJoined < 70) return 70;
  //       if (playersJoined >= 70 && playersJoined < 150) return 150;
  //       return 300;
  //     default:
  //       return "1";
  //   }
  // };

  // const totalParticipants = calculateTotalParticipants();
  // const progress =
  //   ((challenge?.Players?.length || challenge?.ParticipantsJoined || 0) /
  //     totalParticipants) *
  //   100;
  const navigate = useNavigate();

  // console.log("challenge ............ ", challenge);

  // Calculate the total prize pool
  const totalPrizePool = challenge?.depositAmount;

  const getCategoryIcon = (categoryName: string) => {
    const normalizedChallengeName = categoryName.toLowerCase().split('-')[0];
    console.log("categoryName ",normalizedChallengeName)
    const category = categories[0].subcategories.find(
      (cat) => cat.name.toLocaleLowerCase() === normalizedChallengeName.toLocaleLowerCase()
    );
    // console.log("Category name received: ", categoryName);
    // console.log("Category found: ", category);
    return category ? category.image : null;
  };
  const getCategorydesc = (categoryName: string) => {
    const category = categories[0].subcategories.find(
      (cat) => cat.name === categoryName
    );
    // console.log("Category name received: ", categoryName);
    // console.log("Category found: ", category);
    return category ? category.defaultDescription : null;
  };

  const handleCardClick = () => {
    navigate(`/challenge/${challenge.ChallengeID}`, {
      state: { challenge },
    });
  };
  function standardizeChallengeName(challengeName) {
    const categoryMap = {
      gym: 'Wellness',
      bed: 'Chores',
      screentime: 'Screen Time',
      quit: 'Quits',
      // Add more mappings for skills
      skill: 'Skills',
      // You can add other skills as needed
    };

    const normalizedChallengeName = challengeName.toLowerCase().split('-')[0];
    console.log(normalizedChallengeName)
    if (categoryMap[normalizedChallengeName]) {
      console.log("val")
      return categoryMap[normalizedChallengeName];
    } else {
      return challengeName;
    }
  }
  return (
    // <div
    //   className={`p-6 border rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 ${challenge.active ? "border-black-500" : "border-gray-500"} m-5 `}
    //   onClick={handleCardClick}
    // >
    //   {/* Header Section */}
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-xl font-bold text-gray-800 capitalize">
    //       {standardizeChallengeName(challenge.category)} Challenge
    //     </h2>
    //     <span
    //       className={`px-3 py-1 text-xs font-semibold uppercase rounded-full ${challenge.active
    //         ? "bg-green-100 text-green-800"
    //         : "bg-gray-100 text-gray-800"
    //         }`}
    //     >
    //       {challenge.active ? "Active" : "Inactive"}
    //     </span>
    //   </div>

    //   {/* Details Section */}
    //   <div className="text-sm text-gray-600 space-y-2">
    //     <p>
    //       <span className="font-medium">Deposit:</span> {challenge.depositAmount}{" "}

    //     </p>
    //     <p>
    //       <span className="font-medium">Start Date:</span>{" "}
    //       {new Date(challenge.startTime).toLocaleDateString()}
    //     </p>
    //     <p>
    //       <span className="font-medium">Last Check-In:</span>{" "}
    //       {new Date(challenge.lastCheckIn).toLocaleDateString()}
    //     </p>
    //   </div>

    //   {/* Call to Action */}
    //   <button
    //     className="mt-4 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition"
    //   >
    //     View Challenge
    //   </button>
    // </div>
    <div className="cursor-pointer" onClick={handleCardClick}>
      <div className={`${styles.marginX} `}>
        <div
          className={`my-6 rounded-xl border border-neutral-200 bg-white shadow-sm`}
        >
          <div className={`flex flex-row p-4 justify-between`}>
            <div className={`div flex flex-col items-start justify-start`}>
              <div
                style={{ color: getStateColor(challenge?.active) }}
                className={`div-green-500 ${styles.label}`}
              >
                {challenge.active ? 'Active' : 'UnActive'}
              </div>
              <div
                className={` mt-1 text-[#252451] text-[16px] text-left font-semibold`}
              >
                {truncatediv(
                  `${standardizeChallengeName(challenge.category)}`,
                  32
                )}
              </div>
              <div
                className={`${styles.paragraph} mt-2 text-left text-[#BAB8CB]`}
              >
                {truncatediv(
                  getCategorydesc(standardizeChallengeName(challenge.category)),
                  60
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center relative">
              <div className="mx-auto mt-2" style={{ width: 70, height: 70 }}>
                <CircularProgressbar
                  value={100}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'round',
                    textColor: '#2D3986',
                    pathColor: '#2D3986',
                    trailColor: '#D4D3E4',
                    strokeWidth: 4,
                    pathTransitionDuration: 0.5,
                  })}
                />
                {/* <div className="absolute  top-[20px] left-[10px]">
                    <img
                      src={dumbell}
                      alt="dumbell"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div> */}
                <div className="absolute top-[28px] left-[20px]">
                  <img
                    src={getCategoryIcon(
                      standardizeChallengeName(challenge?.category)
                    )}
                    alt="challenge icon"
                    style={{ width: '30px', height: '30px' }}
                  // className="mx-auto"
                  />
                </div>
              </div>
              {/* <div className={`${styles.caption} mx-auto mt-2`}>
                  {challenge?.Players?.length ||
                  challenge?.Players?.length === 0
                    ? challenge.Players.length
                    : challenge?.ParticipantsJoined || 0}{" "}
                  / {totalParticipants} Joined
                </div> */}
            </div>
          </div>
          <div className={`border-t border-neutral-200 mx-4 mb-4`}></div>
          <div className={`flex flex-row mx-4 pb-4 justify-between`}>
            <div>
              <div className={`${styles.caption2} div-[#BAB8CB] mb-1`}>
                Deposite
              </div>
              <div className={`${styles.subdiv} text-left`}>
                {/* {truncatediv(`${challenge?.Wager} Credits`, 8)} */}
                {`${challenge?.depositAmount || challenge?.depositAmount || '0'
                  } DOT`}
              </div>
            </div>
            <div>
              <div className={`${styles.caption2} div-[#BAB8CB] mb-1`}>
                Reward Points
              </div>
              <div className={`${styles.subdiv} text-left`}>
                {`${challenge.rewardPoints} Points`}
              </div>
            </div>
            <div>
              <div
                className={`${styles.caption2} text-left div-[#BAB8CB] mb-1`}
              >
                Start Time
              </div>
              <div className={`${styles.subdiv} text-left`}>
                {new Date(challenge.startTime).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
