import React from "react";

function ChallengeCard({ challenge, type, data }) {
  const getStatusColour = () => {
    let statusColour = "bg-neutral-900 bg-NONE";

    if (data == null) return statusColour;

    switch (data.level) {
      case "IRON":
        statusColour = "bg-stone-700 bg-IRON";
        break;
      case "BRONZE":
        statusColour = "bg-yellow-800 bg-BRONZE";
        break;
      case "SILVER":
        statusColour = "bg-zinc-300 bg-SILVER";
        break;
      case "GOLD":
        statusColour = "bg-amber-400 bg-GOLD";
        break;
      case "PLATINUM":
        statusColour = "bg-emerald-700 bg-PLATINUM";
        break;
      case "DIAMOND":
        statusColour = "bg-blue-700 bg-DIAMOND";
        break;
      case "MASTER":
        statusColour = "bg-violet-700 bg-MASTER";
        break;
      case "GRANDMASTER":
        statusColour = "bg-rose-700 bg-GRANDMASTER";
        break;
      case "CHALLENGER":
        statusColour = "bg-sky-700 bg-CHALLENGER";
        break;
      default:
    }
    return statusColour;
  };

  return (
    <div
      className={`flex flex-col w-full h-full m-auto z-40 select-none rounded-md bg-auto bg-center ${getStatusColour()}
    }`}
    >
      <h1 className="relative mx-2 font-bold">{challenge.name}</h1>
      <p className="relative mx-2">{type.capstone}</p>
      <p className="relative mx-2">{type.group}</p>
      <div className="flex w-full justify-center">
        <img
          src={
            data == null || data.level === "NONE"
              ? "http://ddragon.leagueoflegends.com/cdn/img" +
              challenge.levelToIconPath[Object.getOwnPropertyNames(challenge.thresholds)[0]]
              : "http://ddragon.leagueoflegends.com/cdn/img" +
                challenge.levelToIconPath[data.level]
          }
          alt="ChallengeIcon.png"
          className="w-32 mt-1 mx-2"
        />
        {data == null || data.level === "NONE" ? (
          <>
            <img
              src="https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-shared-components/global/default/challenge-card-empty.png"
              alt="ChallengeIcon.png"
              className="w-32 mt-1 absolute"
            />
            <img
              src={challenge.name === type.group ? "https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-shared-components/global/default/challenge-card-token-capstone-mask.png":"https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-shared-components/global/default/challenge-card-token-mask.png"}
              alt="ChallengeIcon.png"
              className="w-32 mt-1 absolute"
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <p className="relative mx-2">{challenge.description}</p>
      <p className="relative mx-2">{challenge.shortDescription}</p>
    </div>
  );
}

export default ChallengeCard;
