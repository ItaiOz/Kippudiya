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
          className="btn"
          variant="contained"
          onClick={() => navigate("/game-zone")}
        >
          Start Game
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => navigate("players-roster")}
        >
          PLayers Roster
        </Button>

        <Button className="btn" variant="contained">
          Poker Calculator
        </Button>
        <Button className="btn" variant="contained">
          LeaderBoard
        </Button>
        <Button className="btn" variant="contained">
          House Rules
        </Button>
        <Button className="btn" variant="contained">
          What To Order?
        </Button>
      </div>
    </>
  );
};
