import React, { useEffect } from "react";
import { GameRegistration } from "./GameRegistration";
import { GamePlay } from "./GamePlay";
import { useGameStore } from "../../store/gameStore";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const GameZone = () => {
  const isGameOn = useGameStore((state) => state.isGameOn);
  const setIsGameOn = useGameStore((state) => state.setIsGameOn);
  const setGameId = useGameStore((state) => state.setGameId);

  const setIsLoading = useGameStore((state: any) => state.setIsLoading);

  const gameOnCheck = async () => {
    setIsLoading(true);
    const { data: rows, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    setIsLoading(false);
    if (error) {
      console.error(error);
      return;
    }
    if (rows[0].ended_at === null) {
      setIsGameOn(true);
      setGameId(rows[0].id);
    }
  };

  useEffect(() => {
    gameOnCheck();
  }, []);

  const renderGame = isGameOn ? <GamePlay /> : <GameRegistration />;

  return <div className="game-zone-container">{renderGame}</div>;
};
