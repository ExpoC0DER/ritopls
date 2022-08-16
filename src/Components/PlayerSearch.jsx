import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function PlayerSearch(props) {
  const [searchText, setSearchText] = useState("");
  const [server, setServer] = useState("eun1");
  const [serverText, setServerText] = useState("EUNE");
  const API_KEY = "RGAPI-167ffccd-ecf5-444a-984e-2da4adffd9d0";

  const [id, setId] = useState(0);
  const giveId = () => {
    setId(id + 1);
    return id;
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText || /^\s*$/.test(searchText.text)) {
      return;
    }

    const APICallString =
      "https://" +
      server +
      ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;
    axios
      .get(APICallString)
      .then(function (response) {
        props.onSubmit({
          id: giveId(),
          text: searchText,
          server: serverText,
          playerData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    setSearchText("");
  };

  return (
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
          onChange={(e) => {setServer(e.target.value);setServerText(e.target.options[e.target.selectedIndex].text)}}
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
  );
}

export default PlayerSearch;
