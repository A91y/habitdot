import React from 'react';
import { FaXmark } from 'react-icons/fa6';

const ChallengeCreationFailed = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96 max-w-full">
        <div className="flex flex-col items-center gap-2 px-4 py-10 mt-6">
          {/* Icon or Image */}
          <FaXmark className="h-20 w-20 text-red-500" />

          {/* Text Content */}
          <div className="flex flex-col items-center gap-1 mt-8">
            <h1 className="text-xl font-bold text-red-500">
              Challenge Creation Failed
            </h1>
            <h1 className="font-thin font-inter leading-5 text-center text-gray-700">
              Something went wrong. Please try again later.
            </h1>
          </div>

          {/* Close Button */}
          <div className="w-full">
            <button
              className="py-3 border flex justify-center items-center border-gray-300 rounded-full my-8 mt-2 w-full bg-red-500 text-white"
              onClick={onClose}
            >
              <span className="text-white">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCreationFailed;
