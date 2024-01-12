import React, { useEffect } from "react";
import { useCalculateLeaderboard } from "../../hooks/useCalculateLeaderboard";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export const Leaderboard = () => {
  const { getPlayersTotalBalance, players } = useCalculateLeaderboard();

  useEffect(() => {
    getPlayersTotalBalance();
  }, []);

  return (
    <>
      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        {players.map((player: any) => (
          <div key={player.id} className="player">
            <span>{player.name}</span>
            <span>{player.balance}</span>
          </div>
        ))}
      </div>
    </>
  );
};
