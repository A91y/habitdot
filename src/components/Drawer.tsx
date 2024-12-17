/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import placeholder from "/assets/images/placeholder.webp";
import x from "/assets/images/X.webp";
import { useUserStore } from "../store/user";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  noti: number;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, noti }) => {
  const { userDetails } = useUserDetails();
  const { loggedIn } = useUserStore();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const profileImage = userDetails?.User?.ProfilePicture
    ? userDetails.User.ProfilePicture
    : placeholder;

  const shortenAddress = (address: string | undefined) => {
    if (!address) return "Connecting your wallet...";
    return `${address.substring(0, 8)}............${address.substring(
      address.length - 6
    )}`;
  };

  const handleLogout = async () => {
    await localStorage.clear();
    window.location.href = `/`;
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding the component until animation completes (300ms)
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      {isVisible && (
        <div
          className={`fixed top-0 left-1/2 bg-white h-full w-[85%] max-w-[380px] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "-translate-x-1/2" : "translate-x-[190%] hidden"
          }`}
        >
          <div className="flex flex-col p-5">
            <div className="flex flex-row justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-[#EDEDED] rounded-full h-14 w-14 flex items-center justify-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#2B303B] font-medium text-left">
                    {userDetails?.User?.UserName || "Hi User !"}
                  </p>
                  <p className="text-xs text-[#576175] text-left">
                    {shortenAddress(userDetails?.User?.WalletAddress)}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border-[#F7F7F7]"
              >
                <img src={x} alt="Close" />
              </button>
            </div>

            <div className="h-0.5 bg-[#EEEEEE] my-2" />

            {/* New Button: Bridge DOT to xcDOT */}
            <button
              onClick={() => navigate("/bridge-dot")}
              className="bg-[#EEEEEE] text-sm text-[#2B303B] rounded-lg p-3 font-medium mt-4 hover:bg-[#E0E0E0] transition"
            >
              Bridge DOT to xcDOT
            </button>
          </div>

          <div className="p-5 absolute bottom-0 w-full">
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#EEEEEE] rounded-full w-full h-[50px] font-bold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="bg-[#EEEEEE] rounded-full w-full h-[50px] font-bold"
              >
                Login
              </button>
            )}

            <p className="text-xs text-[#576175] mt-2 text-center">
              HabitDot LLC, ©2024. All rights reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
