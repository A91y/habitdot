/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import axios from "axios";
import { BackendURL } from "../../utils/constants/url";
import bear from "../../assets/images/bear.svg"; // Use the correct path for your bear SVG
import { useUserStore } from "../../store/user";

const Signup = () => {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [errorMessage, setErrorMessage] = useState("");
  const { loggedIn ,setLoggedIn} = useUserStore();
  useEffect(() => {
    const handleLoginFlow = async () => {
      if (isConnected && address) {
        try {
          const provider = new BrowserProvider(walletProvider);
          const signer = await provider.getSigner();

          // Fetch verification message
          const response = await axios.get(
            `${BackendURL}/auth/wallet/verificationMessage/${address}`
          );

          if (!response.data.success) {
            throw new Error("Failed to fetch verification message");
          }

          const messageToSign = response.data.data;

          // Sign the message
          const signature = await signer.signMessage(messageToSign);

          // Login user
          const loginResponse = await axios.post(
            `${BackendURL}/auth/wallet/login`,
            {
              publickey: address,
              message: messageToSign,
              signature,
            }
          );

          if (loginResponse.data.success) {
            localStorage.setItem(
              "accessToken",
              loginResponse.data.data.access_token
            );
            localStorage.setItem(
              "refreshToken",
              loginResponse.data.data.refresh_token
            );
            console.log("User logged in successfully");
            setLoggedIn(true)
            navigate("/explore");
          } else {
            throw new Error("Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error in login flow:", error);
          setErrorMessage(error.message || "An error occurred");
        }
      }
    };

    handleLoginFlow();
  }, [isConnected, address, walletProvider, navigate]);

  const handleGetStarted = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="bg-[#FFE668] w-full h-full  flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <img src={bear} alt="Bear lifting weights" className=" h-full mb-4" />
        <h1 className="text-3xl font-bold">HABIT.DOT</h1>
        <p className="text-center text-gray-700 mt-2">
          Turning Habits into real life Challenges
        </p>
      </div>
      <div className="flex flex-col justify-end items-end mt-24">
        <button
          onClick={handleGetStarted}
          className="bg-black text-white  text-md  py-4 px-20 rounded-full shadow-md"
        >
          Let's Get Started
        </button>
        {errorMessage && (
          <div className="text-center px-10 my-4 text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
