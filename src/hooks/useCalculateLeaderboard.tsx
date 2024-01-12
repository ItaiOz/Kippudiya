import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlayersBalance } from "../interfaces/interface";
import { useNavigate } from "react-router-dom";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const useCalculateLeaderboard = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([] as any);

  const sortPlayers = (players: PlayersBalance[]) => {
    const sortedArray = players.sort((a, b) => a.balance - b.balance);

    setPlayers(sortedArray);
  };

  const getPlayersTotalBalance = async () => {
    const { data, error } = await supabase.from("players").select("*");

    if (error) navigate("/error");

    if (data) sortPlayers(data);
  };

  const updateTotalBalance = async (playersBalance: PlayersBalance) => {
    const { data: players, error } = await supabase.from("players").select("*");

    if (error) {
      navigate("/error");
      return;
    }

    const updatedPlayers = players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        balance: player.balance + (playersBalance[player.name] ?? 0),
      };
    });

    const { data, error: upsertError } = await supabase
      .from("players")
      .upsert([...updatedPlayers]);

    if (upsertError) navigate("/error");
  };

  return {
    players,
    getPlayersTotalBalance,
    updateTotalBalance,
  };
};
