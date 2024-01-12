import React, { useEffect } from "react";
import { useCalculateLeaderboard } from "../../hooks/useCalculateLeaderboard";

export const Leaderboard = () => {
  const { setPlayersTotalBalance, players } = useCalculateLeaderboard();

  useEffect(() => {
    setPlayersTotalBalance();
  }, []);

  return (
    <>
      <div>Leader board will be here</div>
      <div>
        {players.map((player: any) => (
          <div key={player.id}>
            <span>{player.name}</span>
            <span>{player.balance}</span>
          </div>
        ))}
      </div>
    </>
  );
};
