import React from "react";
import styles from "../../styles/styles";

type DescriptionProps = {
  challenge: {
    ChallengeName: string;
    StartDate: string;
    EndDate: string;
  };
};

const Description: React.FC<DescriptionProps> = ({ challenge }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(Number(dateString));
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(Number(dateString));
    return date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getChallengeStatus = () => {
    const now = Date.now();
    const start = Number(challenge.StartDate);
    const end = Number(challenge.EndDate);

    if (now < start) {
      return "upcoming";
    } else if (now >= start && now <= end) {
      return "ongoing";
    } else {
      return "ended";
    }
  };

  const status = getChallengeStatus();

  return (
    <div className="w-full">
      {/* Challenge Name */}
      <div
        className={`div-3xl mt-1 ${styles.heading} !text-[24px] truncate w-full break-words whitespace-normal text-left`}
        title={challenge.ChallengeName}
      >
        {challenge.ChallengeName}
      </div>

      {/* Challenge Dates */}
      <div className={`div-xs text-[#576175] ${styles.subtext} text-left hidden`}>
        {status === "ended" && (
          <>
            Ended on {formatDate(challenge.EndDate)} at{" "}
            {formatTime(challenge.EndDate)}
          </>
        )}
        {status === "ongoing" && (
          <>
            {/* Ongoing, started on {formatDate(challenge.StartDate)} at {formatTime(challenge.StartDate)}. */}
            Will end on {formatDate(challenge.EndDate)} at{" "}
            {formatTime(challenge.EndDate)}.
          </>
        )}
        {status === "upcoming" && (
          <>
            Will start on {formatDate(challenge.StartDate)} at{" "}
            {formatTime(challenge.StartDate)}
          </>
        )}
      </div>
    </div>
  );
};

export default Description;
