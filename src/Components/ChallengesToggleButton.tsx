import React from "react";

function ChallengesToggleButton({ text,capstoneId,filterCategory, onClick }) {
  return (
    <div
      className={`flex justify-center items-center rounded-lg w-28 h-10 text-lg text-white select-none ${
        capstoneId===filterCategory||filterCategory===null ? "bg-lol-gold-200" : "bg-lol-gold-300"
      }`}
      onClick={() => onClick()}
    >
      <h1>{text}</h1>
    </div>
  );
}

export default ChallengesToggleButton;
