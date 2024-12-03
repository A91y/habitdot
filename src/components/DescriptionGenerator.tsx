import React from "react";
import generate from "../../public/assets/images/generate.png"; // Adjust path as needed

export default function DescriptionGenerator({ onClick, loading }) {
  return (
    <button
      style={styles.button}
      onClick={onClick}
      disabled={loading}
      className="border border-black/20"
    >
      <div style={styles.row}>
        <img src={generate} alt="generate icon" style={styles.icon} />
        <span className="text-[#252a31] text-xs font-medium leading-tight">
          {loading ? "Generating..." : "Re-generate"}
        </span>
      </div>
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#E6FC8E",
    borderRadius: "8px",
    padding: "5px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: "14px",
    height: "14px",
    marginRight: "4px", // Spacing between the icon and text
  },
};
