import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(1 - scrollPosition / 100, 0.3);
      setButtonOpacity(newOpacity);
      setTextOpacity(Math.max(1 - scrollPosition / 50, 0));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonStyle = {
    opacity: isHovered ? 1 : buttonOpacity,
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
      : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "black", // Set button background to black
    color: "white", // Set text color to white
  };

  const textStyle = {
    opacity: isHovered ? 1 : textOpacity,
    maxWidth: isHovered || textOpacity > 0 ? "100px" : "0",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  return (
    <div className="h-20 fixed md:w-[380px] w-full bottom-16 z-50">
      <div className="z-20 md:max-w-[380px] absolute md:right-4 right-4">
        <button
          className={`text-white border-none rounded-full flex items-center ${
            isHovered || textOpacity > 0
              ? "bg-black p-3 "
              : "p-3 rounded-full mx-auto" // Background remains black when hovered
          } ${isHovered ? "" : ""}`}
          style={buttonStyle}
          onClick={() => navigate("/create")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className={`transition-all duration-300 ${
              isHovered || textOpacity > 0 ? "mx-2" : ""
            }`}
            style={textStyle}
          >
            Create
          </span>

          <span
            className={`rounded-xl text-white font-bold ${
              isHovered || textOpacity > 0
                ? "ml-0 text-2xl mb-1 font-normal"
                : "ml-2 text-2xl  font-normal"
            }`}
            style={{ color: "white", marginRight: "8px" }} // Adjusted spacing
          >
            +
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
