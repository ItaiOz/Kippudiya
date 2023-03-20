import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./style.scss";

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-menu-container">
        <Button
          color={"success"}
          variant="contained"
          onClick={() => navigate("/game-zone")}
        >
          Start Game
        </Button>
        <Button
          color={"success"}
          variant="contained"
          onClick={() => navigate("players-roster")}
        >
          Poker Calculator
        </Button>

        <Button color={"success"} variant="contained">
          Poker Calculator
        </Button>
        <Button color={"success"} variant="contained">
          LeaderBoard
        </Button>
        <Button color={"success"} variant="contained">
          House Rules
        </Button>
        <Button color={"success"} variant="contained">
          What To Order?
        </Button>
      </div>
    </>
  );
};
