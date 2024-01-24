import React, { useEffect, useState } from "react";
import { useCalculateLeaderboard } from "../../hooks/useCalculateLeaderboard";
import "./style.scss";

export const Leaderboard = () => {
  const [showAll, setShowAll] = useState(false);
  const { getPlayersTotalBalance, players } = useCalculateLeaderboard();

  useEffect(() => {
    getPlayersTotalBalance();
  }, []);

  return (
    <>
      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        <div className={`players-table ${showAll ? "open" : ""}`}>
          {players.map((player: any) => (
            <div key={player.id} className="player">
              <span>{player.name}</span>
              <span>{player.balance}</span>
            </div>
          ))}
        </div>
        <button className="btn" onClick={() => setShowAll(true)}>
          See All
        </button>
      </div>
    </>
  );
};
