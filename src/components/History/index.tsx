import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const History = () => {
  const navigate = useNavigate();
  const [gamesHistory, setGamesHistory] = useState<any>([]);

  const getLatestPlayersBalance = async () => {
    const { data, error } = await supabase.from("games").select("*");

    if (error) {
      navigate("/error");
      return;
    }
    setGamesHistory(() => data?.filter((game) => game.ended_at !== null));
  };

  useEffect(() => {
    getLatestPlayersBalance();
  }, []);
  return (
    <>
      {gamesHistory.map((game: any) => (
        <div key={game.id}>
          <Link to={`/history/${game.id}`}>
            {new Date(game.created_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
          </Link>
        </div>
      ))}
    </>
  );
};
