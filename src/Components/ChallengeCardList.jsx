import React, { useState } from "react";
import challengesJson from "../Json/challenges.json";
import ChallengeCard from "./ChallengeCard";
import ChallengesToggleButton from "./ChallengesToggleButton";

function ChallengeCardList() {
  const [challenges, setChallenges] = useState(
    challengesJson.filter(({ description }) => "" !== description)
  );
  const [players, setPlayers] = useState(
    window.localStorage.getItem("players") == null
      ? []
      : JSON.parse(window.localStorage.getItem("players"))
  );
  console.log();

  function getType(challengeId) {
    let group = challengesJson.find(
      ({ id }) =>
        id.toString() === challengeId.toString().substring(0, 4) + "00"
    );
    if (group != null) group = group.name;
    else group = "Legacy";
    let capstone = challengesJson.find(
      ({ id }) => id.toString() === challengeId.toString().substring(0, 1)
    );
    if (capstone != null) capstone = capstone.name;
    else capstone = "LEGACY";
    return { group, capstone };
  }
  //Comparer Function
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  function testF(test, capstoneId) {
    let step = challenges;
    if (!test)
      step = step.filter(
        ({ id }) => id.toString().substring(0, 1) !== capstoneId
      );
    else
      step = step.concat(
        challengesJson
          .filter(({ description }) => "" !== description)
          .filter(({ id }) => id.toString().substring(0, 1) === capstoneId)
      );
    step.sort(GetSortOrder("id"));
    setChallenges(step);
  }

  return (
    <div>
      <div className="flex flex-row justify-evenly mt-2 px-2">
        <ChallengesToggleButton
          text="Imagination"
          onToggle={(test) => testF(test, "1")}
        />
        <ChallengesToggleButton
          text="Expertise"
          onToggle={(test) => testF(test, "2")}
        />
        <ChallengesToggleButton
          text="Veterancy"
          onToggle={(test) => testF(test, "3")}
        />
        <ChallengesToggleButton
          text="Teamwork"
          onToggle={(test) => testF(test, "4")}
        />
        <ChallengesToggleButton
          text="Collection"
          onToggle={(test) => testF(test, "5")}
        />
        <ChallengesToggleButton
          text="Legacy"
          onToggle={(test) => testF(test, "6")}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center gap-4">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            type={getType(challenge.id)}
            data={players[0].challengesData.challenges.find(({challengeId})=> challengeId===challenge.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChallengeCardList;
