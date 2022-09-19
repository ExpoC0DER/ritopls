import React, { useState } from "react";
import challengesJson from "../Json/challenges.json";
import challengeListsJson from "../Json/challengeLists.json";

// @ts-ignore
import ChallengeCard from "./ChallengeCard.tsx";
// @ts-ignore
import ChampionList from "./ChampionList.tsx";
// @ts-ignore
import ChallengesToggleButton from "./ChallengesToggleButton.tsx";
// @ts-ignore
import PlayerSearch from "./PlayerSearch.tsx";
// @ts-ignore
import PlayerCard from "./PlayerCard.tsx";

function ChallengeCardList() {
  const [player, setPlayer] = useState<any | null>(null);
  const [champList, setChampList] = useState<string[] | null>(null);
  const [filterCategory, _setFilterCategory] = useState<string | null>(null);
  function setFilterCategory(capstoneId: string) {
    if (filterCategory === capstoneId) {
      _setFilterCategory(null);
    } else {
      _setFilterCategory(capstoneId);
    }
  }

  //!VETERANCY AND TEAMWORK ARE SWITCHED
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
            id.toString().length === 6) ||
          (filterCategory === "6" && id.toString().length === 7)
      );
    //activeChallenges.sort(GetSortOrder("id"));
    return activeChallenges;
  }

  function setChampionList(key: number) {
    if (challengeListsJson.hasOwnProperty(key.toString()))
      setChampList(challengeListsJson[key.toString()].list);
    else setChampList(null);
  }

  return (
    <div>
      {champList === null ? (
        <></>
      ) : (
        <ChampionList
          champs={champList}
          setListNull={() => setChampionList(-1)}
        />
      )}

      <PlayerSearch
        onSubmit={(player) => {
          setPlayer(player);
        }}
      />
      {player === null ? <></> : <PlayerCard player={player} />}

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
          capstoneId="4"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("4")}
        />
        <ChallengesToggleButton
          text="Teamwork"
          capstoneId="3"
          filterCategory={filterCategory}
          onClick={() => setFilterCategory("3")}
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
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center gap-4 mx-4">
        {activeChallenges().map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            type={getType(challenge.id)}
            data={
              player === null
                ? null
                : player.challengesData.challenges.find(
                    ({ challengeId }) => challengeId === challenge.id
                  )
            }
            showChampionList={() => setChampionList(challenge.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChallengeCardList;
