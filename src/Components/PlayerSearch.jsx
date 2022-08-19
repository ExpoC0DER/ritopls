import React, { useState } from "react";
import axios from "axios";
import cors from "cors";
import "../App.css";
import DisappearMsg from "./DisappearMsg";

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
    if (!searchText || /^\s*$/.test(searchText.text)) {
      setErrorMessage("Enter name first");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    getPlayerData(searchText).then((playerData) => {
      var arr = JSON.parse(window.localStorage.getItem("players"));
      if (arr.find((player) => player.id === playerData.id) == null) {
        getRankedData(playerData);
      } else {
        setErrorMessage("Player already in list.");
      }
    });
    setTimeout(() => setErrorMessage(""), 2000);
    setSearchText("");
  };

  const getPlayerData = async (req, res) => {
    const summonerName = req;
    const response = await axios
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
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          },
        }
      )
      .catch((e) => {
        setErrorMessage("Summoner not found");
        setTimeout(() => setErrorMessage(""), 2000);
        return res.status(e.response.status).json(e.response.data);
      });

    return response.data;
  };

  function getRankedData(playerData) {
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
        props.onSubmit({
          id: playerData.id,
          isHovering: false,
          text: searchText,
          server: serverText,
          playerData: playerData,
          rankData: response.data,
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
