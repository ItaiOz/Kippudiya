import React, { useEffect, useState } from "react";
import "./style.scss";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../../store/gameStore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../../common/Modal/ErrorModal";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const PlayersRoster = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const players = useGameStore((state) => state.players);
  const retrievePlayers = useGameStore((state) => state.retrievePlayers);

  const onAddPlayer = async () => {
    const player = inputValue.trim();

    const { data: players } = await supabase.from("players").select("*");

    const activePlayers = players?.map((item) => item.name);

    const found = activePlayers?.find((p) => p === player);
    if (found) {
      setShowModal(true);
      return;
    }

    const { error } = await supabase.from("players").insert([{ name: player }]);

    if (error) {
      navigate("/error");
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
