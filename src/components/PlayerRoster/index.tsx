import React, { useEffect, useState } from "react";
import "./style.scss";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../../store/gameStore";
import Button from "@mui/material/Button";
import { ErrorModal } from "../../common/Modal/ErrorModal";
import { useErrorBoundary } from "react-error-boundary";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const PlayersRoster = () => {
  const { showBoundary } = useErrorBoundary();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const players = useGameStore((state) => state.players);
  const setIsLoading = useGameStore((state: any) => state.setIsLoading);

  const retrievePlayers = useGameStore((state) => state.retrievePlayers);

  const onAddPlayer = async () => {
    setIsLoading(true);

    const player = inputValue.trim();
    const { error } = await supabase.from("players").insert([{ name: player }]);

    if (error) {
      setIsLoading(false);
      if (error.code === "23505") {
        setShowModal(true);
        return;
      }
      showBoundary(error);
    } else {
      retrievePlayers();
    }
    setInputValue("");
    setIsLoading(false);
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
          className="add-players-button btn"
          size={"small"}
          variant="contained"
          onClick={onAddPlayer}
        >
          +
        </Button>
        <ErrorModal
          isOpen={showModal}
          onCloseModal={() => setShowModal(false)}
          errorMessage={"Player already exists"}
        />
      </div>
    </div>
  );
};
