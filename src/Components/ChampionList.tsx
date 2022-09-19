import React, { useEffect } from "react";

function ChampionList({ champs, setListNull }) {
  function disableList() {
    document.body.style.overflow = "unset";
    setListNull();
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div
        className="fixed z-40 w-full h-full top-0 left-0 bg-black opacity-50"
        onClick={disableList}
      ></div>
      <div className="fixed min-h-1/2 h-1/2 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black overflow-auto rounded-2xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 items-center p-4">
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
