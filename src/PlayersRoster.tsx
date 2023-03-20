import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "./store/gameStore";
import Button from "@mui/material/Button";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const PlayersRoster = () => {
  const [inputValue, setInputValue] = useState("");

  const players = useGameStore((state) => state.players);
  const retrievePlayers = useGameStore((state) => state.retrievePlayers);

  const onAddPlayer = async () => {
    const player = inputValue.trim();
    const { data, error } = await supabase
      .from("players")
      .insert([{ name: player }]);

    if (error) {
      console.log(error);
      return;
    } else {
      retrievePlayers();
    }
    setInputValue("");
  };

  useEffect(() => {
    retrievePlayers();
  }, []);

  return (
    <div className="players-roster-container">
      <ul className="user-list">
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <div className="input-one-line">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new Player"
        ></input>
        <Button
          className="add-players-button"
          color={"success"}
          size={"small"}
          variant="contained"
          onClick={onAddPlayer}
        >
          +
        </Button>
      </div>
    </div>
  );
};
