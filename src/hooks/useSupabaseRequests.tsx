import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../store/gameStore";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const useSupabaseRequests = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playersBalance, setPlayersBalance]: any = useState({});
  const [isKipudModalOpen, setIsKipudModalOpen] = useState(false);
  const [balanceChanges, setBalanceChanges] = useState({});
  const [selectedNewPlayer, setSelectedNewPlayer] = useState("");
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const gameId = useGameStore((state: any) => state.gameId);

  const onKipudConfirm = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({ game_id: gameId, mekaped: "someone", players: playersBalance })
      .select();
    if (data) {
      retrieveGameData();
    }
    if (error) console.log(error);
    setIsKipudModalOpen(false);
    setIsLoading(false);
  };

  const getLatestPlayersBalance = async () => {
    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    if (data) {
      return data[0].players;
    }
    if (error) console.log(error);
    return null;
  };

  const handleKipud = () => {
    setIsKipudModalOpen(true);
    const balance = getLatestPlayersBalance();
    balance.then((previousBalance) => {
      const balanceDiff = Object.entries(previousBalance).reduce(
        (acc: any, [key, value]: any) => {
          if (previousBalance[key] - playersBalance[key] !== 0)
            acc[key] = playersBalance[key] - previousBalance[key];
          return acc;
        },
        {}
      );
      setBalanceChanges(balanceDiff);
    });
  };

  const onPlayerBalanceChange = (name: string, count: number) => {
    const tempPlayers: any = { ...playersBalance };
    tempPlayers[name] = count;
    setPlayersBalance(tempPlayers);
  };

  const onAddPlayer = async () => {
    const found = Object.keys(playersBalance).find(
      (player) => player === selectedNewPlayer
    );
    if (found) return;
    const tempNewBalance = { ...playersBalance };
    tempNewBalance[selectedNewPlayer] = 1;
    setPlayersBalance(tempNewBalance);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({ game_id: gameId, mekaped: "someone", players: tempNewBalance })
      .select();
    if (data) {
      retrieveGameData();
    }
    if (error) console.log(error);
    setIsAddPlayerModalOpen(false);
    setIsLoading(false);
  };

  const onEndGame = async () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    setIsLoading(true);

    const { data, error } = await supabase
      .from("games")
      .insert({ game_id: gameId, ended_at: currentDate.getTime() })
      .select();
  };

  const retrieveGameData = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      setPlayersBalance(data[0].players);
    }
    if (error) console.log(error);

    setIsLoading(false);
  };

  return {
    retrieveGameData,
    handleKipud,
    onKipudConfirm,
    onPlayerBalanceChange,
    setIsKipudModalOpen,
    onAddPlayer,
    setIsAddPlayerModalOpen,
    setSelectedNewPlayer,
    onEndGame,
    selectedNewPlayer,
    isLoading,
    playersBalance,
    balanceChanges,
    isKipudModalOpen,
    isAddPlayerModalOpen,
  };
};
