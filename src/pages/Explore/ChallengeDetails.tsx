// /* eslint-disable */
// // @ts-nocheck

// import React, { useEffect, useState } from "react";
// import { PublicKey } from "@solana/web3.js";

import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { BsFullscreenExit } from "react-icons/bs";
import { Helmet } from "react-helmet";
import profile from "/assets/images/profile.webp";
import styles from "../../styles/styles";
import credit from "/assets/images/credit.webp";
import bullet from "/assets/images/bullet.webp";
import CheckMarkCircle from "/assets/images/CheckMark.svg";
// import useUserChallenges from "../../hooks/useUserChallenges";
import chalengeBackground from "/assets/images/challenge_background.webp";
import firstplace from "/assets/images/first_place.webp";
// import useChallengeDetails from "../../hooks/useChallengeDetails";
import av from "/assets/images/av.webp";
import money from "/assets/images/money.svg";
import full from "/assets/images/full.svg";
import leftIcon from "/assets/images/back.webp";
import CreditIcon from "/assets/images/3xCredit.webp";
import share from "/assets/images/share.svg";
import back from "/assets/images/back.svg";
import defaultNFT from "../../assets/defaultNFT.png";
// import SlideToConfirm from "../../components/SlideToConfirm";
import PopupSlider from "../../components/Modal";
// import { CiCircleInfo } from "react-icons/ci";
import PopupWithLink from "../../components/Modal";
import { useState } from "react";
import ChallengeDetailsDescriptions from "../../components/ChallengeDetails/ChallengeDetailsDescriptions";
import Description from "../../components/ChallengeDetails/Description";
import AnimatedScreen from "../../components/ChallengeDetails/AnimatedScreen";
// import {
//   joinChallengeAPI,
//   getShareableChallengeLink,
//   joinChallengeWithTokenAPI,
//   joinChallengeWithTokensUsingOkto,
//   joinChallengeWithTokensUsingDeeplink,
// } from "../../utils/api/challengeApi";
// import SideBetToken from "../../../public/assets/sidebets/sidebettoken.svg";
// // import useSolPrice from "../../hooks/useSolPrice";
// // import isValidator from "../../utils/isValidator";
// import Popup from "../../components/Popup";
// import {
//   getGameTypeString,
//   getParticipationTypeString,
//   getCategoryString,
//   getGameTypeNotes,
// } from "../../utils/constants/gameTags";
import { MdDone } from "react-icons/md";
// import { MdErrorOutline } from "react-icons/md";
import creditSGV from "../../../public/assets/images/CreditSVG.svg";
// import {
//   DEEP_LINK_FUNCTIONS,
//   GAME_TYPE,
//   LOCALSTORAGE_ITEMS,
//   PARTICIPATION_TYPE,
//   VERIFIED_CURRENCY,
//   VIEW_TYPE,
// } from "../../types/enums";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Wallet } from "@coral-xyz/anchor";
// import ShareableModal from "../../components/ShareableModal";
// import { getUserSideBets } from "../../utils/api/sidebetApi";
// import {
//   useOkto,
//   type OktoContextType,
//   type Wallet as oktoWalletType,
// } from "okto-sdk-react";
// import { useViewStateStore } from "../../store/user";
// import bs58 from "bs58";
// import { encryptPayload } from "../Signup/deeplinks/helperFunctions";
// import {
//   buildUrl,
//   buildUrlPhantom,
//   buildUrlSolflare,
// } from "../Signup/deeplinks/buildUrl";
import truncateText from "../../utils/truncateText";
import ChallengeActions from "../../components/ChallengeActions";
// import nacl from "tweetnacl";
// import { motion, AnimatePresence } from "framer-motion";
// import LoginPopup from "../../components/ChallengeDetails/PopUp/LoginPopup";
// import SpeculationPopup from "../../components/ChallengeDetails/PopUp/SpeculationPopup";
// import ChallengeJoinPopup from "../../components/ChallengeDetails/PopUp/ChallengeJoinPopup";
// import InsufficientBalancePopup from "../../components/ChallengeDetails/PopUp/InsufficientBalancePopup";
// import ShareChallengePopup from "../../components/ChallengeDetails/PopUp/ShareChallengePopup";
// import { SOLANA_NETWORK } from "../../utils/constants/url";

