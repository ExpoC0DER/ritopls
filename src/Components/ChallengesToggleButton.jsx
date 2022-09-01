import React, { useState } from "react";

function ChallengesToggleButton({ text, onToggle }) {
  const [toggle, setToggle] = useState(true);
  return (
    <div
      className={`flex justify-center items-center rounded-lg w-28 h-10 text-lg text-white select-none ${
        toggle ? "bg-lol-gold-200" : "bg-lol-gold-300"
      }`}
      onClick={() => {setToggle(!toggle); onToggle(!toggle)}}
    >
      <h1>{text}</h1>
    </div>
  );
}

export default ChallengesToggleButton;
