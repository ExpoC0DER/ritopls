import React from "react";
import "../App.css";
import { RiCloseCircleLine } from "react-icons/ri";

function Card({ playerCards, removePlayerCard }) {
  return playerCards.map((playerCard, index) => (
    <div
      className="flex flex-col z-40 flex-wrap m-auto items-center justify-center"
      key={index}
    >
      <h3 className="font-bold">
        {playerCard.playerData.name} &#40;{playerCard.server}&#41;
      </h3>

      <div className="flex flex-col flex-wrap my-11 items-center justify-center">
      <img
          className="w-32 rounded-full -translate-y-3"
          src={
            "http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/" +
            playerCard.playerData.profileIconId +
            ".png"
          }
          alt="Icon.png"
        />
        <img
          className="absolute  w-80"
          src={
            "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/uikit/themed-borders/theme-"+Math.floor(playerCard.playerData.summonerLevel/25+1)+"-border.png"
          }
          alt="IconBorder"
        />
        
      </div>

      <h3>Level: {playerCard.playerData.summonerLevel}</h3>

      <div className="">
        <RiCloseCircleLine
          onClick={() => removePlayerCard(playerCard.id)}
          className=""
        />
      </div>
    </div>
  ));
}

export default Card;
