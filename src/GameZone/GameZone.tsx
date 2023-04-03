import React from "react";
import { GameRegistration } from "./GameRegistration";
import { GamePlay } from "./GamePlay";
import { useGameStore } from "../store/gameStore";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const GameZone = () => {
  const isGameOn = useGameStore((state) => state.isGameOn);

  return (
    <div className="game-zone-container">
      {isGameOn ? (
        <GamePlay />
      ) : (
        <>
          <GameRegistration />
        </>
      )}
    </div>
  );
};
