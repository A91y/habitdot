import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChallengeType {
  Media?: string;
  Category?: string;
}

interface AnimatedScreenProps {
  challenge: ChallengeType;
  defaultNFT: string;
  back: string;

  full: string;
  fullScreenImage: boolean;
  handleGoBack: () => void;
}

const AnimatedScreen: React.FC<AnimatedScreenProps> = ({
  challenge,
  defaultNFT,
  back,
  full,
  fullScreenImage,
  handleGoBack,
}) => {
  useEffect(() => {
    console.log(challenge);
  }, [challenge]);

  return (
    <div>
      <motion.div
        className="h-80 relative"
        style={{
          backgroundImage: `url(${challenge?.Media || defaultNFT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        layoutId="shared-image"
      >
        <div className="flex flex-row justify-between items-center mx-2">
          <button
            onClick={handleGoBack}
            className="bg-transparent cursor-pointer"
          >
            <img src={back} alt="Go back" />
          </button>
        </div>

        <div className="absolute bottom-0 mx-2 flex flex-row py-2 w-[95%]">
          <div className="flex flex-row mt-3">
            <div className="mr-2 text-white bg-[#00000033] rounded-lg backdrop-blur-[76px] px-2 text-xs uppercase leading-6">
              {challenge?.Category}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            className="fixed top-0 md:max-w-[380px] h-full bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            layoutId="shared-image"
          >
            <motion.img
              src={challenge?.Media || defaultNFT}
              alt="Full Screen Content"
              className="w-full h-full object-cover md:max-w-[380px] md:h-auto"
              initial={{ opacity: 0.7, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedScreen;
