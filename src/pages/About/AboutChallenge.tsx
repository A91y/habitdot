// /* eslint-disable */
// // @ts-nocheck
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import credit from "/assets/images/credit.webp";
import bullet from "/assets/images/bullet.webp";
import CheckMarkCircle from "/assets/images/CheckMark.svg";
import firstplace from "/assets/images/first_place.webp";
import full from "/assets/images/full.svg";
import CreditIcon from "/assets/images/3xCredit.webp";
import back from "/assets/images/back.svg";
import PopupSlider from "../../components/Modal";
import PopupWithLink from "../../components/Modal";
import { useEffect, useState } from "react";
import ChallengeDetailsDescriptions from "../../components/ChallengeDetails/ChallengeDetailsDescriptions";
import Description from "../../components/ChallengeDetails/Description";
import AnimatedScreen from "../../components/ChallengeDetails/AnimatedScreen";
import { MdDone } from "react-icons/md";
import AboutChallengeDescriptions from "../../components/AboutChallenge/AboutChallengeDescription";
import CheckinActions from "../../components/CheckinActions";
import { handleSingleFileUpload } from "../../utils/api/upload";
import { submitCheckIn } from "../../utils/api/web3";
import { BrowserProvider } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";
import { FiCheckCircle } from "react-icons/fi";

