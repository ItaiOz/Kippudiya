import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const useCalculateLeaderboard = () => {
  const [players, setPlayers] = useState([] as any);

  const setPlayersTotalBalance = async () => {
    const { data, error } = await supabase.from("players").select("*");

    if (error) {
      console.error(error);
      return;
    }

    if (data) setPlayers(data);
  };

  return {
    players,
    setPlayersTotalBalance,
  };
};
