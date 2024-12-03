/* eslint-disable */
// @ts-nocheck

import React, { useRef, useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { CiEdit, CiEraser } from "react-icons/ci";

import card from "/assets/images/arrow.webp";
import back from "/assets/images/back.webp";
import credit from "/assets/images/credit.webp";
import greyCredits from "/assets/images/grey_credits.svg";
import bullet from "/assets/images/bullet.webp";
import clipboard from "/assets/images/clipboard.svg";
import sms from "/assets/images/sms.svg";
import smapleChallengeImage from "/assets/images/sample_challenge_image.svg";
import info from "/assets/images/info.webp";
import dropdown from "/assets/images/dropdown.png";

import defaultNFT from "../../assets/defaultNFT.png";

import { BsFullscreenExit } from "react-icons/bs";
import { FaArrowLeft, FaImages, FaXmark, FaWallet } from "react-icons/fa6";
import { MdDone, MdContentCopy, MdCheck } from "react-icons/md";

import useUserDetails from "../../hooks/useUserDetails";
import useWallets from "../../hooks/useWallets.js";

import PopupWithLink from "../../components/Modal.js";
import ConfirmChallengePopup from "../../components/ConfirmChallengePopup.js";
import DescriptionGenerator from "../../components/DescriptionGenerator.js";

import {
  createChallengeAPI,
  getShareableLink,
} from "../../utils/api/challengeApi";
import truncateText from "../../utils/truncateText";
import { getUnit } from "../../utils/constants/gameTags.js";
import {
  generateImage,
  generateDescription,
} from "../../utils/api/generativeAi.js";

import DotImage from "/assets/tokens/dot.png";
import BonkImage from "/assets/tokens/Bonk.png";
import SendImage from "/assets/tokens/SEND.svg";
import USDCImage from "/assets/tokens/USDC.png";
import { categories } from "../../utils/constants/gameCategories";

import { Challenge } from "../../types/types";

import styles from "../../styles/styles";
import WagerDetails from "../../components/CreateChallenge/Form2/WagerDetails.js";
import ChallengeTypeAndDate from "../../components/CreateChallenge/Form2/ChallengeTypeAndDate.js";
import ChallengeNameAndTarget from "../../components/CreateChallenge/Form2/ChallengeNameAndTarget.js";
import Invitation from "../../components/CreateChallenge/Form2/Invitation.js";
import ParticipationDetails from "../../components/CreateChallenge/Form2/ParticipationDetails.js";
import CategoryCard from "../../components/CreateChallenge/Form1/CategoryCard.js";
import ConfirmBackPopup from "../../components/CreateChallenge/ConfirmBackPopup.js";
import ChallengeCreationFailed from "../../components/CreateChallenge/ChallengeCreationFailedPopUp.js";
import ChallengeCreatedSuccessfully from "../../components/CreateChallenge/ChallengeCreatedSuccessfullyPopUp.js";
import { BrowserProvider, ethers } from "ethers";
import {
  startHabitWithToken,
  approveToken,
  transferTokensToStartHabit,
} from "../../utils/api/web3.js";
import { useAppKitProvider } from "@reown/appkit/react";

// console.log(walletProvider, "WALLET PROVIDER");
const CreateChallenge = () => {
  const popupRef = useRef(null);
  const { walletProvider } = useAppKitProvider("eip155");
  const {
    wallets,
    selectedWallet,
    setSelectedWallet,
    isDropdownOpenWallet,
    setIsDropdownOpenWallet,
    dropdownWalletRef,
  } = useWallets();
  const [formStep, setFormStep] = useState(1);
  const [wagerAmount, setWagerAmount] = useState("");
  const [duration, setDuration] = useState(30);

  const [isApproved, setIsApproved] = useState(false); // Tracks if approval is done
  const [isApproving, setIsApproving] = useState(false); // Tracks approval loading
  const [isTransferring, setIsTransferring] = useState(false); // Tracks transfer loading

  // console.log(viewType, "VIEW type");
  // console.log(window.innerWidth, "Window Width");

  const [previewDescription, setPreviewDescription] = useState("");
  const [editingPreviewDescription, setEditingPreviewDescription] =
    useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [showConfirmBack, setShowConfirmBack] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupWithLinkVisible, setIsPopupWithLinkVisible] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [sharableLink, setSharableLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const { userDetails } = useUserDetails();
  const [aiImage, setAiImage] = useState(null);
  const [aiDescription, setAiDescription] = useState("Loading...");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedUnit, setSelectedUnit] = useState("calories");
  const [isPopupWithFailureVisible, setIsPopupWithFailureVisible] =
    useState(false);

  const handleDescriptionChange = (event) => {
    setPreviewDescription(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const categoryNameValue = {
    Wellness: "gym",
    Chores: "bed",
    Skills: "skill",
    Quitting: "quit-healthyfood",
    "Screen Time": "screentime",
  };

  const [challenge, setChallenge] = useState({
    MinParticipants: 0,
    MaxParticipants: 0,
    ChallengeName: "",
    ChallengeDescription: "",
    ParticipationType: 2,
    GameType: "",
    Target: "",
    AllowSideBets: true,
    Media: "",
  });
  const options = [
    { value: "DOT", label: "DOT", disabled: false, imgSrc: DotImage },
    // // { value: "CREDITS", label: "CREDITS", disabled: false, imgSrc: credit },

    // { value: "USDC", label: "USDC", disabled: false, imgSrc: USDCImage },
    // { value: "BONK", label: "BONK", disabled: false, imgSrc: BonkImage },
    // // { value: "SEND", label: "SEND", disabled: true, imgSrc: SendImage },
  ];
  const [errorAi, setErrorAi] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  type ChallengeField = keyof Challenge;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const startDateInputRef = useRef(null);
  const skillNameInputRef = useRef(null);
  const screenTimeInputRef = useRef(null);

  useEffect(() => {
    return () => {
      startDateInputRef.current = null;
      skillNameInputRef.current = null;
      screenTimeInputRef.current = null;
    };
  }, []);

  const [selectedToken, setSelectedToken] = useState({
    value: "DOT",
    label: "DOT",
    disabled: false,
    imgSrc: DotImage,
  });

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };
  const navigate = useNavigate();

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approveToken(
        wagerAmount.toString(),
        new BrowserProvider(walletProvider)
      );
      setIsApproved(true);
      alert("Tokens approved successfully!");
    } catch (error) {
      console.error("Error during approval:", error);
      alert("Token approval failed.");
    } finally {
      setIsApproving(false);
    }
  };
  const handleTransfer = async () => {
    setIsTransferring(true);
    try {
      await transferTokensToStartHabit(
        duration,
        categoryValueParser(),
        wagerAmount.toString(),
        new BrowserProvider(walletProvider)
      );
      alert("Tokens transferred successfully, habit started!");
      navigate("/explore");
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("Token transfer failed.");
    } finally {
      setIsTransferring(false);
    }
  };

  //dynamic category value
  const categoryValueParser = () => {
    let category;

    if (selectedCategory.name === "Skills") {
      category =
        categoryNameValue[selectedCategory.name] +
        "-" +
        skillNameInputRef.current.value;
    } else if (selectedCategory.name === "Screen Time") {
      category =
        categoryNameValue[selectedCategory.name] +
        "-" +
        screenTimeInputRef.current.value;
    } else {
      category = categoryNameValue[selectedCategory.name];
    }

    return category;
  };

  // const handleContinueClick = async () => {
  //   const wager = wagerAmount;
  //   console.log("Duration:", duration);
  //   console.log("Wager amount:", wager);
  //   await startHabitWithToken(
  //     duration,
  //     categoryValueParser(),
  //     wager,
  //     new BrowserProvider(walletProvider)
  //   );

  //   setIsPopupVisible(true);
  // };

  const handleRequest = <K extends ChallengeField>(
    field: K,
    value: string | number
  ) => {
    setChallenge((prevChallenge) => {
      let updatedValue = value;
      if (field === "ParticipationType") {
        // If switching to multiplayer, ensure Min and Max are at least 2
        if (value === 0) {
          return {
            ...prevChallenge,
            [field]: value,
            MinParticipants: Math.max(prevChallenge.MinParticipants, 2),
            MaxParticipants: Math.max(prevChallenge.MaxParticipants, 2),
            GameType: event.target.value || 0,
          };
        }
      }
      return {
        ...prevChallenge,
        [field]: updatedValue,
      };
    });
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharableLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset copy state after 2 seconds
  };
  const resetForm = () => {
    setFormStep(1);
    setWagerAmount("");
    setSelectionIndex(0);
    setChallenge({
      MinParticipants: 2,
      MaxParticipants: 2,
      ChallengeName: "",
      ChallengeDescription: "",
      ParticipationType: 2,
      Target: 100,
      GameType: "",
      // SideBetsWager: 10,
    });
    setStartDate(new Date());
    setEndDate(new Date());
    setAiImage(null);
    setAiDescription("Loading...");
  };
  const decreaseMin = (field: ChallengeField) => {
    setChallenge((prevChallenge) => {
      const currentValue = prevChallenge[field];
      if (prevChallenge.ParticipationType === 0 && currentValue <= 2) {
        return prevChallenge; // Don't reduce if it's multiplayer and value is 2 or less
      }
      const value = Math.max(currentValue - 1, 2); // This line ensures that value doesn't go below 2
      return {
        ...prevChallenge,
        [field]: value,
      };
    });
  };
  const increaseMin = (field: ChallengeField) => {
    setChallenge((prevChallenge) => {
      const currentValue = prevChallenge[field];
      const value = currentValue + 1;
      return {
        ...prevChallenge,
        [field]: value,
      };
    });
  };
  const handleBack = () => {
    if (formStep === 3) {
      setShowConfirmBack(true);
    } else if (formStep > 1) {
      setFormStep(formStep - 1);
    } else {
      navigate("/explore");
    }
  };
  const getFormStepText = () => {
    switch (formStep) {
      case 1:
        return "Choose A Category";
      case 2:
        return "Challenge Details";
      // case 3:
      //   return "Challenge Details";
      default:
        return "Select the category";
    }
  };
  const getFormStepSubText = () => {
    switch (formStep) {
      case 1:
        return "Pick one to get started or create your own.";
      // case 2:
      //   return "Choose a subcategory to narrow down.";
      case 2:
        return "Fill in the details for your challenge.";
      default:
        return "Pick one to get started or create your own.";
    }
  };
  const confirmBack = (confirm) => {
    if (confirm) {
      setFormStep(formStep - 1);
      resetForm();
    }
    setShowConfirmBack(false);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // "prompt":"${prompt}",
  // "participation_type": "${}",
  // "result_type": "${selectedUnit}",
  // "additional_info": "string"

  //generate and store GeniAi Image in A state ,
  const NftImage = async (prompt: string) => {
    try {
      setLoadingAi(true);
      const response = await generateImage({ prompt });
      setAiImage(response);
      console.log(response);
      // const responseDes = await generateDescription({
      //   prompt,
      //   participation_type: null,
      //   result_type: null,
      //   additional_info: null,
      // });
      // console.log(responseDes);
      // handleRequest("ChallengeDescription", responseDes);
    } catch (error) {
      setErrorAi(true);
      console.error("Error in NftImage:", error);
    } finally {
      setErrorAi(false);
      setLoadingAi(false);
    }
  };
  const NFTDesc = async (prompt) => {
    try {
      setLoadingDesc(true);
      const responseDes = await generateDescription({
        prompt,
        participation_type: null,
        result_type: null,
        additional_info: null,
      });
      console.log(responseDes);
      handleRequest("ChallengeDescription", responseDes);
      return responseDes;
    } catch (error) {
      setErrorAi(true);
      console.error("Error in NftImage:", error);
      return null;
    } finally {
      setErrorAi(false);
      setLoadingDesc(false);
    }
  };

  const handleClosePopupWithLink = () => {
    setIsPopupWithLinkVisible(false);
  };
  const handleIsOkay = () => {
    setIsPopupWithLinkVisible(false);
    navigate("/explore");
    handleClosePopup();
  };

  let adjustedMaxParticipantsforpopup = challenge.MaxParticipants;

  if (challenge.ParticipationType === 1) {
    adjustedMaxParticipantsforpopup = 2;
  } else if (challenge.ParticipationType === 0) {
    adjustedMaxParticipantsforpopup = 1;
  } else if (challenge.ParticipationType === 2) {
    adjustedMaxParticipantsforpopup = 50;
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category, ind) => {
    setFormStep(2);
    setSelectionIndex(ind);
    setSelectedCategory(category);
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      GameType: category.name === "Fitness" ? category.gameType : "",
    }));
  };
  return (
    <>
      <div className="w-full ">
        {/* Navigation and Steps Indicators */}
        <div className="h-[40px] mt-4 flex flex-row bg-white">
          {/* Back Button */}
          <div
            className="w-[10%] flex items-center justify-center ml-2 mr-4"
            onClick={handleBack}
          >
            <img src={back} className="h-[26px] w-[26px]" />
          </div>
          {/* Step Indicators */}
          <div className="w-full flex flex-row gap-[1.5%] items-center ">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-[30%] ${
                  formStep >= step ? "bg-[#FFC464]" : "bg-[#f9f8f6]"
                } h-[4px] rounded-[8px]`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form Step Text */}
        <div className="h-[43px] flex flex-col justify-center mx-4 mt-6 mb-4  items-start">
          <div className="font-runs text-[20px]">{getFormStepText()}</div>
          <div className="text-[12px] text-[#9F9F9F] mt-1">
            {getFormStepSubText()}
          </div>
        </div>

        {/* fix style guys  */}
        {formStep == 2 && (
          <div>
            {selectedCategory && (
              <div
                className={`div-[#252A31] div-[16px] font-[500] text-start mx-4  ${styles.cardHeading}`}
              >
                <span>
                  {selectedCategory.name === "Chores"
                    ? "Bed"
                    : selectedCategory.name === "Quitting"
                    ? "Quitting Unhealthy Food"
                    : selectedCategory.name === "Wellness"
                    ? "Gym"
                    : selectedCategory.name}
                </span>

                <br />
                <span className="text-sm text-gray-400">
                  {selectedCategory.name === "Chores"
                    ? "Person will maintain his bed everyday in this time frame"
                    : selectedCategory.name === "Quitting"
                    ? "Committing to quit unhealthy food and post proof of healthy meal everyday (in check-in)"
                    : selectedCategory.name === "Wellness"
                    ? "Person is taking challenge (want to create habit) to go everyday to the gym"
                    : selectedCategory.name === "Screen Time"
                    ? "Creating habit to use screen less than input time"
                    : selectedCategory.name === "Skills"
                    ? "Committing everyday to develop a skill (cycling, pushUps, etc)"
                    : ""}
                </span>
                <br />
                {selectedCategory.name === "Skills" && (
                  <input
                    className="flex w-full flex-row  text-sm items-center border-[1px] border-[#C9DE88B2] rounded-[4px] px-2 h-12 mt-2 focus:outline-none"
                    type="text"
                    name="nameOfSkill"
                    placeholder="Declare What skill are you going to work on?"
                    ref={skillNameInputRef}
                  />
                )}
                {selectedCategory.name === "Screen Time" && (
                  <input
                    type="number"
                    name="numberOfScreenTime"
                    className="flex w-full flex-row text-sm items-center border-[1px] border-[#C9DE88B2] rounded-[4px] px-2 h-12 mt-2 focus:outline-none"
                    placeholder="Set Number of hours to set for Screentime?"
                    ref={screenTimeInputRef}
                  />
                )}
                <br />
                {/* 
                <input
                  type="date"
                  name="startDate"
                  className=""
                  ref={startDateInputRef}
                  placeholder="Enter your start date"
                /> */}
              </div>
            )}
          </div>
        )}

        {formStep === 1 && (
          <div>
            <div className="grid grid-cols-3 gap-4 p-4 cursor-pointer">
              {categories.map((category, ind) => {
                if (category.name === "Lifestyle" && category.subcategories) {
                  // If the category is Lifestyle, map its subcategories instead
                  return category.subcategories.map((subcategory, subInd) => (
                    <CategoryCard
                      key={`${ind}-${subInd}`} // Unique key for subcategories
                      category={subcategory} // Pass subcategory details
                      index={subInd}
                      onClick={() => handleCategoryClick(subcategory, subInd)}
                    />
                  ));
                } else {
                  // Render other categories as usual
                  return (
                    <CategoryCard
                      key={ind}
                      category={category}
                      index={ind}
                      onClick={() => handleCategoryClick(category, ind)}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="flex flex-col items-start mx-3 px-1">
            {/* Invite Only Toggle */}
            {/* break 1 */}
            {/* <Invitation isPrivate={isPrivate} setIsPrivate={setIsPrivate} /> */}
            {/* break 2 */}
            {/* <ChallengeNameAndTarget
              challenge={challenge}
              handleRequest={handleRequest}
              errors={errors}
              selectedCategory={selectedCategory}
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
            /> */}

            {/* break 3 */}
            <ChallengeTypeAndDate
              challenge={challenge}
              handleRequest={handleRequest}
              setDuration_={setDuration}
              errors={errors}
            />

            {/* break 4 */}
            {/* <div className="h-[4px] w-full my-4 bg-[#F3F3F3]"></div>
            <ParticipationDetails
              participationType={challenge.ParticipationType}
            /> */}

            <div className="h-[4px] w-full my-4 bg-[#F3F3F3]"></div>
            {/* break 5 */}
            <WagerDetails
              wagerAmount={wagerAmount}
              setWagerAmount={setWagerAmount}
              // formattedConvertedWagerAmount={formattedConvertedWagerAmount}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              options={options}
              selectedWallet={selectedWallet}
              setSelectedWallet={setSelectedWallet}
              wallets={wallets}
              errors={errors}
            />

            <div className="mt-6 w-full rounded-lg">
              {!isApproved && (
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className={`px-4 py-3 mb-4 w-full rounded ${
                    isApproving
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {isApproving ? "Continuing..." : "Continue"}
                </button>
              )}

              {isApproved && (
                <button
                  onClick={handleTransfer}
                  disabled={isTransferring}
                  className={`px-4 py-3 mb-4 w-full rounded ${
                    isTransferring
                      ? "bg-[#FFC464] cursor-not-allowed"
                      : "bg-[#FFC464] text-white"
                  }`}
                >
                  {isTransferring
                    ? "Transferring..."
                    : "Transfer & Start Challenge"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateChallenge;
