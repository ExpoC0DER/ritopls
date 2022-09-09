import React, { useState, useEffect } from "react";
import challengesJson from "../Json/challenges.json";
import championJson from "../Json/champion.json";
// @ts-ignore
import ChallengeCard from "./ChallengeCard.tsx";
// @ts-ignore
import ChampionList from "./ChampionList.tsx";
// @ts-ignore
import ChallengesToggleButton from "./ChallengesToggleButton.tsx";

function ChallengeCardList() {
  const [players] = useState(
    window.localStorage.getItem("players") == null
      ? []
      : JSON.parse(window.localStorage.getItem("players")!)
  );

  const [filterCategory, _setFilterCategory] = useState<string | null>(null);
  function setFilterCategory(capstoneId: string) {
    if (filterCategory === capstoneId) {
      _setFilterCategory(null);
    } else {
      _setFilterCategory(capstoneId);
    }
  }

  function getType(challengeId: number) {
    if (challengeId.toString().length === 7)
      return { groupString: "2022 Seasonal", capstoneString: "LEGACY" };

    let group: any = challengesJson.find(
      ({ id }) =>
        id.toString() === challengeId.toString().substring(0, 4) + "00"
    );
    let groupString: string = group != null ? group.name : "Legacy";

    let capstone: any = challengesJson.find(
      ({ id }) => id.toString() === challengeId.toString().substring(0, 1)
    );
    let capstoneString: string = capstone != null ? capstone.name : "LEGACY";
    return { groupString, capstoneString };
  }

  //Comparer Function
  // function GetSortOrder(prop) {
  //   return function (a, b) {
  //     if (a[prop] > b[prop]) {
  //       return 1;
  //     } else if (a[prop] < b[prop]) {
  //       return -1;
  //     }
  //     return 0;
  //   };
  // }

  function activeChallenges() {
    let activeChallenges = challengesJson.filter(
      ({ description }) => "" !== description
    );
    if (filterCategory !== null)
      activeChallenges = activeChallenges.filter(
        ({ id }) =>
          (id.toString().substring(0, 1) === filterCategory &&
            id.toString().length !== 6) ||
          (filterCategory === "6" && id.toString().length === 7)
      );
    //activeChallenges.sort(GetSortOrder("id"));
    return activeChallenges;
  }

  return (
    <div>
      <ChampionList/>
      <div className="flex flex-row justify-evenly mt-2 px-2">
        <ChallengesToggleButton
          text="Imagination"
          capstoneId="1"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("1")}
        />
        <ChallengesToggleButton
          text="Expertise"
          capstoneId="2"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("2")}
        />
        <ChallengesToggleButton
          text="Veterancy"
          capstoneId="3"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("3")}
        />
        <ChallengesToggleButton
          text="Teamwork"
          capstoneId="4"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("4")}
        />
        <ChallengesToggleButton
          text="Collection"
          capstoneId="5"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("5")}
        />
        <ChallengesToggleButton
          text="Legacy"
          capstoneId="6"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("6")}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center gap-4">
        {activeChallenges().map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            type={getType(challenge.id)}
            data={players[0].challengesData.challenges.find(
              ({ challengeId }) => challengeId === challenge.id
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ChallengeCardList;
  