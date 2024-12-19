import React, { useState, useRef } from "react";
import { FaWallet } from "react-icons/fa";
import dropdown from "/assets/images/dropdown.png";
import styles from "../../../styles/styles";

const WagerDetails = ({
  wagerAmount,
  setWagerAmount,
  selectedToken,
  setSelectedToken,
  options,
  selectedWallet,
  setSelectedWallet,
  wallets,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenWallet, setIsDropdownOpenWallet] = useState(false);
  const [localError, setLocalError] = useState("");
  const dropdownRef = useRef(null);
  const dropdownWalletRef = useRef(null);

  const handleWagerAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;

    setWagerAmount(value);

    if (value < 1 || !e.target.value) {
      setLocalError("Wager amount must be at least 1.");
    } else {
      setLocalError("");
    }
  };

  return (
    <>
      {/* Wager Details Heading */}
      <div
        className={`div-[#252A31] div-[16px] font-[500]  ${styles.cardHeading}`}
      >
        Wager Details
      </div>
      <div className="w-full ">
        <div
          className={`div-[#252A31] w-[100px] text-[12px] leading-5 mb-4 mt-2 mx-1 flex items-start font-[500] ${styles.label}`}
        >
          Wager Amount
        </div>
        <div
          className={`flex w-full flex-row items-center text-left border-[1px] ${
            localError ? "border-red-500" : "border-[#C9DE88B2]"
          } rounded-[4px] px-2 h-12 gap-[20px] relative`}
        >
          <div className="flex text-left items-center w-full">
            <input
              placeholder="0.00"
              className="max-w-20 w-14 outline-none"
              type="number"
              value={wagerAmount}
              onChange={handleWagerAmountChange}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
          </div>
          <div className="relative ml-auto" ref={dropdownRef}>
            <button
              className="box-border flex justify-center  items-center px-8 py-1  h-8 bg-white border border-gray-300 rounded-sm text-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={selectedToken.imgSrc}
                className="w-5 h-5 mr-2"
                alt={selectedToken.label}
              />
              {selectedToken.label}
              <img src={dropdown} className="ml-2" alt={"dropdown"} />
            </button>

            {/* DROPDOWN CREDITS ✅ */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                {options.map((option) => (
                  <button
                    key={option.value}
                    className={`flex items-center px-4 py-2 w-full text-left ${
                      option.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={option.disabled}
                    onClick={() => {
                      if (!option.disabled) {
                        setSelectedToken(option);
                        setIsDropdownOpen(false);
                      }
                    }}
                  >
                    <img
                      src={option.imgSrc}
                      className="w-5 h-5 mr-2"
                      alt={option.label}
                    />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {localError && (
          <div className="text-red-500 text-sm mt-1 text-left">
            {localError}
          </div>
        )}
      </div>

  
      <div
        className={`div-[#252A31] div-[16px] font-[500]  ${styles.cardHeading} mt-4`}
      >
        Connected Wallet
      </div>
      <div className="relative w-full">
        <div className="border text-left flex border-[#C9DE88B2] mt-2 rounded-[4px] px-3 py-2  w-full">
          {selectedWallet.slice(0, 15)}...
          <div className="relative ml-auto" ref={dropdownWalletRef}>
            <button
              className="box-border flex justify-center items-center px-8 py-1  h-8 bg-white border border-gray-300 rounded-sm text-sm"
              onClick={() => setIsDropdownOpenWallet(!isDropdownOpenWallet)}
            >
              <FaWallet />
              <span className="ml-2">{selectedWallet.slice(0, 8)}...</span>
              <img src={dropdown} className="ml-2" alt={"dropdown"} />
            </button>
            {isDropdownOpenWallet && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.PublicKey}
                    className="flex items-center px-4 py-2 w-full text-left"
                    onClick={() => {
                      setSelectedWallet(wallet.PublicKey);
                      setIsDropdownOpenWallet(false);
                    }}
                  >
                    <FaWallet className="w-5 h-5 mr-2" />
                    <span>{wallet.PublicKey.slice(0, 15)}...</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
          {/* Bridge Button */}
          <div className="mt-4 w-full -mb-4">
        <a
          href="https://apps.moonbeam.network/moonbeam/xcm?asset=dot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black border border-black font-medium py-2.5 px-12 rounded inline-block text-center w-full"
        >
          Bridge from DOT to XDOT
        </a>
      </div>

    </>
  );
};

export default WagerDetails;
