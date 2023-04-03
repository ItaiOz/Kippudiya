import React, { useEffect, useState, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import "./style.scss";

interface Props {
  player: string;
  playerBalance: number;
  onBalanceChange: (name: string, count: number) => void;
  toggle: boolean;
}

export const Player: React.FC<Props> = ({
  player,
  playerBalance,
  onBalanceChange,
  toggle,
}: Props) => {
  const [balance, setBalance] = useState(1);
  const [showIncreaseAnimation, setShowIncreaseAnimation] = useState(false);
  const [increaseAnimationKey, setIncreaseAnimationKey] = useState(0);
  const [showDecreaseAnimation, setShowDecreaseAnimation] = useState(false);
  const [decreaseAnimationKey, setDecreaseAnimationKey] = useState(0);

  const handleIncrease = () => {
    onBalanceChange(player, balance + 1);
    setBalance(balance + 1);
    setShowIncreaseAnimation(true);
    setIncreaseAnimationKey(increaseAnimationKey + 1);
  };

  const handleDecrease = () => {
    onBalanceChange(player, balance - 1);
    setBalance(balance - 1);
    setShowDecreaseAnimation(true);
    setDecreaseAnimationKey(decreaseAnimationKey + 1);
  };

  setTimeout(() => {
    setShowIncreaseAnimation(false);
    setShowDecreaseAnimation(false);
  }, 500);

  useEffect(() => {
    setBalance(playerBalance);
  }, [toggle]);

  return (
    <div className="player-stats">
      <span>{player}</span>
      <div className="kipud-controls">
        <Button
          className="balance-button"
          variant="contained"
          onClick={handleDecrease}
        >
          -
        </Button>
        <div className="number-container">
          <span className="buy-in-count">{balance}</span>
          {showIncreaseAnimation && (
            <span className="animation" key={increaseAnimationKey}>
              +1
            </span>
          )}
          {showDecreaseAnimation && (
            <span className="animation" key={decreaseAnimationKey}>
              -1
            </span>
          )}
        </div>
        <Button
          className="balance-button"
          variant="contained"
          onClick={handleIncrease}
        >
          +
        </Button>
      </div>
    </div>
  );
};
