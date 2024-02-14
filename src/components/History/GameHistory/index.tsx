import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../../../store/gameStore";
import "../style.scss";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const GameHistory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [playersBalance, setPlayersBalance] = useState({});
  const [gameDate, setGameDate] = useState("");

  const setIsLoading = useGameStore((state: any) => state.setIsLoading);
  const { gameId } = params;

  const retrieveGameStats = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId);

    if (error) navigate("/error");

    const players = data?.[0].players;
    const temp = Object.entries(players).sort((a: any, b: any) => a[1] - b[1]);
    const sortedPlayers = Object.fromEntries(temp);
    setPlayersBalance(sortedPlayers);
    setGameDate(
      new Date(data?.[0].created_at)
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")
    );

    setIsLoading(false);
  };

  const onBackClicked = () => {};

  useEffect(() => {
    retrieveGameStats();
  }, []);

  return (
    <div className="game-history-container">
      <Link className="back-btn" to="/history">
        {"< back"}
      </Link>
      <h2>{gameDate}</h2>
      <div className="game-stats">
        {Object.entries(playersBalance).map(
          ([player, balance]: any, index: number) => (
            <div key={index} className="player-stats">
              <span>{player}</span>
              <span>{balance}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};
