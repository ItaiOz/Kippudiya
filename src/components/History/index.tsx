import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import { useErrorBoundary } from "react-error-boundary";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const History = () => {
  const [gamesHistory, setGamesHistory] = useState<any>([]);

  const { showBoundary } = useErrorBoundary();

  const setIsLoading = useGameStore((state: any) => state.setIsLoading);

  const getLatestPlayersBalance = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("games").select("*");

    if (error) showBoundary(error);

    setGamesHistory(() => data?.filter((game) => game.ended_at !== null));
    setIsLoading(false);
  };

  useEffect(() => {
    getLatestPlayersBalance();
  }, []);
  return (
    <>
      {gamesHistory.map((game: any) => (
        <div key={game.id}>
          <Link to={`/history/${game.id}`} className="game-history-date">
            {/* <div className="game-history-date"> */}
            {new Date(game.created_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
            {/* </div> */}
          </Link>
        </div>
      ))}
    </>
  );
};
