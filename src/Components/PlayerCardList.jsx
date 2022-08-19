import React, { useState, useEffect } from "react";
import PlayerSearch from "./PlayerSearch";
import PlayerCard from "./PlayerCard";
import "../App.css";

function PlayerCardList() {
  const [players, setPlayers] = useState(
    window.localStorage.getItem("players") == null
      ? []
      : JSON.parse(window.localStorage.getItem("players"))
  );

  useEffect(() => {
    window.localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <div>
      <div className="grid grid-cols-1">
        <h1 className="flex justify-center font-extrabold text-5xl mb-8 font-beaufort text-lol-gold-100 mt-8">
          Player Search
        </h1>
        <PlayerSearch
          onSubmit={(player) => {
            setPlayers([player, ...players]);
          }}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center gap-4">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            removePlayerCard={() =>
              setPlayers(players.filter(({id}) => player.id !== id))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerCardList;
