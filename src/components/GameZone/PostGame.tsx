import React, { useEffect, useState } from "react";
import { useSupabaseRequests } from "../../hooks/useSupabaseRequests";
import { FaWhatsapp } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useCalculateLeaderboard } from "../../hooks/useCalculateLeaderboard";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const PostGame = () => {
  const [sortedPlayersBalance, setSortedPlayersBalance] = useState({});

  const { retrieveGameData, playersBalance } = useSupabaseRequests();
  const { updateTotalBalance } = useCalculateLeaderboard();

  const shareScoreBoard = () => {
    let text = "";

    Object.entries(playersBalance).map(([name, balance]) => {
      text = text + `${name} ${balance}\n`;
    });

    const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  const sortPlayers = () => {
    const entries = Object.entries(playersBalance);

    entries.sort((a: any, b: any) => a[1] - b[1]);
    const sortedPlayers: any = {};
    for (let entry of entries) {
      sortedPlayers[entry[0]] = entry[1];
    }

    setSortedPlayersBalance(sortedPlayers);
  };

  useEffect(() => {
    retrieveGameData();
  }, []);

  useEffect(() => {
    if (Object.keys(playersBalance).length > 0) {
      sortPlayers();
      updateTotalBalance(playersBalance);
    }
  }, [playersBalance]);

  return (
    <>
      <h3>Postgame Breakdown</h3>
      <button className="whatsapp-btn" onClick={shareScoreBoard}>
        <FaWhatsapp color="white" size={40} />
      </button>
      <div className="post-game-players-container">
        {Object.entries(sortedPlayersBalance).map(
          ([player, balance]: any, index: number) => (
            <div key={index} className="post-game-players">
              {index === 0 && <p>Highest Paid!</p>}
              <span>{player}</span>
              <span>{balance}</span>
            </div>
          )
        )}
      </div>
    </>
  );
};
