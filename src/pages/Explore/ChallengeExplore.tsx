/* eslint-disable */
// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  live,
  hamburger,
  notification,
  banner1,
  createSVG,
} from "../../assets/index";
import { ChallengeCard, CreateButton, Drawer } from "../../components/index";
import { useChallenges, useUserDetails } from "../../hooks";
import { useUserStore } from "../../store/user";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Explore: React.FC = () => {
  const { loggedIn } = useUserStore();
  const [page, setPage] = useState(0);
  const [moreChallengesButton, setMoreChallengesButton] = useState(true);
  const { challenges, isLoading } = useChallenges({
    page: page,
    setMoreChallengesButton: setMoreChallengesButton,
  });
  const { userDetails } = useUserDetails();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sortedChallenges = challenges?.sort((a, b) => {
    return b.startTime - a.startTime;
  });

  return (
    <div className="flex flex-col relative overflow-hidden">
      <CreateButton createSVG={createSVG} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className="flex flex-row justify-between items-center mt-4 mx-6">
        <h1 className="text-[20px] font-TTRunsTrialMedium font-bold">
          HABITDOT
        </h1>
        <div className="flex flex-row items-center">
         
          <button
            className="ml-2 rounded-full border-[#F7F7F7]"
            onClick={toggleDrawer}
          >
            <img src={hamburger} alt="Menu" />
          </button>
        </div>
      </div>
      <div className="h-40 my-4 mx-2 rounded-lg flex relative">
        <img src={banner1} alt="banner" className="w-full" />
      </div>

      {showLoader || isLoading ? (
        <div className="flex justify-center items-center my-10">
          <DotLottieReact
            src="https://lottie.host/d3991ae2-3fb2-4e79-8d29-a2f83227ad4e/9Y1ri9BCHy.lottie"
            loop
            autoplay
            style={{ width: 150, height: 150 }}
          />
        </div>
      ) : sortedChallenges?.length > 0 ? (
        <div>
          {sortedChallenges.map((challenge) => (
            <ChallengeCard challenge={challenge} key={challenge?.ChallengeID} />
          ))}
          {!moreChallengesButton && (
            <h1 className="my-10">No More Challenges Present!</h1>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center my-10">
          <h1 className="text-lg font-semibold text-gray-600">
            Get started and create habits!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Explore;
