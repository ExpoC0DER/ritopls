import React, { useState } from "react";
import axios from "axios";
import "../App.css";
// @ts-ignore
import DisappearMsg from "./DisappearMsg.tsx";

function PlayerSearch(props) {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");
  const [server, setServer] = useState("eun1");
  const [serverText, setServerText] = useState("EUNE");
  const { REACT_APP_API_KEY } = process.env;

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText || /^\s*$/.test(searchText)) {
      setErrorMessage("Enter name first");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    getPlayerData(searchText);

    setSearchText("");
  };

  function getPlayerData(summonerName) {
    axios
      .get(
        "https://" +
          server +
          ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
          summonerName +
          "?api_key=" +
          REACT_APP_API_KEY,
        {
          headers: {
            // "X-Riot-Token": REACT_APP_API_KEY,
            // "Access-Control-Allow-Headers": "Content-Type, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
            // "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, GET, PUT, DELETE, POST, OPTIONS",
            // "Access-Control-Allow-Origin": "*, *",
            // "Access-Control-Expose-Headers": "Content-Length,Content-Range"
          },
        }
      )
      .then(function (response) {
        getMasteryData(response.data);
      })
      .catch(function (error) {
        setErrorMessage("Summoner not found");
        setTimeout(() => setErrorMessage(""), 2000);
        console.log(error);
      });
  }

  function getMasteryData(playerData) {
    var arr = JSON.parse(window.localStorage.getItem("players")!);
    if (arr.find((player) => player.id === playerData.id) != null) {
      setErrorMessage("Player already in list.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    axios
      .get(
        "https://" +
          server +
          ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
          playerData.id +
          "?api_key=" +
          REACT_APP_API_KEY,
        {
          headers: {
            // "X-Riot-Token": REACT_APP_API_KEY,
            // "Access-Control-Allow-Headers": "Content-Type, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
            // "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, GET, PUT, DELETE, POST, OPTIONS",
            // "Access-Control-Allow-Origin": "*, *",
            // "Access-Control-Expose-Headers": "Content-Length,Content-Range"
          },
        }
      )
      .then(function (response) {
        getRankedData(playerData, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getRankedData(playerData, masteryData) {
    const APICallString =
      "https://" +
      server +
      ".api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      playerData.id +
      "?api_key=" +
      REACT_APP_API_KEY;

    axios
      .get(APICallString)
      .then(function (response) {
        getChallengesData(playerData, masteryData, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getChallengesData(playerData, masteryData, rankedData) {
    const APICallString =
      "https://" +
      server +
      ".api.riotgames.com/lol/challenges/v1/player-data/" +
      playerData.puuid +
      "?api_key=" +
      REACT_APP_API_KEY;

    axios
      .get(APICallString)
      .then(function (response) {
        props.onSubmit({
          id: playerData.id,
          server: serverText,
          playerData: playerData,
          rankData: rankedData,
          masteryData: masteryData,
          challengesData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="flex z-50 justify-center">
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Summoner name"
            value={searchText}
            name="text"
            className="border h-full font-beaufort border-gray-300 rounded-lg px-2 mr-1 focus:outline-none focus:ring-1 focus:ring-lol-gold-400 focus:border-lol-gold-400"
            onChange={handleChange}
          />
          <select
            name="server"
            id="server"
            onChange={(e) => {
              setServer(e.target.value);
              setServerText(e.target.options[e.target.selectedIndex].text);
            }}
            className="border h-full font-beaufort border-gray-300 rounded-lg px-2 mr-1 focus:outline-none focus:ring-1 focus:ring-lol-gold-400 focus:border-lol-gold-400"
          >
            <option value="eun1">EUNE</option>
            <option value="euw1">EUW</option>
            <option value="na1">NA</option>
            <option value="br1">BR</option>
            <option value="jp1">JP</option>
            <option value="kr">KR</option>
            <option value="oc1">OCE</option>
            <option value="la1">LAN</option>
            <option value="la2">LAS</option>
            <option value="ru">RU</option>
            <option value="tr1">TR</option>
          </select>
          <button className="text-white h-full font-beaufort rounded-lg px-2 hover:bg-lol-gold-100 bg-lol-gold-200">
            Add summoner
          </button>
        </form>
      </div>
      <DisappearMsg errorMessage={errorMessage} />
    </div>
  );
}

export default PlayerSearch;
