import React from 'react';
import { MdDone, MdCheck, MdContentCopy } from 'react-icons/md';

const ChallengeCreatedSuccessfully = ({
  isPrivate,
  sharableLink,
  isCopied,
  handleCopyLink,
  handleIsOkay,
  truncateText,
}) => {
  return (
    <>
      <div className="bg-green-500 w-20 flex justify-center items-center mx-auto rounded-full p-3 mt-10">
        <MdDone size={60} color="white" />
      </div>
      <div className="mt-6 mb-2 text-xl font-bold text-center">
        Challenge Created Successfully!
      </div>
      <div className="font-normal text-xs mx-1 leading-5 text-center text-gray-700">
        Fees has been deducted from your credits
      </div>

      {isPrivate && sharableLink && (
        <>
          <div className="font-normal text-xs mx-1 leading-5 text-center text-gray-700">
            🚨 Save this link or this Pvt challenge can get lost🍃 forever♾️
          </div>
          <div className="py-3 border flex justify-center bg-black text-white items-center border-gray-300 rounded-full mt-4 mb-0 w-full">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-white">Shareable Link:</span>
              <span className="text-underline">
                {truncateText(sharableLink, 4)}{" "}
              </span>
              <button
                className="flex items-center text-white hover:text-gray-700"
                onClick={handleCopyLink}
              >
                {isCopied ? (
                  <MdCheck size={20} color="green" />
                ) : (
                  <MdContentCopy size={20} />
                )}
                <span className="ml-1">
                  {isCopied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      <div className="w-full">
        <button
          className="py-3 border flex justify-center items-center border-gray-300 rounded-full my-8 mt-2 w-full"
          onClick={handleIsOkay}
        >
          <span className="text-black">Okay</span>
        </button>
      </div>
    </>
  );
};

export default ChallengeCreatedSuccessfully;
