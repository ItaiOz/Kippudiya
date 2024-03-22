import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

type PlayerBalance = { [key: string]: number };

export const useSupabaseRequests = () => {
  const [playersBalance, setPlayersBalance] = useState<PlayerBalance>({});
  const [isKipudModalOpen, setIsKipudModalOpen] = useState(false);
  const [balanceChanges, setBalanceChanges] = useState({});
  const [realtimeBalance, setRealtimeBalance] = useState<PlayerBalance>({});
  const [selectedNewPlayer, setSelectedNewPlayer] = useState("");
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const name = localStorage.getItem("userName");

  const gameId = useGameStore((state: any) => state.gameId);
  const setIsGameOn = useGameStore((state) => state.setIsGameOn);
  const setIsLoading = useGameStore((state: any) => state.setIsLoading);

  const onKipudConfirm = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({
        game_id: gameId,
        mekaped: name,
        players: playersBalance,
      })
      .select();
    if (data) {
      retrieveGameData();
    }
    if (error) showBoundary(error);
    setIsKipudModalOpen(false);
    setIsLoading(false);
    setBalanceChanges({});
  };

  const handleKipud = () => {
    const balanceDiff = Object.entries(playersBalance).reduce(
      (acc: any, [key, value]: any) => {
        if (realtimeBalance[key] - playersBalance[key] !== 0)
          acc[key] = playersBalance[key] - realtimeBalance[key];
        return acc;
      },
      {}
    );
    setIsKipudModalOpen(true);
    setBalanceChanges(balanceDiff);
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
      .insert({
        game_id: gameId,
        mekaped: name,
        players: tempNewBalance,
      })
      .select();
    if (data) {
      retrieveGameData();
    }
    if (error) showBoundary(error);
    setIsAddPlayerModalOpen(false);
    setIsLoading(false);
  };

  const onEndGame = async () => {
    setIsLoading(true);

    const { error } = await supabase
      .from("games")
      .update({ ended_at: new Date().toISOString(), players: playersBalance })
      .eq("id", gameId);

    if (error) showBoundary(error);

    setIsGameOn(false);
    setIsLoading(false);
    navigate("/post-game");
  };

  const retrieveGameData = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      setRealtimeBalance(data[0].players);
      setPlayersBalance(data[0].players);
    }
    if (error) {
      showBoundary(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const subscription = supabase
      .channel("poker-sessions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "poker-sessions" },
        () => {
          setIsKipudModalOpen(false);
          retrieveGameData();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
    playersBalance,
    balanceChanges,
    isKipudModalOpen,
    isAddPlayerModalOpen,
  };
};
