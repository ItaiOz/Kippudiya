import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlayersBalance } from "../interfaces/interface";
import { useGameStore } from "../store/gameStore";
import { useErrorBoundary } from "react-error-boundary";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const useCalculateLeaderboard = () => {
  const [players, setPlayers] = useState([] as any);

  const { showBoundary } = useErrorBoundary();

  const setIsLoading = useGameStore((state: any) => state.setIsLoading);

  const sortPlayers = (players: PlayersBalance[]) => {
    const sortedArray = players.sort((a, b) => a.balance - b.balance);

    setPlayers(sortedArray);
  };

  const getPlayersTotalBalance = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("players").select("*");

    if (error) showBoundary(error);

    if (data) sortPlayers(data);
    setIsLoading(false);
  };

  const updateTotalBalance = async (playersBalance: PlayersBalance) => {
    setIsLoading(true);
    const { data: players, error } = await supabase.from("players").select("*");

    if (error) showBoundary(error);

    const updatedPlayers = players?.map((player) => {
      return {
        id: player.id,
        name: player.name,
        balance: player.balance + (playersBalance[player.name] ?? 0),
      };
    });

    const { error: upsertError } = await supabase
      .from("players")
      .upsert([...(updatedPlayers ?? [])]);

    setIsLoading(false);
    if (upsertError) showBoundary(error);
  };

  return {
    players,
    getPlayersTotalBalance,
    updateTotalBalance,
  };
};
