import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import champion from "../Json/champion.json";

function PlayerCard({ player }) {
  const test = () => {
    let championData = Object.values(champion.data);
    let arr: any = [];
    if (player.masteryData.length === 0) {
      return arr;
    }
    arr[0] = championData.find(
      ({ key }) => key === player.masteryData[0].championId.toString()
    )?.id;
    if (player.masteryData.length === 1) {
      return arr;
    }
    arr[1] = championData.find(
      ({ key }) => key === player.masteryData[1].championId.toString()
    )?.id;
    if (player.masteryData.length === 2) {
      return arr;
    }
    arr[2] = championData.find(
      ({ key }) => key === player.masteryData[2].championId.toString()
    )?.id;
    return arr;
  };
  const [displayRank, setDisplayRank] = useState(false);
  const [mostPlayedChamps] = useState(test);
  const [displayMastery, setDisplayMastery] = useState(false);
  const [version, setVersion] = useState("");

  useEffect(() => {
    //get lates version on create
    axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then(function (response) {
        setVersion(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div
      className="flex flex-col w-full h-full m-auto items-center justify-center z-40 select-none"
      onClick={() => setDisplayRank(!displayRank)}
      onMouseEnter={() => setDisplayMastery(true)}
      onMouseLeave={() => setDisplayMastery(false)}
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
            "http://ddragon.leagueoflegends.com/cdn/" +
            version +
            "/img/profileicon/" +
            player.playerData.profileIconId +
            ".png"
          }
          alt="Icon.png"
        />
        {player.rankData.length !== 0 && displayRank ? (
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

      {displayMastery ? (
        <div className="absolute bg-black p-4 bg-opacity-70 rounded-lg transition ease-in-out delay-1000">
          <div className="flex flex-row justify-center mt-2 align-middle">
            <img
              src={
                mostPlayedChamps[1] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-champ-select/global/default/images/champion-grid/random-champion.png"
                  : "http://ddragon.leagueoflegends.com/cdn/" +
                    version +
                    "/img/champion/" +
                    mostPlayedChamps[1] +
                    ".png"
              }
              alt="Second most mastery points"
              className="w-10 h-10 mx-2 mt-2"
            />
            <img
              src={
                mostPlayedChamps[0] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-champ-select/global/default/images/champion-grid/random-champion.png"
                  : "http://ddragon.leagueoflegends.com/cdn/" +
                    version +
                    "/img/champion/" +
                    mostPlayedChamps[0] +
                    ".png"
              }
              alt="Most mastery points"
              className="w-10 h-10 mx-2"
            />
            <img
              src={
                mostPlayedChamps[2] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-champ-select/global/default/images/champion-grid/random-champion.png"
                  : "http://ddragon.leagueoflegends.com/cdn/" +
                    version +
                    "/img/champion/" +
                    mostPlayedChamps[2] +
                    ".png"
              }
              alt="Third most mastery points"
              className="w-10 h-10 mx-2 mt-2"
            />
          </div>
          <div className="flex flex-row justify-center">
            <img
              src={
                mostPlayedChamps[1] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-0.png"
                  : "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-" +
                    player.masteryData[1].championLevel +
                    ".png"
              }
              alt="Second most mastery points"
              className="w-10 h-10 mx-2"
            />
            <img
              src={
                mostPlayedChamps[0] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-0.png"
                  : "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-" +
                    player.masteryData[0].championLevel +
                    ".png"
              }
              alt="Most mastery points"
              className="w-10 h-10 mx-2 -translate-y-2"
            />
            <img
              src={
                mostPlayedChamps[2] == null
                  ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-0.png"
                  : "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-collections/global/default/images/item-element/mastery-" +
                    player.masteryData[2].championLevel +
                    ".png"
              }
              alt="Third most mastery points"
              className="w-10 h-10 mx-2"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PlayerCard;
