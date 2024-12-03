import { useState, useEffect } from "react";

const CheckinActions = ({ checkIn, handleImageUpload, image, loading, checkInLoadingding, mainChallenge }) => {
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);

  useEffect(() => {
    // Check if the last check-in was within the last 24 hours
    const lastCheckInDate = new Date(mainChallenge.lastCheckIn);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastCheckInDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference < 24) {
      setIsCheckInDisabled(true);
    }
  }, [mainChallenge]);

  return (
    <div className="w-full mt-2 flex flex-col gap-3 rounded-t-3xl tall:absolute tall:bottom-0">
      {/* Upload Image Section */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-[90%] bg-red-100 text-black p-3 mx-4 flex items-center justify-center rounded-sm cursor-pointer">
          <label className="text-lg font-semibold cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden w-full"
            />
          </label>
        </div>

        {/* Preview the uploaded image */}
        {loading ? (
          <div className="flex items-center justify-center m-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : image ? (
          <div className="mt-4">
            <p className="text-sm font-semibold">Preview:</p>
            <img
              src={image}
              alt="Uploaded Preview"
              className="mt-2 max-w-xs rounded shadow object-cover h-40"
            />
          </div>
        ) : null}
      </div>

      {/* Check-IN Button */}
      {checkInLoadingding ? (
        <div className="flex items-center justify-center m-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          onClick={image && !isCheckInDisabled ? checkIn : undefined} // Disable the onClick handler if no image or check-in is disabled
          className={`bg-black text-white p-3 mx-4 flex items-center justify-center rounded-sm ${
            image && !isCheckInDisabled ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
          }`}
        >
          <div className="text-lg font-semibold">Check-IN</div>
        </div>
      )}
    </div>
  );
};

export default CheckinActions;