const AboutChallenge: React.FC = () => {
  const { walletProvider } = useAppKitProvider("eip155");
  const challenge = {
    ChallengeID: 1,
    ChallengeName: "Sample Challenge",
    ChallengeDescription: "This is a sample challenge description.",
    Wager: 100,
    MaxParticipants: 10,
    Players: [],
    State: "ACTIVE",
    StartDate: "2023-01-01",
    EndDate: "2023-12-31",
    Currency: "CREDITS",
    Media: "sample_media_url",
    Game: {
      ParticipationType: 1,
      GameType: "TypeA",
    },
    Category: "Sample Category",
    Slug: "sample-challenge",
  };
  const [popup, setPop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOkay, setIsOkay] = useState(false);

  const location = useLocation();
  const { isPrivate, slug } = location.state || {};
  const [sharePopUp, setSharePopUp] = useState(location.state?.share ?? false);
  const [shareLinkPopup, setShareLinkPopUp] = useState(false);

  const { challenge: mainChallenge } = location.state;
  const handleSharePopUp = () => {
    setSharePopUp(false);
  };
  const shareLink = () => {
    setSharePopUp(false);
    setShareLinkPopUp(true);
  };

  const handleShareBlink = () => {
    //   if (!challenge?.ChallengeID) {
    console.error("Challenge ");
    return;
  };

  useEffect(() => {
    console.log(mainChallenge);
  }, [mainChallenge]);

  const navigate = useNavigate();

  const isChallengeOver = ["COMPLETED", "CANCELLED", "NO_WINNER"].includes(
    challenge.State
  );

  const handleConfirmJoinNow = async () => {
    console.log("handleConfirmJoinNow");
    setIsPopupVisible(true);
  };
  function standardizeChallengeName(challengeName) {
    const categoryMap = {
      gym: "Wellness",
      bed: "Chores",
      screentime: "Screen Time",
      quit: "Quits",
      // Add more mappings for skills
      skill: "Skills",
      // You can add other skills as needed
    };

    const normalizedChallengeName = challengeName.toLowerCase().split("-")[0];
    if (categoryMap[normalizedChallengeName]) {
      return categoryMap[normalizedChallengeName];
    } else {
      return challengeName;
    }
  }

  const handleIsOkay = () => {
    setIsOkay(false);
    navigate('/explore')
    handleClosePopup();
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    navigate('/explore')
  };
  console.log(mainChallenge);

  const [image, setImage] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [checkInLoadingding, setCheckInLoading] = useState(false);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("No file selected!");
      return;
    }

    setIsLoading(true);

    try {
      const image = await handleSingleFileUpload(file);
      if (image) {
        setImage(image);
        console.log("Uploaded image URL:", image);
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setIsLoading(false);
    }
  };


  const checkIn = async () => {
    setCheckInLoading(true)
    const lastCheckInDate = new Date(mainChallenge.lastCheckIn);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastCheckInDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference < 24) {
      alert(
        `Shooosh! You already checked in today.\nNext check-in available in ${(24 - hoursDifference).toFixed(1)
        } hours`
      );
      return;
    }

    try {
    // testing u can remove for see modal works or not
      await submitCheckIn(
        mainChallenge.ChallengeID,
        image,
        new BrowserProvider(walletProvider as any)
      );

      setIsModalVisible(true);

    } catch (error) {
      setCheckInLoading(false)
      console.error("Error during check-in:", error);
    } finally {
      setCheckInLoading(false)
    }
  };

  return (
    <div className="flex-1 w-full relative min-h-screen">
      {/* <Helmet>
        <title>
          {"Join " +
            challenge?.ChallengeName +
            ` and  win  ${
              challenge.Wager *
              (challenge?.MaxParticipants || challenge.Players?.length)
            } Credits`}
        </title>
        <meta
          name="twitter:title"
          content={
            "Join " +
            challenge?.ChallengeName +
            ` and win  ${
              challenge.Wager *
              (challenge?.MaxParticipants || challenge.Players?.length)
            } Credits`
          }
        />
        <meta name="twitter:image" content={challenge?.Media} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Challenge on Catoff" />
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta
          property="og:title"
          content={
            "Join " +
            challenge?.ChallengeName +
            ` and  win  ${
              challenge.Wager *
              (challenge?.MaxParticipants || challenge.Players?.length)
            } Credits`
          }
        />
        <meta
          property="og:description"
          content={challenge?.ChallengeDescription}
        />
        <meta property="og:image" content={challenge?.Media} />
        <meta
          property="og:url"
          content={`https://game.catoff.xyz/challenge/${challenge?.ChallengeID}`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}

      <div className=" text-left ">
        <AnimatedScreen
          challenge={{
            Media: "/defaultNFT.png",
            Category: mainChallenge.category,
          }}
          defaultNFT={`defaultNFT`}
          back={back}
          full={full}
          fullScreenImage={false}
          handleGoBack={() => {
            navigate(-1);
          }}
        />
      </div>

      <div className="mx-4 mt-2">
        <Description
          challenge={{
            ChallengeName: standardizeChallengeName(mainChallenge.category),
            StartDate: mainChallenge.startTime,
            EndDate: mainChallenge.lastCheckIn,
          }}
        />
      </div>

      <AboutChallengeDescriptions
        totalStreak={mainChallenge.streakDays}
        totalDays={mainChallenge.maxHabitDays}
        showFullDescription={`showFullDescription`}
        status={mainChallenge.active}
        styles={styles}
        category={mainChallenge.category}
        depositAmount={mainChallenge.depositAmount}
        rewardPoints={mainChallenge.rewardPoints}
      />

      <CheckinActions
        handleImageUpload={handleImageUpload}
        checkIn={checkIn}
        mainChallenge={mainChallenge}
        image={image}
        checkInLoadingding={checkInLoadingding}
        loading={loading}
      />
      {/* breaks popup */}
      {/* <LoginPopup
        isVisible={popup}
        onClose={() => setPop(false)}
        navigate={navigate}
        param={param}
      /> */}
      {/* <SpeculationPopup
        isVisible={speculate}
        onClose={() => setSpeculate(false)}
        navigate={navigate}
        param={param}
        SideBetToken={SideBetToken}
      /> */}
      {/* <ChallengeJoinPopup isVisible={isPopupVisible} onClose={handleClosePopup} isOkay={isOkay} handleIsOkay={handleIsOkay} SlideToConfirm={SlideToConfirm} challenge={challenge} totalParticipants={totalParticipants} isLoadingIndicator={isLoadingIndicator} /> */}
      {/* <InsufficientBalancePopup
        isVisible={isInsufficientBalancePopupVisible}
        onClose={handleCloseInsufficientBalancePopup}
      /> */}
      {/* <ShareChallengePopup
        isVisible={sharePopUp}
        onClose={handleSharePopUp}
        shareLink={shareLink}
        handleShareBlink={handleShareBlink}
        CheckMarkCircle={CheckMarkCircle}
      /> */}

      {isPrivate && (
        <PopupWithLink isVisible={sharePopUp} onClose={handleSharePopUp}>
          <div className="flex flex-col items-center gap-2 p-4">
            <img src={CheckMarkCircle} alt="CheckMark" className="h-12 w-12" />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-xl font-bold">
                Challenge Created Successfully!
              </h1>
              <h1 className="font-thin font-inter leading-5 text-center text-gray-700">
                You may now share it with your friends!
              </h1>
            </div>

            <div className="flex flex-col gap-2 w-full ">
              <div className="flex flex-col items-center mt-4 ">
                <h2 className="text-lg font-semibold text-green-800">
                  Private Challenge SLUG
                </h2>
                <p className="text-sm text-green-700 text-center ">
                  Share this SLUG to invite participants to your private
                  challenge
                </p>
                <div className="flex items-center w-full mt-3 p-2 justify-between bg-gray-100 py-2 box-border border border-black border-opacity-10 rounded-lg">
                  <p className="font-mono text-sm text-gray-900">{slug}</p>
                  <button
                    className="ml-4 px-3  flex justify-center items-center py-2 box-border bg-[#E6FC8E] border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                    onClick={() => {
                      navigator.clipboard.writeText(slug);
                      alert("SLUG copied to clipboard!");
                    }}
                  >
                    Copy SLUG
                  </button>
                </div>
              </div>
              <button
                className="flex justify-center items-center py-4 px-5 box-border border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                type="button"
                onClick={shareLink}
              >
                <h1 className="font-inter font-semibold">Share Link</h1>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-4 px-5 box-border bg-[#E6FC8E] border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                onClick={handleShareBlink}
              ></button>
            </div>
          </div>
        </PopupWithLink>
      )}

      <PopupSlider isVisible={isPopupVisible} onClose={handleClosePopup}>
        {!isOkay ? (
          <div style={{ userSelect: "none" }}>
            <img
              className="h-20 w-20 mx-auto mt-8"
              src={CreditIcon}
              alt="Join Challenge"
            />
            <div className="text-3xl my-4 font-bold ">
              {mainChallenge.depositAmount} {challenge?.Currency}
            </div>
            <div className="font-normal text-xs mx-1 mb-4 leading-5 text-center text-gray-700">
              Put down your wager and compete against {20} other players in this
              challenge.
            </div>
          </div>
        ) : (
          <>
            <div className="bg-green-500 w-20 flex justify-center items-center mx-auto rounded-full p-3 mt-10">
              <MdDone size={60} color="white" />
            </div>
            <div className="mt-6 mb-2 text-xl font-bold">
              Challenge Joined Successfully!
            </div>
            <div className="font-normal text-xs mx-1 leading-5 text-center text-gray-700">
              Wager has been deducted from your credits
            </div>
            <div className="w-full">
              <button
                className="py-3 border flex justify-center items-center border-gray-300 rounded-full my-8 w-full"
                onClick={handleIsOkay}
              >
                <span className="text-black">Okay</span>
              </button>
            </div>
          </>
        )}
      </PopupSlider>

      <PopupWithLink isVisible={sharePopUp} onClose={handleSharePopUp}>
        <div className="flex flex-col items-center gap-2">
          <img src={CheckMarkCircle} alt="CheckMark" className="h-12 w-12" />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl font-bold">
              Challenge Created Successfully!
            </h1>
            <h1 className="font-thin font-inter leading-5 text-center text-gray-700">
              You may now share it with your friends!
            </h1>
          </div>
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              className="flex justify-center items-center py-4 px-5 box-border border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
              type="button"
              onClick={shareLink}
            >
              <h1 className="font-inter font-semibold ">Share Link</h1>
            </button>
            <button
              type="button"
              className="flex justify-center items-center py-4 px-5 box-border bg-[#E6FC8E] border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
              onClick={handleShareBlink}
            ></button>
          </div>
        </div>
      </PopupWithLink>
      {isPrivate && (
        <PopupWithLink isVisible={sharePopUp} onClose={handleSharePopUp}>
          <div className="flex flex-col items-center gap-2 p-4">
            <img src={CheckMarkCircle} alt="CheckMark" className="h-12 w-12" />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-xl font-bold">
                Challenge Created Successfully!
              </h1>
              <h1 className="font-thin font-inter leading-5 text-center text-gray-700">
                You may now share it with your friends!
              </h1>
            </div>

            <div className="flex flex-col gap-2 w-full ">
              <div className="flex flex-col items-center mt-4 ">
                <h2 className="text-lg font-semibold text-green-800">
                  Private Challenge SLUG
                </h2>
                <p className="text-sm text-green-700 text-center ">
                  Share this SLUG to invite participants to your private
                  challenge
                </p>
                <div className="flex items-center w-full mt-3 p-2 justify-between bg-gray-100 py-2 box-border border border-black border-opacity-10 rounded-lg">
                  <p className="font-mono text-sm text-gray-900">{slug}</p>
                  <button
                    className="ml-4 px-3  flex justify-center items-center py-2 box-border bg-[#E6FC8E] border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                    onClick={() => {
                      navigator.clipboard.writeText(slug);
                      alert("SLUG copied to clipboard!");
                    }}
                  >
                    Copy SLUG
                  </button>
                </div>
              </div>
              <button
                className="flex justify-center items-center py-4 px-5 box-border border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                type="button"
                onClick={shareLink}
              >
                <h1 className="font-inter font-semibold">Share Link</h1>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-4 px-5 box-border bg-[#E6FC8E] border border-black shadow-[1px_2px_0px_rgba(0,0,0,0.8)] rounded-lg"
                onClick={handleShareBlink}
              ></button>
            </div>
          </div>
        </PopupWithLink>
      )}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg">
            <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Submission Recorded!</h2>
            <p className="text-gray-600 mt-2">
              Your check-in has been successfully recorded.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutChallenge;
