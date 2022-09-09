import React from "react";

function ChampionList() {
  let champs = [
    "Akshan",
    "Ashe",
    "Bard",
    "Caitlyn",
    "Draven",
    "Ezreal",
    "Galio",
    "Gangplank",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Karthus",
    "Kled",
    "Lillia",
    "Lux",
    "Maokai",
    "Nocturne",
    "Pantheon",
    "Ryze",
    "Senna",
    "Shen",
    "Sion",
    "Soraka",
    "Swain",
    "Taliyah",
    "TwistedFate",
    "Vex",
    "Xerath",
    "Ziggs",
  ];
  function sex() {
    document.body.style.overflow = document.body.style.overflow === "hidden" ? "unset" : "hidden";
    console.log("sex")
  }

  return (
    <>
      <div className="fixed z-40 w-full h-full top-0 left-0 bg-black opacity-50" onClick={()=>sex()}></div>
      <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-7 gap-2 bg-black opacity-90 items-center p-5 rounded-xl">
          {champs.map((champ, index) => (
            <img
              key={index}
              className="w-20 select-none"
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/" +
                champ +
                ".png"
              }
              alt="ChampIcon.png"
            ></img>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChampionList;