const ChallengeDetails: React.FC = () => {
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
  const location = useLocation();
  const { challenge: mainChallenge } = location.state;
  const [popup, setPop] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOkay, setIsOkay] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [
    isInsufficientBalancePopupVisible,
    setIsInsufficientBalancePopupVisible,
  ] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoadingIndicator, setIsLoadingIndicator] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isSpeculator, setIsSpeculator] = useState(false); //got to get this from the api
  const [active, setActive] = useState<number[]>([]);
  const [isavalidator, setIsavalidator] = useState(null);
  const [speculate, setSpeculate] = useState(false);
  const [sidebetted, setSidebetted] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  //   useEffect(() => {
  //     getUserSideBets().then((res) => {
  //       const sidebettedChallenges = res?.data.map((item) => item.challengeID);
  //       if (sidebettedChallenges.length > 0) {
  //         setSidebetted(sidebettedChallenges.includes(Number(param.id)));
  //       }
  //     });
  //   }, []);

  const { isPrivate, slug } = location.state || {};
  const [sharePopUp, setSharePopUp] = useState(location.state?.share ?? false);
  const [shareLinkPopup, setShareLinkPopUp] = useState(false);
  //   const { solPrice, convertCreditsToUSDT, convertCreditsToSOL } = useSolPrice();
  //   const handleShareLinkPopUp = () => {
  //     setShareLinkPopUp(false);
  //   };
  const handleSharePopUp = () => {
    setSharePopUp(false);
  };
  const shareLink = () => {
    setSharePopUp(false);
    setShareLinkPopUp(true);
  };
  //   const handleSharePopUp = () => {
  //     setSharePopUp(!sharePopUp);
  //   };

  //   const shareLink = () => {
  //     setSharePopUp(false);
  //     setShareLinkPopUp(true);
  //     if (slug) {
  //       navigator.clipboard.writeText(
  //         // `${window.location.origin}/challenge/${slug}`
  //         `${window.location.origin}/challenge/${challenge.ChallengeID}`
  //       );
  //       alert("Link copied to clipboard!");
  //     }
  //   };
  const handleShareBlink = () => {
    //   if (!challenge?.ChallengeID) {
    console.error("Challenge ");
    return;
  };

  //     const blinkLink = `https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fjoin.catoff.xyz%2Fapi%2Factions%2Fjoin-challenge%3Fclusterurl%3Dmainnet%26challengeID%3D${challenge.ChallengeID}&cluster=mainnet`;

  //     window.location.href = blinkLink;
  //   };

  //   const param = useParams();
  const navigate = useNavigate();
  //   const { media } = location.state || {};
  //   const { challenges, isLoading } = useUserChallenges();
  //   const toggleDescription = () => {
  //     setShowFullDescription(!showFullDescription);
  //   };

  //   const { challenge, error } = useChallengeDetails(Number(param.id) || 0);
  //   const { connection } = useConnection();
  //   const wallet = useWallet();
  //   useEffect(() => {
  //     if (challenge) {
  //       // console.log("Challenge in ChallengeDetails:🥳 ", challenge);
  //     }
  //   }, [challenge]);

  //   const calculate20 = () => {
  //     const playersJoined =
  //       challenge?.Players?.length || challenge?.ParticipantsJoined || 0;

  //     switch (challenge?.Game?.ParticipationType) {
  //       case 0:
  //         return 1;
  //       case 1:
  //         return 2;
  //       case 2:
  //         if (playersJoined < 50) return 50;
  //         if (playersJoined >= 50 && playersJoined < 70) return 70;
  //         if (playersJoined >= 70 && playersJoined < 150) return 150;
  //         return 300;
  //       default:
  //         return challenge?.MaxParticipants;
  //     }
  //   };
  //   const totalParticipants = calculateTotalParticipants();
  //   const numericWagerAmount = totalParticipants * challenge?.Wager || 0; // Check if the input is always a string
  //   let convertedWagerAmount;
  //   const wagerInUSDT = convertCreditsToUSDT(numericWagerAmount);

  //   if (challenge && challenge.Currency === "SOL") {
  //     convertedWagerAmount = convertCreditsToSOL(numericWagerAmount);
  //   } else if (challenge && challenge.Currency === "CREDITS") {
  //     convertedWagerAmount = wagerInUSDT;
  //   } else {
  //     convertedWagerAmount = numericWagerAmount;
  //   }

  //   const formattedConvertedWagerAmount = !isNaN(convertedWagerAmount)
  //     ? parseFloat(convertedWagerAmount).toFixed(2)
  //     : "0.00";
  //   // const totalParticipants = calculateTotalParticipants();
  //   const totalPrizePool = challenge?.Wager
  //     ? totalParticipants * (challenge?.Wager || 0)
  //     : (challenge?.WagerStaked || 0) * totalParticipants;

  //   // console.log("formatted amount", formattedConvertedWagerAmount);
  //   const {
  //     getWallets,
  //     getPortfolio,
  //     executeRawTransactionWithJobStatus,
  //     createWallet,
  //   } = useOkto() as OktoContextType;
  //   const [oktoWallet, setOktoWallet] = useState<any>(null);
  //   const { setViewType, viewType, detectViewType } = useViewStateStore();
  //   useEffect(() => {
  //     detectViewType();
  //   }, [detectViewType]);

  //   console.log(viewType, "VIEW type");
  //   // console.log(window.innerWidth, "Window Width");
  //   const loadSession = () => localStorage.getItem("session") || "";

  //   // Load sharedSecret from localStorage
  //   const loadSharedSecret = () => {
  //     const storedSharedSecret = localStorage.getItem(
  //       LOCALSTORAGE_ITEMS.SHARED_SECRET
  //     );
  //     return storedSharedSecret
  //       ? Uint8Array.from(JSON.parse(storedSharedSecret))
  //       : null;
  //   };

  //   useEffect(() => {
  //     const checkValidatorStatus = async () => {
  //       const isValid = await isValidator(Number(param.id) || 0);
  //       const gameType = challenge?.Game?.GameType;
  //       const ParticipationType = challenge?.Game?.ParticipationType;
  //       if (
  //         isValid &&
  //         (gameType === GAME_TYPE.VALIDATOR ||
  //           ParticipationType === PARTICIPATION_TYPE.ZERO_VS_ONE)
  //       ) {
  //         setIsavalidator(true);
  //       } else {
  //         setIsavalidator(false);
  //       }
  //     };

  //     checkValidatorStatus();
  //   }, [param.id, challenge?.Game?.GameType]);

  //   useEffect(() => {
  //     const connectWallets = async () => {
  //       await checkWalletConnected();
  //     };

  //     connectWallets();
  //   }, [viewType]);

  //   const handleCloseAddCreditsPopup = () => {
  //     navigate("/");
  //     setPop(false);
  //   };
  //   const handleGoBack = () => {
  //     navigate("/explore");
  //   };

  //   const handleShareClick = () => {
  //     navigator.share({
  //       title: "Share the challenge with your friends and family!",
  //       text: "Share the challenge with your friends and family!",
  //       url: shareableLink,
  //     });
  //   };
  //   const handleFullScreenToggle = () => {
  //     setFullScreenImage(!fullScreenImage); // Toggle fullscreen mode
  //   };

  //   useEffect(() => {
  //     const fetchShareableLink = async () => {
  //       // console.log("CHALLENGE OBJECTTTTT", challenge);
  //       const link = await getShareableChallengeLink(challenge?.Slug);
  //       setShareableLink(link);
  //     };
  //     fetchShareableLink();
  //   }, [challenge?.ChallengeID]);

  //   useEffect(() => {
  //     const activeChallenges = challenges.map((item) => item.ChallengeID);

  //     setActive(activeChallenges);
  //     if (challenge) {
  //       setIsJoined(activeChallenges.includes(challenge.ChallengeID));
  //     }
  //   }, [challenges]);

  //   if (!challenge) {
  //     return <div>Loading...</div>;
  //   }

  //   const usdtValue = solPrice
  //     ? convertCreditsToUSDT(challenge.Wager * challenge.MaxParticipants)
  //     : null;

  const isChallengeOver = ["COMPLETED", "CANCELLED", "NO_WINNER"].includes(
    challenge.State
  );

  //   const isProcessing = ["PROCESSING"].includes(challenge.State);
  //   const isChallengeStarted = new Date() >= new Date(challenge.StartDate);
  //   const isMaxParticipantsReached =
  //     (challenge.Players?.length || 0) >= challenge.MaxParticipants;
  //   const progress =
  //     ((challenge.Players?.length || 0) / calculateTotalParticipants()) * 100;

  //   // console.log("PROGRESS", progress);

  //   const handleSlide = (event) => {
  //     // console.log("Sliding...", event);
  //   };

  //   const handleSlideEnd = (event) => {
  //     // console.log("Slide ended", event);
  //   };

  //   const handleSlideConfirmed = async () => {
  //     setIsLoadingIndicator(true);
  //     try {
  //       await checkWalletConnected();
  //       const val = await handleJoinNow();

  //       if (val && val.status === "NOT_SUFFICIENT") {
  //         setIsInsufficientBalancePopupVisible(true);
  //       } else if (!val) {
  //         console.error("Received undefined response from handleJoinNow.");
  //         setMessage(
  //           "Could not complete the join request. Please try again later."
  //         );
  //         // setIsErrorPopupVisible(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to join the challenge:", error);
  //     } finally {
  //       setIsLoadingIndicator(false);
  //     }
  //   };

  //   const handleRelogin = () => {
  //     // localStorage.clear();
  //     // window.location.replace("/");
  //     console.log("RELOGIN TRIGGERED😤");
  //   };
  //   const handleSlideNotConfirmed = (event) => {
  //     console.log("Slide not confirmed", event);
  //   };

  const handleConfirmJoinNow = async () => {
    console.log("handleConfirmJoinNow");
    setIsPopupVisible(true);
  };

  //   const checkWalletConnected = async () => {
  //     if (viewType === VIEW_TYPE.OKTO_WALLET_VIEW) {
  //       const wallets = await getWallets();
  //       if (!wallets || wallets.wallets.length === 0) {
  //         console.log("No Okto wallets connected. Redirecting to login.");
  //         handleRelogin();
  //       } else {
  //         const solanaDevnetWallet = wallets.wallets.find(
  //           (wallet) => wallet.network_name === SOLANA_NETWORK // changed for mainnet
  //         );

  //         if (solanaDevnetWallet) {
  //           setOktoWallet(solanaDevnetWallet);
  //         } else {
  //           console.error("No SOLANA wallet found. Redirecting to login.");
  //           handleRelogin();
  //         }
  //       }
  //     } else if (viewType === VIEW_TYPE.EXTENSION_WALLET_VIEW) {
  //       const walletName = localStorage.getItem("walletName");

  //       if (walletName === "Google via TipLink") {
  //         console.log("Using Google TipLink wallet");

  //         const accessToken = localStorage.getItem("accessToken");
  //         const refreshToken = localStorage.getItem("refreshToken");
  //         const tipLinkPkConnected = localStorage.getItem("tipLink_pk_connected");

  //         if (!accessToken || !refreshToken || !tipLinkPkConnected) {
  //           console.log("TipLink wallet data missing. Redirecting to login.");
  //           handleRelogin();
  //         } else {
  //           console.log("TipLink wallet is connected with access token.");
  //         }
  //       } else {
  //         if (!wallet.connected) {
  //           try {
  //             await wallet.connect();
  //           } catch (error) {
  //             console.error(
  //               "Extension wallet connection failed. Redirecting to login."
  //             );
  //             handleRelogin();
  //           }
  //         }
  //       }
  //     } else if (viewType === VIEW_TYPE.DEEP_LINK_VIEW) {
  //       const walletName = localStorage.getItem("walletName");

  //       if (walletName === "Google via TipLink") {
  //         const accessToken = localStorage.getItem("accessToken");
  //         const tipLinkPkConnected = localStorage.getItem("tipLink_pk_connected");

  //         if (!accessToken || !tipLinkPkConnected) {
  //           console.log("TipLink wallet data missing. Redirecting to login.");
  //           handleRelogin();
  //         } else {
  //           console.log("TipLink wallet is connected via Deeplink.");
  //         }
  //       } else {
  //         if (!wallet.connected) {
  //           const session = localStorage.getItem(LOCALSTORAGE_ITEMS.SESSION);
  //           const sharedSecretStr = localStorage.getItem(
  //             LOCALSTORAGE_ITEMS.SHARED_SECRET
  //           );

  //           let sharedSecret = null;
  //           try {
  //             sharedSecret = sharedSecretStr
  //               ? new Uint8Array(JSON.parse(sharedSecretStr))
  //               : null;
  //           } catch (error) {
  //             console.error(
  //               "Failed to parse sharedSecret from localStorage:",
  //               error
  //             );
  //           }

  //           console.log("Loaded session:", session);
  //           console.log("Loaded sharedSecret:", sharedSecret);

  //           if (!session || !sharedSecret) {
  //             console.error(
  //               "Session or shared secret missing, redirecting to login."
  //             );
  //             handleRelogin();
  //             return;
  //           }

  //           const walletAddress = localStorage.getItem(
  //             LOCALSTORAGE_ITEMS.WALLET_ADDRESS
  //           );
  //           console.log("Loaded walletAddress:", walletAddress);

  //           if (!walletAddress) {
  //             console.error(
  //               "No wallet address found in localStorage. Redirecting to login."
  //             );
  //             handleRelogin();
  //             return;
  //           }

  //           const dappKeyPairStr = localStorage.getItem(
  //             LOCALSTORAGE_ITEMS.DAPP_KEY_PAIR
  //           );
  //           const dappKeyPair = dappKeyPairStr
  //             ? JSON.parse(dappKeyPairStr)
  //             : nacl.box.keyPair();

  //           if (!dappKeyPair) {
  //             console.log("Dapp key pair missing, generating new key pair.");
  //             localStorage.setItem(
  //               LOCALSTORAGE_ITEMS.DAPP_KEY_PAIR,
  //               JSON.stringify({
  //                 publicKey: Array.from(dappKeyPair.publicKey),
  //                 secretKey: Array.from(dappKeyPair.secretKey),
  //               })
  //             );
  //           }

  //           const { apidata, onChainResponse } =
  //             await joinChallengeWithTokensUsingDeeplink(
  //               challenge,
  //               walletAddress
  //             );

  //           if (!onChainResponse) {
  //             console.error(
  //               "onChainResponse is missing after attempting to join challenge."
  //             );
  //             return {
  //               status: "ERROR",
  //               message: "Failed to join with Deeplink",
  //             };
  //           }

  //           const serializedTransaction = onChainResponse.serialize({
  //             requireAllSignatures: false,
  //           });

  //           const payload = {
  //             session,
  //             transaction: bs58.encode(serializedTransaction),
  //           };
  //           const [nonce, encryptedPayload] = encryptPayload(
  //             payload,
  //             sharedSecret
  //           );

  //           const params = new URLSearchParams({
  //             dapp_encryption_public_key: bs58.encode(
  //               new Uint8Array(Object.values(dappKeyPair.publicKey))
  //             ),
  //             nonce: bs58.encode(nonce),
  //             redirect_link: `${window.location.origin}/challenge/${param.id}`,
  //             payload: bs58.encode(encryptedPayload),
  //           });

  //           const url = buildUrl(
  //             DEEP_LINK_FUNCTIONS.SIGN_AND_SEND_TRANSACTION,
  //             params
  //           );
  //           window.location.href = url;
  //         }
  //       }
  //     } else {
  //       console.log("No valid wallet type detected. Redirecting to login.");
  //       handleRelogin();
  //     }
  //   };

  //   const handleJoinNow = async () => {
  //     try {
  //       const executeChallengeJoin = async () => {
  //         if (viewType === VIEW_TYPE.OKTO_WALLET_VIEW) {
  //           const wallets = await getWallets();
  //           if (!wallets || wallets.wallets.length === 0) {
  //             console.log("No Okto wallets connected. Redirecting to login.");
  //             handleRelogin();
  //             return;
  //           }

  //           const solanaDevnetWallet = wallets.wallets.find(
  //             (wallet) => wallet.network_name === SOLANA_NETWORK //changed for mainet
  //           );

  //           if (!solanaDevnetWallet) {
  //             console.error("No SOLANA wallet found. Redirecting to login.");
  //             handleRelogin();
  //             return;
  //           }

  //           console.log("Using Okto Wallet:", solanaDevnetWallet);
  //           const portFolio = await getPortfolio();
  //           console.log("portFolio ", portFolio);

  //           const devnetResponse = await joinChallengeWithTokensUsingOkto(
  //             challenge,
  //             solanaDevnetWallet.address,
  //             portFolio
  //           );

  //           if (devnetResponse.onChainResponse?.status === "SUCCESS") {
  //             console.log(
  //               "Transaction successful on SOLANA, halting further processing."
  //             );
  //             return { status: "SUCCESS", data: devnetResponse };
  //           }

  //           return challenge.Currency === VERIFIED_CURRENCY.CREDITS
  //             ? await joinChallengeAPI(challenge)
  //             : devnetResponse;
  //         } else if (viewType === VIEW_TYPE.EXTENSION_WALLET_VIEW) {
  //           const walletName = localStorage.getItem("walletName");

  //           if (walletName === "Google via TipLink") {
  //             console.log("Using Google TipLink wallet for transaction");

  //             const accessToken = localStorage.getItem("accessToken");
  //             const tipLinkPkConnected = localStorage.getItem(
  //               "tipLink_pk_connected"
  //             );

  //             console.log(
  //               "Converted to PublicKey:",
  //               new PublicKey(tipLinkPkConnected)
  //             );
  //             console.log("Converted Tiplink POublic Key", tipLinkPkConnected);

  //             if (!accessToken || !tipLinkPkConnected) {
  //               console.error(
  //                 "TipLink wallet data missing. Redirecting to login."
  //               );
  //               handleRelogin();
  //               return;
  //             }

  //             const response = await joinChallengeWithTokenAPI(
  //               challenge,
  //               connection,
  //               new PublicKey(tipLinkPkConnected)
  //             );

  //             return response;
  //           } else {
  //             if (!wallet.connected) {
  //               try {
  //                 await wallet.connect();
  //                 if (!wallet.connected)
  //                   throw new Error("Failed to connect wallet.");
  //               } catch (error) {
  //                 console.error("Failed to reconnect wallet:", error);
  //                 handleRelogin();
  //                 return;
  //               }
  //             }

  //             console.log("Using Extension Wallet: ", wallet);
  //             return challenge.Currency === VERIFIED_CURRENCY.CREDITS
  //               ? await joinChallengeAPI(challenge)
  //               : await joinChallengeWithTokenAPI(
  //                   challenge,
  //                   connection,
  //                   wallet as unknown as Wallet
  //                 );
  //           }
  //         } else if (viewType === VIEW_TYPE.DEEP_LINK_VIEW) {
  //           const walletName = localStorage.getItem("walletName");

  //           if (walletName === "Google via TipLink") {
  //             console.log("Using Google TipLink wallet for transaction");

  //             const accessToken = localStorage.getItem("accessToken");
  //             const tipLinkPkConnected = localStorage.getItem(
  //               "tipLink_pk_connected"
  //             );

  //             console.log(
  //               "Converted to PublicKey:",
  //               new PublicKey(tipLinkPkConnected)
  //             );
  //             console.log("Converted Tiplink POublic Key", tipLinkPkConnected);

  //             if (!accessToken || !tipLinkPkConnected) {
  //               console.error(
  //                 "TipLink wallet data missing. Redirecting to login."
  //               );
  //               handleRelogin();
  //               return;
  //             }

  //             const response = await joinChallengeWithTokenAPI(
  //               challenge,
  //               connection,
  //               new PublicKey(tipLinkPkConnected)
  //             );

  //             return response;
  //           } else {
  //             if (!wallet.connected) {
  //               const session = localStorage.getItem(LOCALSTORAGE_ITEMS.SESSION);
  //               const sharedSecretStr = localStorage.getItem(
  //                 LOCALSTORAGE_ITEMS.SHARED_SECRET
  //               );

  //               let sharedSecret = null;
  //               try {
  //                 sharedSecret = sharedSecretStr
  //                   ? new Uint8Array(JSON.parse(sharedSecretStr))
  //                   : null;
  //               } catch (error) {
  //                 console.error(
  //                   "Failed to parse sharedSecret from localStorage:",
  //                   error
  //                 );
  //               }

  //               console.log("Loaded session:", session);
  //               console.log("Loaded sharedSecret:", sharedSecret);

  //               if (!session || !sharedSecret) {
  //                 console.error(
  //                   "Session or shared secret missing, redirecting to login."
  //                 );
  //                 handleRelogin();
  //                 return;
  //               }

  //               const walletAddress = localStorage.getItem(
  //                 LOCALSTORAGE_ITEMS.WALLET_ADDRESS
  //               );
  //               console.log("Loaded walletAddress:", walletAddress);

  //               if (!walletAddress) {
  //                 console.error(
  //                   "No wallet address found in localStorage. Redirecting to login."
  //                 );
  //                 handleRelogin();
  //                 return;
  //               }

  //               const { apidata, onChainResponse } =
  //                 await joinChallengeWithTokensUsingDeeplink(
  //                   challenge,
  //                   walletAddress
  //                 );

  //               if (!onChainResponse) {
  //                 console.error(
  //                   "onChainResponse is missing after attempting to join challenge."
  //                 );
  //                 return {
  //                   status: "ERROR",
  //                   message: "Failed to join with Deeplink",
  //                 };
  //               }

  //               const serializedTransaction = onChainResponse.serialize({
  //                 requireAllSignatures: false,
  //               });

  //               const payload = {
  //                 session,
  //                 transaction: bs58.encode(serializedTransaction),
  //               };
  //               const [nonce, encryptedPayload] = encryptPayload(
  //                 payload,
  //                 sharedSecret
  //               );

  //               const params = new URLSearchParams({
  //                 dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
  //                 nonce: bs58.encode(nonce),
  //                 redirect_link: `${window.location.origin}/challenge/${param.id}`,
  //                 payload: bs58.encode(encryptedPayload),
  //               });

  //               const url = buildUrl(
  //                 DEEP_LINK_FUNCTIONS.SIGN_AND_SEND_TRANSACTION,
  //                 params
  //               );
  //               window.location.href = url;
  //             }

  //             console.log("Using Extension Wallet: ", wallet);
  //             return challenge.Currency === VERIFIED_CURRENCY.CREDITS
  //               ? await joinChallengeAPI(challenge)
  //               : await joinChallengeWithTokenAPI(
  //                   challenge,
  //                   connection,
  //                   wallet as unknown as Wallet
  //                 );
  //           }
  //         } else {
  //           setMessage("No valid wallet type detected.");
  //           setIsErrorPopupVisible(true);
  //           throw new Error("No valid wallet type detected.");
  //         }
  //       };

  //       const handleJoinError = (apidata) => {
  //         console.log("Challenge Failed to join", apidata);
  //         setIsErrorPopupVisible(true);
  //         setIsPopupVisible(false);
  //         setIsLoadingIndicator(false);
  //         if (
  //           apidata.response?.data?.message === "jwt malformed" ||
  //           apidata.response?.data?.console?.error === "Unauthorized"
  //         ) {
  //           setIsPopupVisible(false);
  //           setIsErrorPopupVisible(false);
  //           setIsLoadingIndicator(false);
  //           setPop(true);
  //         }
  //       };

  //       const response = await executeChallengeJoin();
  //       console.log(response);

  //       if (response && response.status === "NOT_SUFFICIENT") {
  //         setIsPopupVisible(false);
  //         setIsLoadingIndicator(false);
  //         return response;
  //       }

  //       const apiData = response?.apiData;
  //       const onChainResponse = response?.onChainResponse;

  //       if (viewType === VIEW_TYPE.OKTO_WALLET_VIEW && !onChainResponse) {
  //         throw new Error("Okto transaction body did not create");
  //       }

  //       const jobId =
  //         viewType === VIEW_TYPE.OKTO_WALLET_VIEW
  //           ? await executeRawTransactionWithJobStatus(onChainResponse)
  //           : true;

  //       if (apiData?.success && jobId) {
  //         console.log("Challenge Joined successfully", apiData);
  //         setIsOkay(true);
  //       } else {
  //         handleJoinError(apiData);
  //         throw new Error("Failed to join the challenge");
  //       }
  //     } catch (error) {
  //       console.error("Error joining challenge:", error);
  //       if (error.response?.status === 401) {
  //         alert("You need to sign in to continue");
  //         console.log("Unauthorized access. Redirecting to homepage.");
  //         window.location.replace("/");
  //       } else {
  //         const errorMessage =
  //           typeof error === "string"
  //             ? error
  //             : error.message ??
  //               "An unexpected error occurred. Please try again later.";
  //         console.log("Unexpected error:", errorMessage);
  //         setMessage(errorMessage);
  //       }
  //       setIsLoadingIndicator(false);
  //     }
  //   };

  const handleIsOkay = () => {
    setIsOkay(false);
    navigate(`/gameDashboard/${challenge.ChallengeID}`);
    handleClosePopup();
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  //   const handleCloseErrorPopup = () => setIsErrorPopupVisible(false);
  //   const handleCloseInsufficientBalancePopup = () =>
  //     setIsInsufficientBalancePopupVisible(false);
  //   if (isLoading) {
  //     return (
  //       <div className="flex flex-col justify-center items-center h-screen">
  //         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  //         <p className="mt-4 text-gray-700">Loading...</p>
  //       </div>
  //     );
  //   }

  //   const wordCount = challenge.ChallengeDescription?.split(" ").length || 0;

  //   const notes = getGameTypeNotes(challenge?.Game.GameType);
  // console.log(challenge);
  return (
    <div className="flex-1 w-full relative h-screen">
      <div className="mt-0 text-left ">
        {/* AnimatedScreen Break */}
        {/* <AnimatedScreen
          challenge={{
            Media: "sample_media_url",
            Game: {
              ParticipationType: "Type1",
              GameType: "TypeA",
            },
            Category: "Sample Category",
          }}
          defaultNFT={`defaultNFT`}
          back={back}
          // share={share}
          full={full}
          fullScreenImage={false}
          handleGoBack={() => {}}
          handleShareClick={() => {}}
          handleFullScreenToggle={() => {}}
          getParticipationTypeString={(type) => "set"}
          getGameTypeString={(type) => "set"}
        /> */}
      </div>

      <div className="mx-4 mt-2">
        <Description
          challenge={{
            ChallengeName: "Sample Challenge",
            StartDate: "2023-01-01",
            EndDate: "2023-12-31",
          }}
        />
      </div>

      <ChallengeDetailsDescriptions
        av={av}
        challenge={challenge}
        totalParticipants={10}
        progress={30}
        showFullDescription={`showFullDescription`}
        wordCount={12}
        toggleDescription={`toggleDescription`}
        profile={profile}
        money={money}
        totalPrizePool={3000}
        truncateText={truncateText}
        styles={styles}
      />

      <ChallengeActions
        challenge={challenge}
        isChallengeOver={isChallengeOver}
        sidebetted={sidebetted}
        isSpeculator={isSpeculator}
        isavalidator={isavalidator}
        isJoined={isJoined}
        active={active}
        handleConfirmJoinNow={handleConfirmJoinNow}
        setSpeculate={setSpeculate}
        creditSGV={creditSGV}
      />

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
              {challenge.Wager} {challenge?.Currency}
            </div>
            <div className="font-normal text-xs mx-1 mb-4 leading-5 text-center text-gray-700">
              Put down your wager and compete against {20} other players in this
              challenge.
            </div>
            {/* <div className="my-8 w-full flex justify-center">
              <SlideToConfirm
                onSlide={handleSlide}
                onSlideEnd={handleSlideEnd}
                onSlideConfirmed={handleSlideConfirmed}
                onSlideNotConfirmed={handleSlideNotConfirmed}
                // unconfirmedTip Text="Slide to confirm"
                // confirmedTipText="Confirmed!"
                // sliderStyle={{ width: '300px', height: '50px' }}
                unconfirmedTipText="Slide to confirm"
                unconfirmedTipTextStyle={{ color: "black", fontSize: 18 }}
                confirmedTipText="Processing!"
                confirmedTipTextStyle={{ color: "black", fontSize: 18 }}
                loading={isLoadingIndicator} // Pass loading state here
                // onSlideConfirmed={async () => {
                //   setIsLoadingIndicator(true);
                //   if (!wallet.connected && !oktoWallet) {
                //     try {
                //       if (!wallet.connected) {
                //         await wallet.connect();
                //       } else if (!oktoWallet) {
                //         const wallets = await getWallets();
                //         if (wallets.wallets && wallets.wallets.length > 0) {
                //           setOktoWallet(wallets[0]);
                //         } else {
                //           console.error("Failed to connect Okto wallet");
                //           setIsLoadingIndicator(false);
                //           return; // Stop execution if neither wallet can be connected
                //         }
                //       }
                //     } catch (err) {
                //       console.error("Failed to connect wallet:", err);
                //       setIsLoadingIndicator(false);
                //       return; // Stop execution if wallet connection fails
                //     }
                //   }
                //   handleJoinNow();
                // }}
                sliderStyle={{
                  justifyContent: "center",
                  width: "100%",
                  height: 55,
                  borderRadius: 16,
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  border: "1px solid #000",
                }}
                sliderButtonStyle={{
                  backgroundColor: "#000",
                  borderRadius: 16,
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              />
            </div> */}
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

      {/* <ShareableModal
        isOpen={shareLinkPopup}
        onRequestClose={handleShareLinkPopUp}
        shareUrl={shareableLink}
      /> */}
    </div>
  );
};

export default ChallengeDetails;
