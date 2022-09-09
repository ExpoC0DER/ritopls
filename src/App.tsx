import React from "react";
import "./App.css";
// @ts-ignore
import PlayerCardList from "./Components/PlayerCardList.tsx";
// @ts-ignore
import ChallengeCardList from "./Components/ChallengeCardList.tsx";

function App() {
  return (
    <div>
      <PlayerCardList/>
      <ChallengeCardList/>
    </div>
  );
}

export default App;
