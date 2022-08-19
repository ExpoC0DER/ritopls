import React from "react";
import "../App.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from "react";

function PlayerCard({ player, removePlayerCard}) {
  const [displayRank,setDisplayRank] = useState(false);
  return (
    <div
      className="flex flex-col w-full h-full m-auto items-center justify-center z-40 select-none"
      onClick={()=>setDisplayRank(!displayRank)}
    >
      <div className="relative flex flex-col w-full h-full pt-5 pb-14 items-center justify-center overflow-hidden">
        
        <h3 className="mb-6 font-bold">
          {player.playerData.name} &#40;{player.server}&#41;{" "}
          {player.rankData.length === 0
            ? "no rank"
            : player.rankData[0].tier.toLowerCase()}
        </h3>
        <img
          className="relative w-32 rounded-full -z-40"
          src={
            "http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/" +
            player.playerData.profileIconId +
            ".png"
          }
          alt="Icon.png"
        />
        {(player.rankData.length !== 0 && displayRank) ? (
          <>
            <img
              className="absolute min-w-[23rem] max-w-[23rem] -translate-y-[1.3rem] -z-40"
              src={
                "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/wings/wings_" +
                player.rankData[0].tier.toLowerCase() +
                ".png"
              }
              alt="IconBorder"
            />
          </>
        ) : (
          <>
            <img
              className="absolute min-w-[20rem] max-w-[20rem] translate-y-[2rem] -z-40"
              src={
                "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/uikit/themed-borders/theme-" +
                (player.playerData.summonerLevel >= 500
                  ? 21
                  : Math.floor(player.playerData.summonerLevel / 25 + 1)) +
                "-border.png"
              }
              alt="IconBorder"
            />
          </>
        )}
      </div>

      <h3>Level: {player.playerData.summonerLevel}</h3>

      <div className="z-50">
        <RiCloseCircleLine onClick={() => removePlayerCard(player.id)} />
      </div>
    </div>
  );
}

export default PlayerCard;
