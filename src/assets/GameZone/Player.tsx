import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../../style.scss";

interface Props {
  player: string;
}

export const Player: React.FC<Props> = ({ player }: Props) => {
  const [buyIn, setBuyIn] = useState(1);

  return (
    <div className="player-stats">
      <span>{player}</span>
      <div className="kipud-controls">
        <Button
          color={"success"}
          className="balance-button"
          variant="contained"
          onClick={() => setBuyIn(buyIn - 1)}
        >
          -
        </Button>
        <span className="buy-in-count">{buyIn}</span>
        <Button
          color={"success"}
          className="balance-button"
          variant="contained"
          onClick={() => setBuyIn(buyIn + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
