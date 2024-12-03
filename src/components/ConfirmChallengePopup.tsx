/* eslint-disable */
// @ts-nocheck

import { FC } from "react";
import { useEffect } from "react";
interface PopupFromBottomProps {
  isVisible: boolean;
  onClose: () => void;
}

const ConfirmChallengePopup: FC<PopupFromBottomProps> = (
  { isVisible, onClose, children, imgFullScreen },
  ref
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!isVisible || target.closest(".popup-container")) return;
      onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[10] md:pl-4">
      <div
        className={`bg-white popup-container rounded-t-3xl ${
          imgFullScreen ? " " : "pb-6 px-0.5 py-0.5"
        } w-full md:max-w-[360px] mx-auto transform transition-transform duration-300 ease-out  ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ConfirmChallengePopup;
